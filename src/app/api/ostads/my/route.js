import connectToDB from "@/configs/DB"
import authorizUser from "@/utils/authorizUser"
import ostadModel from "@/model/ostad";
import commentModel from "@/model/comment";

export async function GET(request) {
    try {
        await connectToDB()
        const userInfo = await authorizUser()
        if (userInfo.id) {
            const ostads = await ostadModel.find({ registrarId: userInfo.id }).select('-courses -biography -__v').lean()
            const items = await Promise.all(
                ostads.map(async (item) => {
                    const count = await commentModel.countDocuments({ ostadId: item._id }).lean()
                    return { ...item, commentsCount: count }
                })
            )
            return Response.json({items, status: 200})
        }else{
            return Response.json({msg:'باید لاگین کنید', status: 403})
        }
    } catch (error) {
        console.log(error);
        return Response.json({ error: 'اشکالی در سمت سرور پیش آمد', status: 500 })
    }
}