import React from 'react'
import { ChevronDown } from 'lucide-react';
import useFilters from '@/app/hooks/useFilters';
import { useFilterSotre } from '@/store/useFilterStore';


function Cities({ setCity, isInNav }) {
  const filters = useFilterSotre(state => state.filters )
  const setFilters = useFilterSotre(state => state.setFilters)
  const data = useFilters(filters)
  const selectCity= (selectedCity) =>{ 
    console.log(selectedCity);
     
    setCity(selectedCity.city)
    setFilters(selectedCity)
  }
  return (
    <div className={`${isInNav ? 'bg-green-400 text-zinc-900 hover:bg-green-500' : 'bg-zinc-100' }  w-full flex rounded-full p-2 cursor-pointer relative`}>
      <select
        className='appearance-none outline-0 pl-10'
        onChange={e=> selectCity({city: e.target.value})}
        name='city'
      >
        <option value="-1">همه استان ها</option>
        <option value="همدان">همدان</option>
        <option value="تهران">تهران</option>
        <option value="یزد">یزد</option>
        <option value="اصفهان">اصفهان</option>
        <option value="مشهد">مشهد</option>
        <option value="سایر">سایر</option>
      </select>
      <div className='absolute left-4 flex items-center pointer-events-none' >
        <ChevronDown/>
      </div>
    </div>
  )
}

export default Cities