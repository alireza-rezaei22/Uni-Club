import connectToDB from "@/configs/DB"
import authorizUser from "@/utils/authorizUser"
import productModel from "@/model/product";

export async function GET(request) {
    try {
        await connectToDB()
        const userInfo = await authorizUser()
        if (userInfo.id) {
            const userProducts = await productModel.find({ ownerId: userInfo.id }).lean()

            return Response.json({ items: userProducts, status: 200 })
        } else {
            return Response.json({ error: 'باید لاگین کنید', status: 403 })
        }
    } catch (error) {
        console.log(error);
        return Response.json({ error: 'اشکالی در سمت سرور پیش آمد', status: 500 })
    }
}