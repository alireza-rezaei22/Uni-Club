"use server"
import connectToDB from "@/configs/DB";
import { newOstadSchema } from "@/utils/validation";
import ostadModel from "@/model/ostad";
import { writeFile, mkdir } from "fs/promises"
import path from "path";
import authorizUser from "@/utils/authorizUser";

const NewOstadAction = async (prevState, formData) => {

    const name = formData.get('name')
    const biography = formData.get('biography')
    const degree = formData.get('degree')
    const studyField = formData.get('studyField')
    const category = formData.get('category')
    const rawCourses = formData.get('courses')
    
    let courses = []
    let coursesArr = rawCourses && rawCourses.split(',').map( item => item.trim().replace(/'/g, ""))
    for (let i = 0; i < coursesArr.length; i += 5) {
        courses.push({
            name: coursesArr[i],
            day: coursesArr[i + 1],
            startTime: coursesArr[i + 2],
            endTime: coursesArr[i + 3],
            classLocation: coursesArr[i + 4],
        })
    }
    console.log('courses: ', courses);
    
    const startYear = formData.get('startYear')
    const userData = await authorizUser()
    const image = formData.get('image')
    let imgName = null
    if (image.size) {
        try {
            const BufferImg = Buffer.from(await image.arrayBuffer())
            imgName = Date.now() + image.name
            const direction = path.join(process.cwd(), 'public/uploads/')
            const filePath = path.join(direction, imgName)
            await mkdir(direction, { recursive: true })
            await writeFile(filePath, BufferImg)
        } catch (error) {
            console.error("Failed to save image:", error);
        }
    }

    if (userData) {
        const validationResult = newOstadSchema.safeParse({
            name, biography, degree, category
        })
        if (validationResult.success) {
            try {
                await connectToDB()
                await ostadModel.create({
                    image: imgName ? `/uploads/${imgName}` : '',
                    name,
                    biography,
                    degree,
                    studyField,
                    category,
                    courses,
                    startYear,
                    rate: 5,
                    registrarId: userData.id
                })
                return {
                    message: "اطلاعات استاد جدید با موفقیت ثبت شد :)",
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
            message: "برای ثبت اطلاعات استاد باید وارد حساب کاربری شوید :(",
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
export default NewOstadAction