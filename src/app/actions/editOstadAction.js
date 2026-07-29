"use server"
import connectToDB from "@/configs/DB";
import { newOstadSchema } from "@/utils/validation";
import ostadModel from "@/model/ostad";
// import { writeFile, mkdir } from "fs/promises"
// import path from "path";
import authorizUser from "@/utils/authorizUser";

const EditOstadAction = async (prevState, formData) => {

    const id = formData.get('id')
    const name = formData.get('name')
    const biography = formData.get('biography')
    const degree = formData.get('degree')
    const studyField = formData.get('studyField')
    const category = formData.get('category')
    const RawCourses = formData.get('courses')
    const courses = RawCourses ? JSON.parse(RawCourses) : []

    const startYear = formData.get('startYear')
    const userData = await authorizUser()
    const image = formData.get('image')
    const imageChanged = formData.get('imageChanged') === 'true'
    const imageUrl = formData.get('imageUrl');
    console.log(imageUrl);


    if (userData) {
        const validationResult = newOstadSchema.safeParse({
            name, biography, degree, category
        })
        if (validationResult.success) {
            try {
                await connectToDB()
                const ostadRegisterer = await ostadModel.findById(id).select('registrarId')

                if (userData.role == 'admin' || ostadRegisterer.registrarId == userData.id) {
                    await connectToDB()
                    if (imageChanged) {
                        // let imgName = null
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
                        } else {
                            // try {
                            //     const BufferImg = Buffer.from(await image.arrayBuffer())
                            //     imgName = Date.now() + image.name
                            //     const direction = path.join(process.cwd(), 'public/uploads/ostads')
                            //     const filePath = path.join(direction, imgName)
                            //     await mkdir(direction, { recursive: true })
                            //     await writeFile(filePath, BufferImg)
                            // } catch (error) {
                            //     console.error("Failed to save image:", error);
                            // }
                            await ostadModel.findByIdAndUpdate(id, {
                                image: imageUrl ? imageUrl : undefined,
                                name,
                                biography,
                                degree,
                                studyField,
                                category,
                                courses,
                                startYear,
                            })
                        }
                    } else {
                        await ostadModel.findByIdAndUpdate(id, {
                            name,
                            biography,
                            degree,
                            studyField,
                            category,
                            courses,
                            startYear,
                        })
                    }
                    return {
                        message: "اطلاعات استاد با موفقیت ویرایش شد :)",
                        error: undefined,
                        inputs: {
                            image: '',
                            name: '',
                            biography: '',
                            degree: '-1',
                            studyField: '',
                            category: '-1',
                            courses: [],
                            startYear: -1,
                        }
                    }
                }
            } catch (error) {
                console.log(error);
                return {
                    message: "اشکالی در اتصال به سرور وجود دارد :(",
                    error: 'there is a problem with connecting to server',
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
        }
        return {
            message: "لطفا از صحت اطلاعات وارد شده اطمینان حاصل کنید :(",
            error: 'user data is not correct',
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
    } else {
        return {
            message: "برای ویرایش اطلاعات استاد باید وارد حساب کاربری شوید :(",
            error: 'user is not loggedin',
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
}
export default EditOstadAction