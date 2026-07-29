import connectToDB from "@/configs/DB";
import chatModel from "@/model/chat";
import productModel from "@/model/product";
import authorizUser from "@/utils/authorizUser";
import userModel from "@/model/user";

export async function GET(request, { params }) {
    const userData = await authorizUser()
    const { id } = await params
    if (userData.id) {
        await connectToDB()        
        let productId = null
        let chatId = null
        let product = null

        if (id.includes('-')) {
            chatId = id
            productId = id.split('-')[0]
            product = await productModel.findById(productId).select('_id image title ownerId price').populate({ path: 'ownerId', select: 'name' }).lean()

        } else {
            productId = id
            product = await productModel.findById(id).select('_id image title ownerId price').populate({ path: 'ownerId', select: 'name' }).lean()
            chatId = productId + '-' + userData.id + '-' + product.ownerId._id
        }
        const chat = await chatModel.findOne({ chatId }).lean()
        if (chat && chat.participants.toString().includes(userData.id)) {
            const chatMsgs = chat.messages

            return Response.json({
                message: 'پیام ها دریافت شد',
                status: 200,
                error: null,
                chatId,
                chatMsgs,
                product
            })
        } else {
            return Response.json({
                message: 'پیامی وجود نداره یا دسترسی ندارید',
                status: 403,
                error: null,
                chatId,
                chatMsgs: null,
                product
            })
        }
    }

}
export async function POST(req, { params }) {
    const userData = await authorizUser()
    const { id } = await params
    const { chatId, newMessage } = await req.json()
    const productId = chatId.split('-')[0]
    const productOwnerId = chatId.split('-')[2]
    
    if (userData.id) {
        await connectToDB()
        const chat = await chatModel.findOne({ chatId }).lean()
        if (chat && chat.participants.toString().includes(userData.id)) {
            const chatData = await chatModel.findOneAndUpdate(
                { chatId },
                {
                    $push: {
                        messages: {
                            senderId: userData.id,
                            text: newMessage,
                            createdAt: new Date()
                        }
                    }
                },
                { new: true }
            )
            return Response.json({
                message: 'پیام ها دریافت شد',
                status: 201,
                error: null,
                chatId,
                chatMsgs: chatData.messages
            })
        } else {
            const chatData = await chatModel.create({
                chatId,
                productId,
                participants: [
                    userData.id,
                    productOwnerId
                ],
                messages: [{
                    senderId: userData.id,
                    text: newMessage,
                    createdAt: new Date()
                }]
            })
            return Response.json({
                message: 'پیام ها دریافت شد',
                status: 201,
                error: null,
                chatId,
                chatMsgs: chatData.messages
            })
        }
    }
}