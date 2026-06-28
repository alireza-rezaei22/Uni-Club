import connectToDB from "@/configs/DB";
import commentModel from "@/model/comment";
import ostadModel from "@/model/ostad";

export async function GET(request) {
    await connectToDB()
    const ostads = await ostadModel.find({}, '-__v').lean()
    const getItems = await Promise.all(
        ostads.map(async (item) => {
            const count = await commentModel.countDocuments({ ostadId: item._id }).lean()
            return { ...item, commentsCount: count }
        })
    )    
    // return Response.json(getItems)
    return Response.json({ ostads: getItems, msg: 'لیست کاربران دریافت شد', status: 200 })

}

export async function POST(request) {

    await connectToDB()
    const filters = await request.json()
    
    const { order, degrees, category } = filters
    const query = {}
    if (category && category !== '-1') query.category = category
    if (degrees.length > 0) query.degree = { $in: degrees }
    
    const filteredOstads = await ostadModel.find(query).sort(order|| {}).lean()

    const getItems = await Promise.all(
        filteredOstads.map(async (item) => {
            const count = await commentModel.countDocuments({ ostadId: item._id }).lean()
            return { ...item, commentsCount: count }
        })
    )    

    return Response.json(getItems);
}
