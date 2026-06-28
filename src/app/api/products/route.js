import connectToDB from "@/configs/DB";
import productModel from "@/model/product";

export async function GET(request){
    const products = await productModel.find({}, '-__v')
    return Response.json({products, status: 200})
}

export async function POST(request){
    
    await connectToDB()    
    const filters = await request.json()

    const {order, price, condition, city, category} = filters
    const query = {}
    if (category && category !== '-1') query.category = category 
    if(city && city !== '-1') query.city = city 
    if(price) {
        query.price ={}
        if(price?.from) query.price.$gte = +price.from
        if(price?.to) query.price.$lte = +price.to
        if(Object.keys(query.price).length === 0) delete query.price
    }
    if(condition) query.condition = condition

    const filteredProducts = await productModel.find(query).sort(order)
    return Response.json(filteredProducts);
}
