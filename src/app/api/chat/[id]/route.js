import connectToDB from "@/configs/DB";
import chatModel from "@/model/chat";
import productModel from "@/model/product";
import authorizUser from "@/utils/authorizUser";
import userModel from "@/model/user";

export async function GET(request, { params }) {
    const userData = await authorizUser()
    const { id } = await params
    if (!userData.id) {
        return Response.json({
            message: 'شما به این گفتوگو دسترسی ندارید',
            status: 401,
            error: 'لطفا وارد شوید'
        });
    }
    if (userData.id) {
        await connectToDB()        
        let productId = null
        let chatId = null
        let product = null

        if (id.includes('-')) {
            chatId = id
            productId = id.split('-')[0]
            product = await productModel.findById(productId).select('_id image title ownerId price condition').populate({ path: 'ownerId', select: 'name' }).lean()

        } else {
            productId = id
            product = await productModel.findById(id).select('_id image title ownerId price condition').populate({ path: 'ownerId', select: 'name' }).lean()
            chatId = productId + '-' + userData.id + '-' + product.ownerId._id
        }
        const chat = await chatModel.findOne({ chatId }).lean()
        let chatMsgs = []
        if(chat){
            if (chat.participants.toString().includes(userData.id)) {
                chatMsgs = chat.messages

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
                    message: 'شما به این گفتوگو دسترسی ندارید',
                    status: 403,
                    error: "user havn't acccess",
                    chatId,
                    chatMsgs: null,
                    product
                })
            }
        } else {
            return Response.json({
                message: 'پیامی وجود نداره',
                status: 404,
                error: 'there is no msg',
                chatId,
                chatMsgs: null,
                product
            })
        }
        
    }
    return Response.json({ message: 'خطا در پردازش درخواست', status: 400 });

}

export async function POST(req, { params }) {
    try {
        const userData = await authorizUser()

        if (!userData || !userData.id) {
            return Response.json({
                message: 'شما به این گفتوگو دسترسی ندارید',
                status: 401,
                error: 'لطفا وارد شوید'
            }, { status: 401 });
        }

        const { id } = await params
        const body = await req.json()
        const { chatId, newMessage } = body
        console.log('body: ', body);
        
        if (!chatId || !newMessage) {
            return Response.json({ message: 'اطلاعات ناقص است', status: 400 });
        }

        const parts = chatId.split('-')
        if (parts.length < 3) {
            return Response.json({ message: 'فرمت chatId نامعتبر است', status: 400 });
        }

        const productId = parts[0]
        const productOwnerId = parts[2]

        await connectToDB()

        let chatData;
        const chat = await chatModel.findOne({ chatId }).lean()

        if (chat && chat.participants && chat.participants.toString().includes(userData.id)) {
            chatData = await chatModel.findOneAndUpdate(
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
        } else {
            chatData = await chatModel.create({
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
        }

        return Response.json({
            message: 'پیام ارسال شد',
            status: 201,
            error: null,
            chatId,
            chatMsgs: chatData ? chatData.messages : []
        });

    } catch (error) {
        console.error("POST Error:", error);
        return Response.json({
            message: 'خطای سرور در ارسال پیام',
            status: 500,
            error: error.message
        }, { status: 500 });
    }
}