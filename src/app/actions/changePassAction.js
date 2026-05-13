"use server"
import bcrypt from 'bcryptjs'
import connectToDB from '@/configs/DB'
import userModel from '@/model/user'
import authorizUser from '@/utils/authorizUser'

const ChangePassAction = async (prevState, formData) => {
    const currentPassword = formData.get('currentPassword')
    const newPassword = formData.get('newPassword')
    const confirmNewPassword = formData.get('confirmNewPassword')
    if (newPassword === confirmNewPassword) {
        try {
            await connectToDB()
            try {
                const userData = await authorizUser()
                
                const userPassword = (await userModel.findById(userData.id)).password
                const isValidPassword = await bcrypt.compare(currentPassword, userPassword)
                if (isValidPassword) {
                    const newHashedPassword = await bcrypt.hash(newPassword, 10)
                    const newUserPass = await userModel.findOneAndUpdate({ _id: userData.id }, { password: newHashedPassword })
                    return {
                        message: 'گذرواژه با موفقیت تغییر کرد',
                        error: 'password updade successfully',
                        statusCode: 301,
                        inputs: {
                            currentPassword,
                            newPassword,
                            confirmNewPassword
                        }
                    }
                } else {
                    return {
                        message: 'گذرواژه کنونی درست نیست',
                        error: 'current password is not correct',
                        statusCode: 400,
                        inputs: {
                            currentPassword,
                            newPassword,
                            confirmNewPassword
                        }
                    }
                }
            } catch {
                return {
                    message: 'اشکالی در وریفای کردن کاربر وجود دارد',
                    error: 'there is a problem with verifying',
                    statusCode: 400,
                    inputs: {
                        currentPassword,
                        newPassword,
                        confirmNewPassword
                    }
                }
            }
        } catch {
            return {
                message: 'اشکالی در اتصال به سرور وجود دارد',
                error: 'there is a problem with connecting to server',
                statusCode: 500,
                inputs: {
                    currentPassword,
                    newPassword,
                    confirmNewPassword
                }
            }
        }
    } else {
        return {
            message: 'گذرواژه جدید با تکرار همخوانی ندارد',
            error: 'password and confirm is not same',
            statusCode: 400,
            inputs: {
                currentPassword,
                newPassword,
                confirmNewPassword
            }
        }
    }
}
export default ChangePassAction