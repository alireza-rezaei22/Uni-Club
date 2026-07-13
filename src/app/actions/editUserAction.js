"use server"
import connectToDB from "@/configs/DB"
import userModel from "@/model/user";
import authorizUser from "@/utils/authorizUser";

const editUserAction = async (prevState, formData) => {
    const newName = formData.get('name')
    const newPhone = formData.get('phone')
    const userId = formData.get('userId')
    const userRole = formData.get('role')    
    try {
        await connectToDB()
        try {
            const userData = await authorizUser()
            if (userData.role === 'admin'){
                const user = await userModel.findByIdAndUpdate(
                    userId,
                    {
                        name: newName,
                        phone: newPhone,
                        role: userRole ? userRole : userData.role
                    },
                    { new: true }
                ).select('-password')
                return {
                    message: 'اطلاعات با موفقیت تغییر کرد :)',
                    error: undefined,
                    statusCode: 301,
                    inputs: user
                }
            }else if(userData.id == userId){
                const user = await userModel.findByIdAndUpdate(
                    userData.id,
                    {
                        name: newName,
                        phone: newPhone
                    },
                    { new: true }
                ).select('-password')
                return {
                    message: 'اطلاعات با موفقیت تغییر کرد :)',
                    error: undefined,
                    statusCode: 301,
                    inputs: user
                }
            }else{
                return {
                    message: 'شما درسترسی ندارید',
                    error: 'user have not access to change',
                    statusCode: 403,
                    inputs: {
                        name: newName,
                        phone: newPhone
                    }
                }
            }
        } catch {
            return {
                message: 'مشکلی در وریفای کردن کاربر پیش آمد',
                error: 'there is a problem with verifying',
                statusCode: 400,
                inputs: {
                    name: newName,
                    phone: newPhone
                }
            }
        }
    } catch {
        return {
            message: 'اشکالی در اتصال به سرور وجود داره',
            error: 'there is a problem with connecting to server',
            statusCode: 500,
            inputs: {
                name: newName,
                phone: newPhone
            }
        }
    }
}
export default editUserAction