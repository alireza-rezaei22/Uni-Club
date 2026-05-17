import connectToDB from "@/configs/DB";
import ostadModel from "@/model/ostad";

export async function GET(request){
    const ostads = await ostadModel.find({}, '-__v')
    return Response.json(ostads)
}

export async function POST(request){
    
    await connectToDB()    
    const filters = await request.json()

    const { order, degrees, category } = filters
    const query = {}
    // if (order && order !== '-1') query.order = order 
    if (category && category !== '-1') query.category = category 
    // if (degrees.length > 0) query.degrees = degrees 
    if (degrees.length > 0) query.degree = { $in: degrees }
    // if(city && city !== '-1') query.city = city 
    // if (degrees) {
    //     query.degrees ={}
    //     if(degrees?.from) query.degrees.$gte = +degrees.from
    //     if(degrees?.to) query.degrees.$lte = +degrees.to
    //     if(Object.keys(query.degrees).length === 0) delete query.degrees
    // }
    // if(condition) query.condition = condition
    console.log('query: ', query.degree);
    
    const filteredOstads = await ostadModel.find(query)
    console.log('filteredOstads: ', filteredOstads);
    
    return Response.json(filteredOstads);
}
