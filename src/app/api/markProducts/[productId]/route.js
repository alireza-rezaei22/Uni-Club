import markModel from "@/model/mark";
import connectToDB from "@/configs/DB";
import authorizUser from "@/utils/authorizUser"

export async function POST(req, { params }) {
    const { productId } = await params
    try {
        await connectToDB()
        try {

            const userInfo = await authorizUser()
            
            if (userInfo.status) {
                return userInfo
            } else {
                const existingMark = await markModel.findOne({ userId: userInfo.id, productId });
                if (existingMark) {
                    return Response.json({ error: 'محصول قبلا مارک شده' }, { status: 400 });
                } else {
                    await markModel.create({
                        userId: userInfo.id,
                        productId
                    })
                    const marks = await markModel.find({ userId: userInfo.id }).populate('productId')
                    const markedProductsItems = marks.map(mark => mark.productId);
                    console.log(markedProductsItems.length);
                    return Response.json({ markedProductsItems, msg: 'محصول با موفقیت مارک شد' }, { status: 200 })
                }
            }
        } catch (error) {
            return Response.json({ error: 'مشکلی در نشان کردن پیش آمد' }, { status: 500 })
        }
    } catch {
        return Response.json({ error: 'server internal error' }, { status: 500 })

    }
}

export async function DELETE(req, { params }) {
    const { productId } = await params
    try {

        await connectToDB()
        try {
            const userInfo = await authorizUser()
            if (userInfo.status) {
                return userInfo
            } else {
                const selectedProduct = await markModel.findOne({ userId: userInfo.id, productId })
                if (selectedProduct) {
                    await markModel.findByIdAndDelete(selectedProduct._id)
                    const marks = await markModel.find({ userId: userInfo.id }).populate('productId')
                    const markedProductsItems = marks.map(mark => mark.productId);
                    return Response.json({ markedProductsItems, msg: 'product successfully unmarked' }, { status: 200 })
                }
            }
        } catch (error) {
            return Response.json({ error: 'there is a problem in unmarking' }, { status: 500 })
        }
    } catch {
        return Response.json({ error: 'server internal error' }, { status: 500 })
    }
}