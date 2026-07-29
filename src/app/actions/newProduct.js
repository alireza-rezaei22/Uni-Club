"use server"
import connectToDB from "@/configs/DB";
import { newProductSchema } from "@/utils/validation";
import productModel from "@/model/product";
// import { writeFile, mkdir } from "fs/promises"
// import path from "path";
import authorizUser from "@/utils/authorizUser";

const NewProductAction = async (prevState, formData) => {

    const title = formData.get('title')
    const description = formData.get('description')
    // const city = formData.get('city')
    const condition = formData.get('condition')
    const category = formData.get('category')
    const price = formData.get('price')
    // const location = formData.get('location')?.split(',')
    const userData = await authorizUser()
    const image = formData.get('image')
    const imageUrl = formData.get('imageUrl');
    console.log(imageUrl);

    if (userData) {
        const validationResult = newProductSchema.safeParse({ title, condition, category })
        if (validationResult.success) {
            try {
                await connectToDB()
                let imgName = null
                if (image.size) {
                    const maxSize = 10 * 1024 * 1024
                    if (image.size > maxSize) {
                        return {
                            message: "لطفا عکسی با حجم کمتر از 10 مگ آپلود کنید :(",
                            error: 'max size limit',
                            inputs: {
                                image,
                                name,
                                biography,
                                degree,
                                studyField,
                                category,
                                courses: [],
                                startYear
                            }
                        }
                    }
                    // else {
                    //     try {
                    //         const BufferImg = Buffer.from(await image.arrayBuffer())
                    //         imgName = Date.now() + image.name
                    //         const direction = path.join(process.cwd(), 'public/uploads/products/')
                    //         const filePath = path.join(direction, imgName)
                    //         await mkdir(direction, { recursive: true })
                    //         await writeFile(filePath, BufferImg)
                    //     } catch (error) {
                    //         console.error("Failed to save image:", error);
                    //     }
                    // }
                }
                await productModel.create({
                    image: imageUrl ? imageUrl : undefined,
                    title,
                    description,
                    condition,
                    category,
                    price,
                    ownerId: userData.id
                })
                return {
                    message: "آگهی با موفقیت ثبت شد :)",
                    error: undefined,
                    inputs: {
                        image: '',
                        title: '',
                        description: '',
                        city: '-1',
                        condition: '-1',
                        category: '-1',
                        price: '',
                        location: ''
                    }
                }
            } catch (error) {
                console.log(error);
                return {
                    message: "اشکالی در اتصال به سرور وجود دارد :(",
                    error: 'there is a problem with connecting to server',
                    inputs: {
                        image,
                        title,
                        description,
                        city,
                        condition,
                        category,
                        price,
                        location
                    }
                }
            }
        }
        console.log(validationResult);

        return {
            message: "لطفا از صحت اطلاعات وارد شده اطمینان حاصل کنید :(",
            error: 'user data is not correct',
            inputs: {
                image,
                title,
                description,
                city,
                condition,
                category,
                price,
                location
            }
        }
    } else {
        return {
            message: "برای ثبت محصول باید وارد حساب کاربری شوید :(",
            error: 'user is not loggedin',
            inputs: {
                image,
                title,
                description,
                city,
                condition,
                category,
                price,
                location
            }
        }
    }
}
export default NewProductAction