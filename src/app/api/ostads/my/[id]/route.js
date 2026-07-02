import connectToDB from "@/configs/DB"
import authorizUser from "@/utils/authorizUser"
import ostadModel from "@/model/ostad"
import commentModel from "@/model/comment"
import markModel from "@/model/mark"
import rateModel from "@/model/rate"

export async function GET(request, { params }) {
    try {
        await connectToDB()
        const userInfo = await authorizUser()
        if (userInfo?.id) {
            const { id } = await params
            const ostadRegisterer = await ostadModel.findById(id).select('registrarId')
            if (userInfo?.role == 'admin' || ostadRegisterer.registrarId == userInfo.id) {
                const ostad = await ostadModel.findById(id)
                return Response.json({ ostad, status: 200 })
            } else {
                return Response.json({ error: 'استاد یافت نشد یا دسترسی حذف ندارید' }, { status: 403 })
            }
        } else {
            return Response.json({ error: 'باید لاگین کنید' }, { status: 401 })
        }
    } catch (error) {
        console.log(error)
        return Response.json({ error: 'خطای داخلی سرور' }, { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectToDB()
        const userInfo = await authorizUser()

        if (!userInfo?.id) {
            return Response.json({ error: 'باید لاگین کنید' }, { status: 401 })
        }

        const { id } = await params
        const deletedOstad = await ostadModel.findOneAndDelete({
            _id: id,
            registrarId: userInfo.id
        })

        if (!deletedOstad) {
            return Response.json({ error: 'استاد یافت نشد یا دسترسی حذف ندارید' }, { status: 403 })
        }
        await commentModel.deleteMany({ ostadId: id })
        await rateModel.deleteMany({ ostadId: id })
        await markModel.deleteMany({ itemId: id })
        const newList = await ostadModel.find({ registrarId: userInfo.id })
        return Response.json({ newList, msg: 'استاد با موفقیت حذف شد' }, { status: 200 })

    } catch (error) {
        console.error("Delete Error:", error)
        return Response.json({ error: 'خطای داخلی سرور' }, { status: 500 })
    }
}