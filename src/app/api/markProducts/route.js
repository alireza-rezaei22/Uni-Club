import connectToDB from "@/configs/DB";
import markModel from "@/model/mark";
import authorizUser from "@/utils/authorizUser"

export async function GET(req) {
    try {
        await connectToDB()
        const userInfo = await authorizUser()
        
        const marks = await markModel.find({ userId: userInfo.id }).populate('productId')
        const markedProductsItems = marks.map(mark => mark.productId);

        return Response.json({ markedProductsItems }, { status: 200 })
    } catch(err) {
        return Response.json({ error: err}, { status: 500 })
    }
}