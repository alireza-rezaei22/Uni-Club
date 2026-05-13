import productModel from "@/model/product";

export async function GET(req, { params }) {
    const { query } = await params
    const searchResult = await productModel.find({ title: new RegExp(query, 'i') })
    return Response.json({ searchResult }, { status: 200 })
}