import connectToDB from "@/configs/DB"
import productModel from "@/model/product"
import authorizUser from "@/utils/authorizUser"


export async function GET(req, { params }) {
    await connectToDB()
    const { id } = await params
    
    const userProducts = await productModel.find({ ownerId: id })
    return Response.json(userProducts)
}

export async function DELETE(req, { params }) {
    const userInfo = await authorizUser()
    
    const { id } = await params
    await connectToDB()
    await productModel.findByIdAndDelete(id)
    const userProducts = await productModel.find({ ownerId: userInfo.id})
    return Response.json(userProducts);
}