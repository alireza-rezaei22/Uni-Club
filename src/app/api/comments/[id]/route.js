import connectToDB from "@/configs/DB";
import commentModel from "@/model/comment";
import authorizUser from "@/utils/authorizUser"

export async function POST(req, { params }) {
    const userComment = await req.json()
    const { id: ostadId } = await params
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
    } else {
        return Response.json({ error: 'برای ثبت دیدگاه باید وارد حساب کاربری شوید', status: 403 })
    }
}
export async function DELETE(req, { params }) {
    const { id } = await params
    try {
        const userInfo = await authorizUser()
        await connectToDB()
        if (userInfo.id) {
            await commentModel.findOneAndDelete({ _id: id })
            const newUserComments = await commentModel.find({ userId: userInfo.id }).populate({ path: 'ostadId', select: '-biography -courses -startYear -studyField -__v' }).lean()
            const userCommentsWithC_Count = await Promise.all(
                newUserComments.map(async (item) => {
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
            return Response.json({ userCommentsWithC_Count, msg: 'دیدگاه پاک شد', status: 200 })
        } else {
            return Response.json({ error: 'برای پاک کردن دیدگاه وارد حساب کاربری شوید', status: 403 })
        }
    } catch (error) {
        console.log(error);
        return Response.json({ error, status: 500 })

    }
}