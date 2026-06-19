import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(2, 'نام حداقل باید 2 کاراکتر باشد').max(15, 'نام حداکثر می تواند 15 کاراکتر داشته باشد'),
    phone: z.string().length(11, 'شماره تلفن باید 11 رقم باشد'),
    password: z.string().min(4, 'گذرواژه باید حداقل 4 کاراکتر باشد').max(12, 'گذرواژه باید حداکثر 12 کاراکتر باشد'),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: 'گذرواژه و تکرار همخوانی ندارد'
})

export const loginSchema = z.object({
    phone: z.string().length(11, 'شماره تلفن باید 11 رقم باشد'),
    password: z.string().min(4, 'گذرواژه باید حداقل 4 کاراکتر باشد').max(12, 'گذرواژه باید حداکثر 12 کاراکتر باشد'),
})

export const newProductSchema = z.object({
    title: z.string().min(2, 'عنوان باید حداقل 2 کاراکتر باشد').max(20, 'عنوان باید حداکثر 20 کاراکتر باشد'),
    // city: z.string().min(2, 'شهر باید حداقل 2 کاراکتر باشد').max(20, 'شهر باید حداکثر 20 کاراکتر باشد'),
    condition: z.enum(['new', 'as_new', 'worked']),
    category: z.enum(['house', 'digital', 'vehicle', 'accessory']),
    // price: z.string().min(1, 'قیمت الزامی است').transform(val => Number(val)).refine(val => !isNaN(val), 'قیمت باید عدد باشد')
})
export const newOstadSchema = z.object({
    name: z.string().min(2, 'نام باید حداقل 2 کاراکتر باشد').max(20, 'نام باید حداکثر 20 کاراکتر باشد'),
    biography: z.string().min(10, 'شهر باید حداقل 10 کاراکتر باشد'),
    degree: z.enum(['diploma', 'associate', 'bachelor', 'master', 'PhD']),
    category: z.enum(['specialized', 'general']),
    // confirmation: z.literal(true),
})

export const editUserSchema = z.object({
    name: z.string().min(2, 'نام حداقل باید 2 کاراکتر باشد').max(15, 'نام حداکثر می تواند 15 کاراکتر داشته باشد'),
    phone: z.string().length(11, 'شماره تلفن باید 11 رقم باشد'),
})

export const forgetPassSchema = z.object({
    newPassword: z.string().min(4, 'گذرواژه باید حداقل 4 کاراکتر باشد').max(12, 'گذرواژه باید حداکثر 12 کاراکتر باشد'),
    confirmNewPassword: z.string()
}).refine(data => data.newPassword === data.confirmNewPassword, {
    message: 'گذرواژه و تکرار همخوانی ندارد'
})
export const changePassSchema = z.object({
    currentPassword: z.string(),
    newPassword: z.string().min(4, 'گذرواژه باید حداقل 4 کاراکتر باشد').max(12, 'گذرواژه باید حداکثر 12 کاراکتر باشد'),
    confirmNewPassword: z.string()
}).refine(data => data.newPassword === data.confirmNewPassword, {
    message: 'گذرواژه و تکرار همخوانی ندارد'
})

