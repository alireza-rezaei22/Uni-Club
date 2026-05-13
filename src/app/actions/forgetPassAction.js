"use server"
import connectToDB from "@/configs/DB";
import userModel from "@/model/user";
import { forgetPassSchema } from "@/utils/validation";
import bcrypt from 'bcryptjs'
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

const forgetPassAction = async (prevState, formData) => {
    const mode = formData.get('actionMode')
    const phone = formData.get('phone')
    const userCode = formData.get('userCode')
    const newPassword = formData.get('newPassword')
    const confirmNewPassword = formData.get('confirmNewPassword')
    let OTPCode = null
    let user = null
    if (mode === 'phoneInput') {
        OTPCode = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] % 1000000)
        const isUserExist = await userModel.findOne({ phone })
        user = isUserExist
        if (isUserExist) {
            return {
                message: "کد احراز هویت برای شما ارسال شد",
                error: undefined,
                OTPCode: OTPCode,
                statusCode: 200,
                inputs: {
                    actionMode: 'otpInput',
                    phone
                }
            }
        } else {
            return {
                message: "کاربری با این شماره یافت نشد",
                error: 'user with phone number not found',
                OTPCode: OTPCode,
                statusCode: 404,
                inputs: {
                    actionMode: 'otpInput',
                    phone
                }
            }
        }

    } else if (mode === 'otpInput') {
        if (userCode == prevState.OTPCode) {
            return {
                message: "",
                error: undefined,
                OTPCode: OTPCode,
                statusCode: null,
                inputs: {
                    actionMode: 'changePass',
                    phone: prevState.inputs.phone
                }
            }
        } else {
            OTPCode = prevState.OTPCode
            return {
                message: "کد وارد شده صحیح نیست",
                error: 'OTP is not correct',
                OTPCode: OTPCode,
                statusCode: 400,
                inputs: {
                    actionMode: 'otpInput',
                    phone: prevState.inputs.phone
                }
            }
        }
    } else if (mode === 'changePass') {
        const isPasswordSame = forgetPassSchema.safeParse({ newPassword, confirmNewPassword }).success
        if (isPasswordSame) {
            const hashedPass = await bcrypt.hash(newPassword, 10)
            const user = await userModel.findOne({ phone })
            const token = sign({id: user.id, name: user.name, phone: user.phone}, process.env.ACCESSTOKEN_SECRETKEY,{expiresIn:'30d'})
            const pass = await userModel.findOneAndUpdate({ phone }, { password: hashedPass }, { new: true })
            const userCookies = (await cookies()).set({name:'token', value: token, httpOnly: true, path: '/'})
            return {
                message: "گدرواژه با موفقیت تغییر کرد",
                error: undefined,
                OTPCode: OTPCode,
                statusCode: 301,
                inputs: {
                    actionMode: 'changePass',
                    phone: prevState.inputs.phone
                }
            }
        } else {
            return {
                message: "گدرواژه با تکرار مطابقت ندارد",
                error: 'password and confirm is not same',
                OTPCode: OTPCode,
                statusCode: 400,
                inputs: {
                    actionMode: 'changePass',
                    phone: prevState.inputs.phone
                }
            }
        }
        
    } else {

    }
    return {
        message: "اشکالی در اتصال به سرور وجود دارد",
        error: 'there is a problem with connecting to server',
        statusCode: 500,
        inputs: {
            actionMode: 'otpInput',
            phone: ''
        }
    }
}
export default forgetPassAction