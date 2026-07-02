import connectToDB from "@/configs/DB"
import markModel from "@/model/mark"
import productModel from "@/model/product"
import userModel from "@/model/user"
import authorizUser from "@/utils/authorizUser"

export async function DELETE(request, { params }) {
    const { id } = await params
    const userInfo = await authorizUser()
    if (userInfo) {
        await connectToDB()
        const user = await userModel.findById(userInfo.id)
        if (user?.role === 'admin') {
            try {
                await productModel.findOneAndDelete({_id: id})
                const newList = await productModel.find({}, '-__v')
                await markModel.deleteMany({ itemId: id })
                return Response.json({ newList, status: 200 })
            } catch (error) {
                console.log(error);
                return Response.json({ error: 'خطایی سمت سرور پیش آمد', status: 500 })
            }
        } else {
            return Response.json({ error: 'کاربر پیدا نشد یا دسترسی ندارید', status: 403 })
        }
    } else {
        return Response.json({ error: 'ابتدا وارد حساب کاربری شوید', status: 403 })
    }
}