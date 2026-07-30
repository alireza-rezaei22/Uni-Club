import connectToDB from "@/configs/DB";
import chatModel from "@/model/chat";
import authorizUser from "@/utils/authorizUser"

export async function GET(request) {
    const userData = await authorizUser()

    try {
        connectToDB()
        const userChatsAllMsg = await chatModel.find({ participants: userData.id }).populate({ path: 'productId', select: 'title image' }).populate({ path: 'participants', select: 'name' }).sort({ updatedAt: -1 })
        const userChats = userChatsAllMsg.map(chat => {
            const lastMsgText = chat.messages[chat.messages.length - 1].text
            const otherParticipantName = chat.participants.find(part => part.name !== userData.name).name;

            return {
                _id: chat._id,
                chatId: chat.chatId,
                productId: chat.productId,
                participants: chat.participants,
                otherParticipantName,
                lastMsgText,
            };
        })
        return Response.json({
            message: 'داده های چت دریافت شد',
            status: 200,
            error: null,
            userChats
        })
    } catch {
        return Response.json({
            message: 'اشکالی در اتصال به سرور وجود دارد',
            status: 500,
            error: 'cant connect to server',
            userChats: null
        })
    }
}
