"use server";
import connectToDB from "@/configs/DB";
import userModel from "@/model/user";
import { loginSchema } from "@/utils/validation";
import bcrypt from "bcryptjs"
import {sign} from "jsonwebtoken"
import { cookies } from "next/headers";

const loginAction = async (prevState, formData) => {
    const phone = formData.get('phone')
    const password = formData.get('password')
    const validationResult = loginSchema.safeParse({ phone, password })
    if (validationResult.success) {
        try {
            await connectToDB()
            const user = await userModel.findOne({ phone })
            if (user) {
                const isValidPassword = await bcrypt.compare(password, user.password)
                if (isValidPassword) {
                    const token = sign({id: user.id, name: user.name, phone: user.phone, role: user.role}, process.env.ACCESSTOKEN_SECRETKEY,{expiresIn:'1d'})
                    const userCookies = await cookies()
                    userCookies.set({
                        name: 'token',
                        value: token,
                        httpOnly: true,
                        path: '/',
                    })
                    
                    return {
                        message: "با موفقیت لاگین شدید :)",
                        error: undefined,
                        statusCode: 301,
                        inputs: {
                            phone: validationResult.phone,
                            password: validationResult.password,
                        }
                    }
                } else {
                    return {
                        message: "تلفن یا گذرواژه اشتباه است :(",
                        error: "ether phone or password is wrong",
                        statusCode: 400,
                        inputs: {
                            phone: validationResult.phone,
                            password: validationResult.password,
                        }
                    }
                }

            } else {
                return {
                    message: "کاربر یافت نشد :(",
                    error: validationResult.error?.issues[0].message,
                    statusCode: 404,
                    inputs: {
                        phone: validationResult.phone,
                        password: validationResult.password,
                    }
                }
            }

        } catch {
            return {
                message: "اشکالی در اتصال به سرور وجود داره",
                error: 'there is a problem with connecting to server',
                statusCode: 500,
                inputs: {
                    phone: validationResult.phone,
                    password: validationResult.password,
                }
            }
        }
    } else {
        return {
            message: "لطفا اطلاعات رو درست وارد کنید :(",
            error: validationResult.error?.issues[0].message,
            statusCode: 400,
            inputs: {
                phone: validationResult.phone,
                password: validationResult.password,
            }
        }
    }

}
export default loginAction