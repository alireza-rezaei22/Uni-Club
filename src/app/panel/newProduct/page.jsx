'use client'
import React, { useEffect, useState } from 'react'
import { ChevronDown, PlusSquare, Trash2 } from 'lucide-react'
// import Cities from '@/Components/cities/Cities'
import SubmitBtn from '@/Components/submitBtn/SubmitBtn'
import { useActionState } from 'react'
import NewProductAction from '../../actions/newProduct'
import { newProductSchema } from '@/utils/validation'
// import SelectMap from '@/Components/map/selectMap'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
const uploadToImgBB = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('album', process.env.NEXT_PUBLIC_OSTAD_ALBUM);

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

function NewProduct() {
  const router = useRouter()
  const [isFormValid, setIsFormValid] = useState(false)
  const [formState, formAction] = useActionState(NewProductAction, {
    message: '',
    error: undefined,
    inputs: {
      image: '',
      title: '',
      description: '',
      city: '',
    }
  })
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  // const [city, setCity] = useState('-1')
  const [condition, setCondition] = useState('-1')
  const [category, setCategory] = useState('-1')
  const [price, setPrice] = useState('')
  // const [location, setLocation] = useState('')
  const [confirmation, setConfirmation] = useState(false)


  useEffect(() => {
    setIsFormValid(newProductSchema.safeParse({ image, title, description, condition, category, price }).success && confirmation)
  }, [title, condition, category, price, confirmation])
  useEffect(() => {
    if (image?.name) {
      const imageURL = URL.createObjectURL(image)
      setPreview(imageURL)
    }
  }, [image])
  useEffect(() => {
    console.log(isFormValid);

  }, [isFormValid])
  useEffect(() => {
    console.log(formState);

    if (formState?.error) {
      toast.error(formState.message, { position: 'bottom-center' })
    } else if (formState.message) {
      toast.success(formState.message, { position: 'bottom-center' })
      router.push('/panel')
    }
  }, [formState])

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
      <h2 className="bg-blue-100 w-fit px-4 py-2 rounded-4xl text-[#0056AA] text-2xl font-bold mb-6 self-start">اگهی جدید</h2>
      <form
        className='w-full max-w-126 flex flex-col items-center gap-5 mb-16'
        action={formAction}
      >
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
                  document.getElementById('userImgInput').value = '';
                }}
              >
                <Trash2 />
              </button>
            )}
          </div>
        </div>

        <h3 className='self-start text-xl font-bold'>عنوان*</h3>
        <input type="text"
          name='title'
          className='bg-zinc-100 border w-full border-zinc-200 rounded-md px-2 py-2 outline-0'
          placeholder='عنوان آگهی ...'
          onChange={e => setTitle(e.target.value)}
          defaultValue={formState?.inputs?.title}
        />
        <h3 className='self-start text-xl font-bold'>توضیحات</h3>
        <textarea type="text"
          name='description'
          className='bg-zinc-100 border w-full border-zinc-200 rounded-md px-2 py-2 outline-0'
          placeholder='توضیحات آگهی ...'
          onChange={e => setDescription(e.target.value)}
          defaultValue={formState?.inputs?.description}
        />
        {/* <h3 className='self-start text-xl font-bold'>شهر*</h3>
        <Cities className='w-full' setCity={setCity} isInNav={false} /> */}

        <h3 className='self-start text-xl font-bold'>وضعیت کالا*</h3>
        <div className="bg-zinc-100 w-full flex rounded-md p-2 cursor-pointer relative">
          <select
            className='appearance-none outline-0 pl-10'
            name="condition"
            onChange={e => setCondition(e.target.value)}>
            <option value="-1">انتخاب</option>
            <option value="new">نو</option>
            <option value="as_new">درحدنو</option>
            <option value="worked">کارکرده</option>
          </select>
          <div className='absolute left-4 flex items-center pointer-events-none' >
            <ChevronDown />
          </div>
        </div>
        <h3 className='self-start text-xl font-bold'>دسته بندی*</h3>
        <div className="bg-zinc-100 w-full flex rounded-md
         p-2 cursor-pointer relative">
          <select
            className='appearance-none outline-0 pl-10'
            name="category"
            onChange={e => setCategory(e.target.value)}>
            <option value="-1">انتخاب</option>
            <option value="food">غذا</option>
            <option value="book">کتاب و جزوه</option>
            <option value="house">املاک</option>
            <option value="digital">کالای دیجیتال</option>
            <option value="accessory">اکسسوری</option>
            <option value="other">سایر</option>
          </select>
          <div className='absolute left-4 flex items-center pointer-events-none' >
            <ChevronDown />
          </div>
        </div>
        <h3 className='self-start text-xl font-bold'>قیمت <em className='text-zinc-500 text-sm'>(تومان)</em></h3>
        <input type="number"
          name='price'
          className='bg-zinc-100 border w-full border-zinc-200 rounded-md px-2 py-2 outline-0'
          placeholder='قیمت محصول ...'
          onChange={e => setPrice(e.target.value)}
          defaultValue={formState?.inputs?.price}
          value={price.toLocaleString()}
        />
        {/* <h3 className='self-start text-xl font-bold'>موقعیت مکانی</h3>
        <div className='bg-emerald-400 h-80 w-full'>
          <SelectMap setLocationProp={setLocation} />
          <input type='hidden' name='location' value={location} />
        </div> */}
        <div className='self-start flex gap-2 text-zinc-100'>
          <input type="checkbox" name='confirmation' onClick={() => setConfirmation(prev => !prev)} />
          <p>با ثبت این اطلاعات موافقت خود را با <Link href={'/terms'} className='text-blue-400 cursor-pointer'>قوانین سایت</Link> تایید می کنم</p>
        </div>
        <SubmitBtn isFormValid={isFormValid}>ثبت</SubmitBtn>
      </form>
    </div>
  )
}

export default NewProduct