"use client"
import React from 'react'
import { Funnel, Home, List, Book, ForkKnifeCrossedIcon } from 'lucide-react'
import { Smartphone } from 'lucide-react';
import { Watch } from 'lucide-react';
import CategoryItem from '../categoryItem/CategoryItem';
import { useFilterSotre } from '@/store/useFilterStore';
import useFilters from '@/app/hooks/useFilters';


function Category() {

    const filters = useFilterSotre(state => state.filters)
    const setFilters = useFilterSotre(state => state.setFilters)
    const data = useFilters(filters)
    const selectCategory = (selected) => {
        setFilters({ category: selected })
    }

    const routes = [
        { Icon: List, text: 'همه', value: '-1' },
        { Icon: ForkKnifeCrossedIcon, text: 'غذا', value: 'food' },
        { Icon: Book, text: 'کتاب و جزوه', value: 'book' },
        { Icon: Home, text: 'املاک', value: 'house' },
        { Icon: Smartphone, text: 'کالای دیجیتال', value: 'digital' },
        { Icon: Watch, text: 'اکسسوری', value: 'accessory' },
    ]

    return (
        <div
            className='w-full flex flex-wrap justify-start
                    md:bg-[#0056AA] md:h-fit md:flex-col md:p-2 md:space-y-2 md:border md:rounded-md
                '>
            <span className='hidden md:flex items-center gap-1'>
                <Funnel size={16} />
                <h2>دسته بندی</h2>
            </span>
            {routes.map((route, index) => {
                return <CategoryItem key={index} route={route} selectCategory={selectCategory} />
            })}
        </div>
    )
}

export default Category