import markModel from "@/model/mark";
import connectToDB from "@/configs/DB";
import authorizUser from "@/utils/authorizUser"

export async function POST(req, { params }) {
    const { itemId } = await params
    const userInfo = await authorizUser()
    if (userInfo) {
        try {
            await connectToDB()
            const existingMark = await markModel.findOne({ userId: userInfo.id, itemId });
            if (existingMark) {
                return Response.json({ error: 'قبلا نشان شده' }, { status: 400 });
            } else {
                await markModel.create({
                    userId: userInfo.id,
                    itemId,
                    itemType: 'ostad'
                })
                const marks = await markModel.find({ userId: userInfo.id }).populate('itemId')
                const markedItems = marks.map(mark => mark.itemId);
                return Response.json({ markedItems, msg: 'با موفقیت نشان شد' }, { status: 201 })
            }
        }
        catch (error) {
            console.log(error);
            return Response.json({ error: 'مشکلی در نشان کردن پیش آمد' }, { status: 500 })
        }
    } else {
        return Response.json({ error: 'برای نشان کردن لاگین کنید' }, { status: 403 })
    }
}

export async function DELETE(req, { params }) {
    const { itemId } = await params
    const userInfo = await authorizUser()
    if (userInfo) {
        try {
            await connectToDB()
            const selectedItem = await markModel.findOne({ userId: userInfo.id, itemId })
            if (selectedItem) {
                await markModel.findByIdAndDelete(selectedItem._id)
                const marks = await markModel.find({ userId: userInfo.id }).populate('itemId')
                const markedItems = marks.map(mark => mark.itemId);
                return Response.json({ markedItems, msg: 'نشان پاک شد' }, { status: 200 })
            }
        } catch (error) {
            return Response.json({ error: 'مشکلی پیش آمد' }, { status: 500 })
        }
    } else {
        return Response.json({ error: 'ابتدا لاگین کنید' }, { status: 403 })
    }
}