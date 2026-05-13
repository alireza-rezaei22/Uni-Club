import React from 'react'

function CategoryItem({ route, selectCategory }) {
    const { Icon, text, value } = route
    // const 
    return (
        <button
            onClick={() => selectCategory(value)}
            className='flex-1 min-w-24 max-w-full h-24 bg-emerald-100 rounded-md flex flex-col justify-center items-center m-2 text-xs cursor-pointer
                md:bg-white md:h-fit md:flex-row md:justify-start md:p-2 md:m-1'>
            <Icon />
            {text}
        </button>
    )
}

export default CategoryItem