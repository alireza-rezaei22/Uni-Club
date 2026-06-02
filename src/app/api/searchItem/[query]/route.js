import connectToDB from "@/configs/DB";
import ostadModel from "@/model/ostad";
import productModel from "@/model/product";

export async function GET(req, { params }) {
    const { query } = await params
    try {
        await connectToDB()
        const productResults = await productModel.find({ title: new RegExp(query, 'i') })
        const ostadResults = await ostadModel.find({ name: new RegExp(query, 'i') })
        const searchResult = [...productResults, ...ostadResults]
        console.log('res: ',searchResult);
        
        return Response.json({ searchResult }, { status: 200 })
    } catch (error) {
        console.log(error);
        return Response.json({error:'اشکالی سمت سرور پیش آمد'} , { status: 500 })
    }
}