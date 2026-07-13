"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Header() {
    const [banerIndex, setBanerIndex] = useState(0)
    const headerInfo = [
        { title: 'امتیاز دهی به اساتید', describtion: 'به اساتید امتیاز بدهید و نظر خود را درباره تدریس آنها بگویید', btnText: 'ورود به بخش اساتید', img: '/images/star.png',link: '/ostads/' },
        { title: 'خرید و فروش  کتاب و جزوه', describtion: 'کتاب و جزوه های مورد نظر را خرید و فروش کنید', btnText: 'ورود به بخش مبادلات', img: '/images/book.png',link: '/products/' },
        { title: 'ساعت کلاس ها', describtion: 'از زمان های حضور و ساعت برگزاری کلاس استاد مورد نظر خود با خبر شوید', btnText: 'ورود به بخش اساتید', img: '/images/clock.png',link: '/ostads/' },
        { title: 'خرید و فروش  کد غذا', describtion: 'کد غذا را خرید و فروش کنید', btnText: 'ورود به بخش مبادلات', img: '/images/pizza.png',link: '/products/' }
    ]
    useEffect(() => {
        const interval = setInterval(() => {
            setBanerIndex(prev => {
                if (prev >= headerInfo.length - 1) {
                    return 0
                } else {
                    return prev + 1
                }
            })
        }, 5000);
        return () => clearInterval(interval)
    }, [])

    return (
        <header className="relative bg-[#0056AA] flex items-start w-full h-[30vh] md:h-[45vh] md:mt-4 rounded-lg overflow-hidden">
            <div className="w-3/4 flex flex-col gap-4 p-8 text-indigo-200 z-50">
                <h1 className="text-lg md:text-4xl font-bold">{headerInfo[banerIndex]?.title}</h1>
                <p className="text-xs md:text-xl font-medium">{headerInfo[banerIndex]?.describtion}</p>
                <Link
                    className="bg-blue-500 w-fit font-semibold text-xs md:text-lg p-2 rounded-xl text-white cursor-pointer"
                    href={headerInfo[banerIndex]?.link}
                >{headerInfo[banerIndex]?.btnText}</Link>
            </div>
            <Image
                src={headerInfo[banerIndex]?.img}
                className='absolute -left-10 -bottom-5 md:left-40 md:-bottom-10 md:w-1/3'
                alt='baner image'
                width={300}
                height={300}
            />
        </header>
    )
}

export default Header