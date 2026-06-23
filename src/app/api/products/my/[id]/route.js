import connectToDB from "@/configs/DB"
import markModel from "@/model/mark"
import productModel from "@/model/product"
import authorizUser from "@/utils/authorizUser"


export async function GET(req, { params }) {
    await connectToDB()
    const { id } = await params
    const userInfo = await authorizUser()
    const userProducts = await productModel.find({ ownerId: id })
    return Response.json(userProducts)
}
export async function DELETE(request, { params }) {
    try {
        await connectToDB()
        const userInfo = await authorizUser()

        if (!userInfo?.id) {
            return Response.json({ error: 'باید لاگین کنید', status: 401 })
        }

        const { id } = await params
        const deletedProduct = await productModel.findOneAndDelete({
            _id: id,
            ownerId: userInfo.id
        })

        if (!deletedProduct) {
            return Response.json({ error: 'آگهی یافت نشد یا دسترسی حذف ندارید', status: 403 })
        }
        await markModel.deleteMany({ itemId: id })
        const newList = await productModel.find({ ownerId: userInfo.id })
        return Response.json({ newList, msg: 'آگهی با موفقیت حذف شد', status: 200 })

    } catch (error) {
        console.error("Delete Error:", error)
        return Response.json({ error: 'خطای داخلی سرور', status: 500 })
    }
}