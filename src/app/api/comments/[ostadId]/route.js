import connectToDB from "@/configs/DB";
import commentModel from "@/model/comment";
import authorizUser from "@/utils/authorizUser"

export async function POST(req, { params }) {
    const userComment = await req.json()
    const { ostadId } = await params
    const userInfo = await authorizUser()
    if (userInfo) {
        try {
            await connectToDB()
            await commentModel.create({
                ostadId,
                userId: userInfo.id,
                comment: userComment
            })
            const rawComments = await commentModel.find({ ostadId }).populate({ path: 'userId', select: 'name -_id' }).select('userId comment')
            const newComments = rawComments.map(c => ({
                _id: c._id.toString(),
                comment: c.comment.toString(),
                userName: c.userId.name.toString(),
            }))

            return Response.json({ msg: 'دیدگاه شما با موفقیت ثبت شد', newComments, status: 201 })
        } catch (error) {
            console.log('sorry', error);
            return Response.json({ error: 'اشکالی پیش آمد لطفا دوباره تلاش کنید', status: 500 })

        }
    } else{
        return Response.json({ error: 'برای ثبت دیدگاه باید وارد حساب کاربری شوید' }, { status: 403 })
    }
}