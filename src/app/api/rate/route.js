import connectToDB from "@/configs/DB";
import ostadModel from "@/model/ostad";
import rateModel from "@/model/rate";
import authorizUser from "@/utils/authorizUser";

export async function POST(req) {
    const { userId, ostadId, rate } = await req.json()
    const userInfo = await authorizUser()
    if (userInfo) {
        await connectToDB()
        const isUserRated = await rateModel.findOne({ userId, ostadId })
        if (isUserRated) {
            return Response.json({ error: 'شما قبلا رای دادید' }, { status: 400 })
        } else {
            try {
                await rateModel.create({
                    userId,
                    ostadId,
                    rate
                })
                const ostadRates = await rateModel.find({ ostadId })
                let sum = 0
                ostadRates.map(rateObj => {
                    sum += rateObj.rate
                })
                const rateAvg = sum / ostadRates.length

                await ostadModel.findOneAndUpdate({_id:ostadId}, {rate: rateAvg})
                return Response.json({ msg: 'رای شما با موفقیت ثبت شد' }, { status: 201 })
            } catch {
                return Response.json({ error: 'اشکالی پیش آمد لطفا دوباره تلاش کنید' }, { status: 500 })
            }
            
        }
    }else{
        return Response.json({ error: 'برای ثبت رای وارد حساب کاربری شوید' }, { status: 403 })
    }
}