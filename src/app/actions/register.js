"use server";
import connectToDB from "@/configs/DB";
import userModel from "@/model/user";
import { registerSchema } from "@/utils/validation";
import bcrypt from 'bcryptjs'

const registerAction = async (prevState, formData) => {
        const name= formData.get('name')
        const phone= formData.get('phone')
        const password= formData.get('password')
        const confirmPassword= formData.get('confirmPassword')

    const validationResult = registerSchema.safeParse({name, phone, password, confirmPassword})
    if (validationResult.success) {
        try {
            await connectToDB()
            const isUserExist = await userModel.findOne({ phone }) ? true : false
            if (isUserExist) {
                return {
                    message: "کاربر از قبل وجود دارد :(",
                    error: validationResult.error?.issues[0].message,
                    statusCode: 400,
                    inputs: {
                        name: name,
                        phone: phone,
                        password: password,
                        confirmPassword: confirmPassword
                    }
                }
            } else {
                const hashedPassword = await bcrypt.hash(password, 10)
                await userModel.create({
                    name,
                    phone,
                    password: hashedPassword
                })
                return {
                    message: "کاربر با موفقیت ثبت شد :)",
                    error: validationResult.error?.issues[0].message,
                    statusCode: 201,
                    inputs: {
                        name,
                        phone,
                        password,
                        confirmPassword
                    }
                }
            }
        } catch {
            return {
                message: "اشکالی در اتصال به سرور وجود داره",
                error: 'there is a problem with connecting to server',
                statusCode: 500,
                inputs: {
                    name,
                    phone,
                    password,
                    confirmPassword
                }
            }
        }
    } else {
        return {
            message: "اطلاعات وارد شده معتبر نیست :(",
            error: validationResult.error.issues[0].message,
            statusCode: 400,
            inputs: {
                name: name,
                phone: phone,
                password: password,
                confirmPassword: confirmPassword
            }
        }
    }

}
export default registerAction