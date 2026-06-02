import connectToDB from "@/configs/DB";
import commentModel from "@/model/comment";
import authorizUser from "@/utils/authorizUser";

export async function GET() {
    try {
        const userInfo = await authorizUser()
        await connectToDB()
        const userComments = await commentModel.find({ userId: userInfo.id }).select('ostadId comment').populate({ path: 'ostadId', select: 'name image degree studyField category rate startYear' }).lean()
        const userCommentsWithC_Count = await Promise.all(
            userComments.map(async (item) => {
                const count = await commentModel.countDocuments({ ostadId: item.ostadId._id })
                return {
                    ...item,
                    ostadId: {
                        ...item.ostadId,
                        commentsCount: count
                    }
                }
            })
        )
        return Response.json(userCommentsWithC_Count, { status: 200 })

    } catch (error) {
        console.log(error);
        return Response.json({ error, status: 500 })
    }
}