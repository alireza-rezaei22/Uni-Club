import connectToDB from "@/configs/DB"
import markModel from "@/model/mark"
import productModel from "@/model/product"
import rateModel from "@/model/rate"
import userModel from "@/model/user"
import authorizUser from "@/utils/authorizUser"

export async function GET(request, { params }) {
    const { id } = await params
    const userInfo = await authorizUser()
    if(userInfo.role === 'admin'){
        try{
            await connectToDB()
            const user = await userModel.findById(id).select('-password -__v')
            return Response.json({ user, status: 200 })
        }catch(error){
            return Response.json({ error: 'اشکالی در سمت سرور پیش آمد', status: 500 })
        }
    }else{
        return Response.json({ error: 'شما دسترسی این کار را ندارید', status: 403 })
    }
}
export async function POST(params) {
    
}

export async function DELETE(request, { params }) {
    const { id } = await params
    const userInfo = await authorizUser()
    if (userInfo) {
        await connectToDB()
        const user = await userModel.findById(userInfo.id)
        const isAllowd = user?.role === 'admin' ? true : false
        if (isAllowd) {
            try {
                await userModel.findOneAndDelete({ _id: id })
                const newList = await userModel.find({}, '-__v')
                await rateModel.deleteMany({ userId: id })
                await markModel.deleteMany({ userId: id })
                await commentModel.deleteMany({ userId: id })
                await productModel.deleteMany({ ownerId: id })
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