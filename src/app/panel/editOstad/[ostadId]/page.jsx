'use client'
import React, { useEffect, useState } from 'react'
import { ChevronDown, PlusIcon, PlusSquare, Trash2, XCircle } from 'lucide-react'
import SubmitBtn from '@/Components/submitBtn/SubmitBtn'
import { useActionState, use } from 'react'
import { newOstadSchema } from '@/utils/validation'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import EditOstadAction from '@/app/actions/editOstadAction'
import { useAuthStore } from '@/store/useAuthStore'
import Link from 'next/link'

const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_IMG_HOST_URL}?key=${process.env.NEXT_PUBLIC_IMG_API_KEY}`, {
            method: 'POST',
            body: formData,
        });
        const data = await res.json();

        if (data.success) {
            return data.data.url;
        } else {
            throw new Error(data.error.message || "خطا در آپلود");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

function EditOstad({ params }) {
    const { ostadId } = use(params)
    const router = useRouter()
    const userInfo = useAuthStore(state => state.user)
    const [isFormValid, setIsFormValid] = useState(false)
    const [formState, formAction] = useActionState(EditOstadAction, {
        message: '',
        error: undefined,
        inputs: {
            id: '',
            image: '',
            name: '',
            biography: '',
            degree: '-1',
            studyField: '',
            courses: [],
            category: '-1',
            startYear: -1,
        }
    })
    const [ostad, setOstad] = useState({
        id: '',
        image: '',
        name: '',
        biography: '',
        degree: '-1',
        studyField: '',
        courses: [],
        category: '-1',
        startYear: -1,
    })
    const [preview, setPreview] = useState()
    const [courses, setCourses] = useState([])

    const [courseName, setCourseName] = useState('')
    const [classDay, setClassDay] = useState('-1')
    const [classStartTime, setClassStartTime] = useState('-1')
    const [classEndTime, setClassEndTime] = useState('-1')
    const [classLocation, setClassLocation] = useState('')
    const [confirmation, setConfirmation] = useState(false)

    const [image, setImage] = useState(null)
    const [imageChanged, setImageChanged] = useState(false)
    useEffect(() => {
        const getOstadInfo = async () => {
            try {
                const res = await fetch(`/api/ostads/my/${ostadId}`)
                const data = await res.json()
                if (data.status == 200) {
                    setOstad(data?.ostad)
                    setCourses(data?.ostad?.courses)
                }
                else {
                    toast.error(data.error, { position: 'bottom-center' })
                }
            } catch {
                console.log('خطا در برقراری ارتباط با سرور');
                toast.error('خطا در برقراری ارتباط با سرور', { position: 'bottom-center' })
            }
        }

        if (userInfo?.id) {
            console.log(userInfo);

            getOstadInfo()
        } else {
            router.push('/login-register')
        }
    }, [])

    useEffect(() => {
        setIsFormValid(newOstadSchema.safeParse(ostad).success && confirmation)
    }, [ostad, confirmation])
    useEffect(() => {
        if (ostad?.image?.name) {
            const imageURL = URL.createObjectURL(image)
            setPreview(imageURL)
        }
        if (ostad?.image) {
            setPreview(ostad.image)
        }
    }, [ostad])
    useEffect(() => {
        console.log("image: ", image);

        if (image?.name) {
            const imageURL = URL.createObjectURL(image)
            setPreview(imageURL)
        }
    }, [image])

    useEffect(() => {
        console.log(formState);

        if (formState?.error) {
            toast.error(formState.message, { position: 'bottom-center' })
        } else if (formState.message) {
            toast.success(formState.message, { position: 'bottom-center' })
            router.push('/panel')
        }
    }, [formState])

    const handleCourseDate = (event) => {
        event.preventDefault()
        if (classStartTime < classEndTime) {

            setCourses(prev => [...prev, ({ name: courseName, day: classDay, startTime: classStartTime, endTime: classEndTime, classLocation })])
            setCourseName('')
            setClassDay('-1')
            setClassStartTime('-1')
            setClassEndTime('-1')
            setClassLocation('')
        } else {
            toast.error('ساعت ورود باید قبل از ساعت خروج باشه ', { position: 'bottom-center' })
        }
    }
    useEffect(() => {
        console.log(courses);
        setOstad(prev => ({ ...prev, courses }))
    }, [courses])

    const deleteAttendance = (itemIndex) => {
        let tt = courses
        setCourses(tt.filter((date, index) => index != itemIndex))
    }
    const imageHandler = async (event) => {
        if (event.target.files[0]) {
            const file = event.target.files[0];

            if (file.size > 10 * 1024 * 1024) {
                toast.error('حجم فایل باید کمتر از 10 MB باشه', { position: 'bottom-center' });
                return;
            }
            const imageURL = URL.createObjectURL(file);
            setPreview(imageURL);
            setImage(file);
            setImageChanged(true)
            toast.loading("در حال آپلود عکس...", { position: 'bottom-center', id: 'upload-toast' });

            try {
                const uploadedUrl = await uploadToImgBB(file);

                setImage({ ...file, url: uploadedUrl });
                toast.success("عکس با موفقیت آپلود شد", { position: 'bottom-center', id: 'upload-toast' });
            } catch (err) {
                toast.error("خطا در آپلود عکس", { position: 'bottom-center', id: 'upload-toast' });
                setPreview(null);
                setImage(null);
            }
        }
    }
    return (
        <div className='flex flex-col justify-center items-center gap-5'>
            <h2 className="bg-blue-100 w-fit px-4 py-2 rounded-4xl text-[#0056AA] text-2xl font-bold mb-6 self-start">ویرایش استاد</h2>
            <form
                className='w-full max-w-126 flex flex-col items-center gap-5 mb-16'
                action={formAction}
            >
                <input type="hidden" name='imageChanged' value={imageChanged} />
                <div className='flex items-center'>
                    <div className='relative'>
                        <input type="hidden" name="imageUrl" value={image?.url || ''} />
                        <input
                            type="file"
                            name='image'
                            accept="image/*"
                            id='userImgInput'
                            className='hidden'
                            onChange={e => imageHandler(e)}
                        />

                        {preview ? (
                            <label htmlFor='userImgInput'>
                                <img src={preview} className='w-full h-full rounded-md border-4 border-zinc-500' />
                            </label>
                        ) : (
                            <label htmlFor='userImgInput'>
                                <PlusSquare className='self-start size-28 text-zinc-700 cursor-pointer' />
                            </label>
                        )}

                        {preview && (
                            <button
                                type="button"
                                className='absolute left-2 top-2 bg-zinc-300 text-zinc-700 rounded-full p-1 w-10 h-10 cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white transition-all'
                                onClick={() => {
                                    setPreview(null);
                                    setImage(null);
                                    setImageChanged(true)
                                    document.getElementById('userImgInput').value = '';
                                }}
                            >
                                <Trash2 />
                            </button>
                        )}
                    </div>
                </div>
                <h3 className='self-start text-xl font-bold'>نام*</h3>
                <input type="text"
                    name='name'
                    className='bg-zinc-100 border w-full border-zinc-200 rounded-md px-2 py-2 outline-0'
                    placeholder='نام استاد را وارد کنید ...'
                    onChange={e => setOstad(prev => ({ ...prev, name: e.target.value }))}
                    defaultValue={ostad?.name}
                />
                <h3 className='self-start text-xl font-bold'>بیوگرافی*</h3>
                <textarea type="text"
                    name='biography'
                    className='bg-zinc-100 border w-full border-zinc-200 rounded-md px-2 py-2 outline-0'
                    placeholder='بیوگرافی از استاد را بنویسید ...'
                    onChange={e => setOstad(prev => ({ ...prev, biography: e.target.value }))}
                    defaultValue={ostad?.biography}
                />
                <h3 className='self-start text-xl font-bold'>مدرک*</h3>
                <div className="bg-zinc-100 w-full flex rounded-md p-2 cursor-pointer relative">
                    <select
                        className='appearance-none outline-0 pl-10'
                        name="degree"
                        value={ostad.degree}
                        onChange={e => setOstad(prev => ({ ...prev, degree: e.target.value }))}
                    >
                        <option value="-1">انتخاب</option>
                        <option value="diploma">دیپلم</option>
                        <option value="associate">کاردانی</option>
                        <option value="bachelor">کارشنایی</option>
                        <option value="master">کارشناسی ارشد</option>
                        <option value="PhD">دکترا</option>
                    </select>
                    <div className='absolute left-4 flex items-center pointer-events-none' >
                        <ChevronDown />
                    </div>
                </div>
                <h3 className='self-start text-xl font-bold'>رشته تحصیلی <em className='text-zinc-400 text-sm'>(اختیاری)</em></h3>
                <input type="text"
                    name='studyField'
                    className='bg-zinc-100 border w-full border-zinc-200 rounded-md px-2 py-2 outline-0'
                    placeholder='رشته تحصیلی استاد را بنویسید ...'
                    onChange={e => setOstad(prev => ({ ...prev, studyField: e.target.value }))}
                    defaultValue={ostad?.studyField}
                />
                <h3 className='self-start text-xl font-bold'>دسته بندی*</h3>
                <div className="bg-zinc-100 w-full flex rounded-md p-2 cursor-pointer relative">
                    <select
                        className='appearance-none outline-0 pl-10'
                        name="category"
                        value={ostad.category}
                        onChange={e => setOstad(prev => ({ ...prev, category: e.target.value }))}>
                        <option value="-1">انتخاب</option>
                        <option value="specialized">تخصصی</option>
                        <option value="general">عمومی</option>
                    </select>
                    <div className='absolute left-4 flex items-center pointer-events-none' >
                        <ChevronDown />
                    </div>
                </div>
                <h3 className='self-start text-xl font-bold'>کلاس های استاد <em className='text-zinc-400 text-sm'>(اختیاری)</em></h3>
                <div className='w-full flex flex-col gap-3'>
                    <div className='flex gap-2 flex-wrap'>
                        {courses.map((date, index) => {
                            return (
                                <div key={index} className='w-fit bg-zinc-400 text-zinc-50 text-sm flex flex-row justify-between items-start gap-2 p-2 rounded-xl'>
                                    <span>
                                        <h2 className='text-base font-medium text-zinc-700'>{date.name} - {date.classLocation}</h2>
                                        <h2>{date.day}  از ساعت {date.startTime} تا ساعت {date.endTime}</h2>
                                    </span>
                                    <XCircle color='white' className='cursor-pointer' onClick={() => deleteAttendance(index)} />
                                </div>
                            )
                        })}
                    </div>
                    <input type="hidden" name='id' value={ostad._id} />
                    <input type="hidden" name='courses' value={JSON.stringify(courses)} />
                    <div className='flex gap-2'>
                        <input type="text"
                            name='className'
                            className='w-2/3 bg-zinc-100 border  border-zinc-200 rounded-md px-2 py-2 outline-0'
                            placeholder='نام درسی که استاد تدریس می کند ...'
                            onChange={e => setCourseName(e.target.value)}
                            value={courseName}
                        />
                        <input type="text"
                            name='classLocation'
                            className='w-1/3 bg-zinc-100 border  border-zinc-200 rounded-md px-2 py-2 outline-0'
                            placeholder='محل تشکیل...'
                            onChange={e => setClassLocation(e.target.value)}
                            value={classLocation}
                        />
                    </div>
                    <div className='flex gap-1'>
                        <div className="bg-zinc-100 w-1/3 flex rounded-md p-2 cursor-pointer relative">
                            <select
                                className='appearance-none outline-0 pl-10'
                                name="Day"
                                onChange={e => setClassDay(e.target.value)}
                                value={classDay}
                            >
                                <option value="-1">روز</option>
                                <option value="شنبه">شنبه</option>
                                <option value="یکشنبه">یکشنبه</option>
                                <option value="دوشنبه">دوشنبه</option>
                                <option value="سه شنبه">سه شنبه</option>
                                <option value="چهارشنبه">چهارشنبه</option>
                                <option value="پنجشنبه">پنجشنبه</option>
                            </select>
                            <div className='absolute left-4 flex items-center pointer-events-none' >
                                <ChevronDown />
                            </div>
                        </div>
                        <div className="bg-zinc-100 w-1/3 flex rounded-md p-2 cursor-pointer relative">
                            <select
                                className='appearance-none outline-0 pl-10'
                                name="classStart"
                                onChange={e => setClassStartTime(Number(e.target.value))}
                                value={classStartTime}
                            >
                                <option value="-1">از ساعت</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                            </select>
                            <div className='absolute left-4 flex items-center pointer-events-none' >
                                <ChevronDown />
                            </div>
                        </div>
                        <div className="bg-zinc-100 w-1/3 flex rounded-md p-2 cursor-pointer relative">
                            <select
                                className='appearance-none outline-0 pl-10'
                                name="classEnd"
                                onChange={e => setClassEndTime(Number(e.target.value))}
                                value={classEndTime}
                            >
                                <option value="-1">تا ساعت</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                            </select>
                            <div className='absolute left-4 flex items-center pointer-events-none' >
                                <ChevronDown />
                            </div>
                        </div>
                    </div>
                    <button
                        className={`${(courseName.length > 1 && classDay !== '-1' && classStartTime !== '-1' && classEndTime !== '-1' && classLocation.length > 1) ? 'bg-indigo-600 hover:bg-indigo-400' : 'bg-indigo-300'} text-white rounded-md p-2 cursor-pointer transition-colors`}
                        onClick={handleCourseDate}
                        disabled={courseName.length < 2 || classDay == '-1' || classStartTime == '-1' || classEndTime == '-1' || classLocation.length < 2}
                    >
                        افزودن +
                    </button>
                </div>
                <h3 className='self-start text-xl font-bold'>سال شروع فعالیت <em className='text-zinc-400 text-sm'>(اختیاری)</em></h3>
                <div className="bg-zinc-100 w-full flex rounded-md p-2 cursor-pointer relative">
                    <select
                        className='appearance-none outline-0 pl-10'
                        name="startYear"
                        value={ostad.startYear}
                        onChange={e => setOstad(prev => ({ ...prev, startYear: e.target.value }))}>
                        <option value={-1}>انتخاب</option>
                        <option value={1405}>1405</option>
                        <option value={1404}>1404</option>
                        <option value={1403}>1403</option>
                        <option value={1402}>1402</option>
                        <option value={1401}>1401</option>
                        <option value={1400}>1400</option>
                        <option value={1399}>1399</option>
                        <option value={1398}>1398</option>
                        <option value={1397}>1397</option>
                        <option value={1396}>1396</option>
                        <option value={1395}>1395</option>
                        <option value={0}>پیش از 1395</option>
                    </select>
                    <div className='absolute left-4 flex items-center pointer-events-none' >
                        <ChevronDown />
                    </div>
                </div>
                <div className='self-start flex gap-2 text-zinc-100'>
                    <input type="checkbox" name='confirmation' onClick={() => setConfirmation(prev => !prev)} />
                    <p>با ثبت این اطلاعات موافقت خود را با <Link href={'/terms'} className='text-blue-400 cursor-pointer'>قوانین سایت</Link> تایید می کنم</p>
                </div>
                <SubmitBtn isFormValid={isFormValid}>ثبت</SubmitBtn>
            </form >
        </div >
    )
}

export default EditOstad