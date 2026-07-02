import connectToDB from "@/configs/DB";
import userModel from "@/model/user";

export async function GET(req) {
    try{
        await connectToDB()
    const users = await userModel.find({}, '-password -__v').lean()
        return Response.json({users , msg: 'لیست کاربران دریافت شد', status: 200 })
}catch(error){
    console.log(error);
    return Response.json({error: 'اشکالی در سمت سرور پیش آمد', status:500})
    }
}