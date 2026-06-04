"use client"
import React, { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Drawer, Typography } from '@mui/material'
import { ChevronDown, Funnel, FunnelX } from 'lucide-react'
import useOstadsFilters from '@/app/hooks/useOstadsFilters'
import { useFilterOstadStore } from '@/store/useFilterOstadStore'

function OstadsFilter() {
    const order = useFilterOstadStore(state => state.order)
    const degrees = useFilterOstadStore(state => state.degrees)
    const category = useFilterOstadStore(state => state.category)
    const setOrder = useFilterOstadStore(state => state.setOrder)
    const setDegrees = useFilterOstadStore(state => state.setDegrees)
    const setCategory = useFilterOstadStore(state => state.setCategory)
    const clearFilters = useFilterOstadStore(state => state.clearFilters);
    const { data } = useOstadsFilters({ order, degrees, category })
    const [hasFilter, setHasFilter] = useState(false)
    const [drawerStatus, setDrawerStatus] = useState(false)

    const clearFiltersHadler = () => {
        setHasFilter(false)
        clearFilters()
    };

    useEffect(() => {
        if (order || degrees.length || category) setHasFilter(true)
    }, [order, degrees, category])


    return (
        <>
            <div className=' md:hidden flex justify-start p-2 gap-2'>
                <button
                    className='flex justify-between hover:bg-zinc-700 items-center border-2 border-indigo-400 text-indigo-400 font-medium px-2 py-1 rounded-md transition-colors '
                    onClick={() => setDrawerStatus(prev => !prev)}
                >
                    <h2>فیلتر</h2>
                    <Funnel size={16} />
                </button>
                {
                    hasFilter &&
                    <button
                        className='flex justify-between hover:bg-zinc-700 items-center border-2 border-indigo-400 text-indigo-400 font-medium px-2 py-1 rounded-md transition-colors'
                        onClick={clearFiltersHadler}
                    >
                        <FunnelX size={16} />
                        <h2>حذف فیلتر ها</h2>
                    </button>
                }
            </div>

            <div
                className='w-full flex-wrap justify-start hidden bg-gradient-to-br from-indigo-500 to-indigo-600 text-zinc-100 font-medium
                    md:flex md:h-fit md:flex-col md:items-start md:p-2 md:space-y-2 md:rounded-md
                '>
                <span className='flex items-center gap-1'>
                    <Funnel size={16} />
                    <h2>فیلتر</h2>
                </span>

                {
                    hasFilter &&
                    <button
                        className='bg-indigo-100 w-full flex justify-start items-center gap-1 text-zinc-700 text-xs font-medium border border-zinc-500 p-3 rounded-sm'
                        onClick={clearFiltersHadler}
                    >
                        <FunnelX size={16} />
                        <h2>حذف فیلتر ها</h2>
                    </button>
                }
                <Accordion className='w-full' >
                    <AccordionSummary
                        expandIcon={<ChevronDown />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span" fontWeight={900}>ترتیب</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                            <h3>بیشترین امتیاز</h3>
                            <input
                                type="radio"
                                id="mRate"
                                value="desc"
                                checked={order.rate === 'desc'}
                                onChange={e => setOrder({ rate: e.target.value })}
                            />
                        </span>
                        <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                            <h3>بیشترین سابقه</h3>
                            <input
                                type="radio"
                                id="MExperienced"
                                value='asc'
                                checked={order.startYear === 'asc'}
                                onChange={e => setOrder({ startYear: e.target.value })}
                            />
                        </span>
                        <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                            <h3>کمترین سابقه</h3>
                            <input
                                type="radio"
                                id="LExperienced"
                                value="desc"
                                checked={order.startYear === 'desc'}
                                onChange={e => setOrder({ startYear: e.target.value })}
                            />
                        </span>
                    </AccordionDetails>
                </Accordion>
                <Accordion className='w-full'>
                    <AccordionSummary
                        expandIcon={<ChevronDown />}>
                        <Typography component="span" fontWeight={900}>مدرک</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className='flex justify-between gap-2 p-2'>
                            <h3>دیپلم</h3>
                            <input
                                type="checkbox"
                                className="border border-gray-300 rounded-md outline-0 px-1 hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-colors"
                                onChange={e => setDegrees('diploma')}
                                checked={degrees.includes('diploma')}
                            />
                        </div>
                        <div className='flex justify-between gap-2 p-2'>
                            <h3>کاردانی</h3>
                            <input
                                type="checkbox"
                                className="border border-gray-300 rounded-md outline-0 px-1 hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-colors"
                                onChange={e => setDegrees('associate')}
                                checked={degrees.includes('associate')}
                            />
                        </div>
                        <div className='flex justify-between gap-2 p-2 '>
                            <h3>کارشناسی</h3>
                            <input
                                type="checkbox"
                                className="border border-gray-300 rounded-md outline-0 px-1 hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-colors"
                                onChange={e => setDegrees('bachelor')}
                                checked={degrees.includes('bachelor')}
                            />
                        </div>
                        <div className='flex justify-between gap-2 p-2'>
                            <h3>کارشناسی ارشد</h3>
                            <input
                                type="checkbox"
                                className="border border-gray-300 rounded-md outline-0 px-1 hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-colors"
                                onChange={e => setDegrees('master')}
                                checked={degrees.includes('master')}
                            />
                        </div>
                        <div className='flex justify-between gap-2 p-2'>
                            <h3>دکترا</h3>
                            <input
                                type="checkbox"
                                className="border border-gray-300 rounded-md outline-0 px-1 hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-colors"
                                onChange={e => setDegrees('PhD')}
                                checked={degrees.includes('PhD')}
                            />
                        </div>

                    </AccordionDetails>
                </Accordion>
                <Accordion className='w-full' >
                    <AccordionSummary
                        expandIcon={<ChevronDown />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span" fontWeight={900}>نوع دروس</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                            <h3>تخصصی</h3>
                            <input
                                type="radio"
                                value="specialized"
                                checked={category === 'specialized'}
                                onChange={e => setCategory(e.target.value)}
                            />
                        </span>
                        <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                            <h3>عمومی</h3>
                            <input
                                type="radio"
                                value="general"
                                checked={category === 'general'}
                                onChange={e => setCategory(e.target.value)}
                            />
                        </span>
                    </AccordionDetails>
                </Accordion>

            </div>
            <div className='md:hidden'>
                <Drawer
                    anchor="bottom"
                    open={drawerStatus}
                    onClose={() => setDrawerStatus(prev => !prev)}
                >
                    <h2 className='p-2 text-xl font-medium'>فیلتر ها</h2>
                    <Accordion className='w-full' >
                        <AccordionSummary
                            expandIcon={<ChevronDown />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography component="span" fontWeight={900}>ترتیب</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                                <h3>بیشترین امتیاز</h3>
                                <input
                                    type="radio"
                                    id="mrate"
                                    value="asc"
                                    checked={order.rate === 'asc'}
                                    onChange={e => setOrder({ rate: e.target.value })}
                                />
                            </span>
                            <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                                <h3>بیشترین سابقه</h3>
                                <input
                                    type="radio"
                                    id="MExperienced"
                                    value='asc'
                                    checked={order.experience === 'asc'}
                                    onChange={e => setOrder({ experience: e.target.value })}
                                />
                            </span>
                            <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                                <h3>کمترین سابقه</h3>
                                <input
                                    type="radio"
                                    id="LExperienced"
                                    value="desc"
                                    checked={order.experience === 'desc'}
                                    onChange={e => setOrder({ experience: e.target.value })}
                                />
                            </span>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className='w-full'>
                        <AccordionSummary
                            expandIcon={<ChevronDown />}>
                            <Typography component="span" fontWeight={900}>مدرک</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className='flex justify-between gap-2 p-2'>
                                <h3>دیپلم</h3>
                                <input
                                    type="checkbox"
                                    className="border border-gray-300 rounded-md outline-0 px-1 hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-colors"
                                    onChange={e => setDegrees('diploma')}
                                />
                            </div>
                            <div className='flex justify-between gap-2 p-2'>
                                <h3>کاردانی</h3>
                                <input
                                    type="checkbox"
                                    className="border border-gray-300 rounded-md outline-0 px-1 hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-colors"
                                    onChange={e => setDegrees('associate')}
                                />
                            </div>
                            <div className='flex justify-between gap-2 p-2 '>
                                <h3>کارشناسی</h3>
                                <input
                                    type="checkbox"
                                    className="border border-gray-300 rounded-md outline-0 px-1 hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-colors"
                                    onChange={e => setDegrees('bachelor')}
                                />
                            </div>
                            <div className='flex justify-between gap-2 p-2'>
                                <h3>کارشناسی ارشد</h3>
                                <input
                                    type="checkbox"
                                    className="border border-gray-300 rounded-md outline-0 px-1 hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-colors"
                                    onChange={e => setDegrees('master')}
                                />
                            </div>
                            <div className='flex justify-between gap-2 p-2'>
                                <h3>دکترا</h3>
                                <input
                                    type="checkbox"
                                    className="border border-gray-300 rounded-md outline-0 px-1 hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-colors"
                                    onChange={e => setDegrees('PhD')}
                                />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className='w-full' >
                        <AccordionSummary
                            expandIcon={<ChevronDown />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography component="span" fontWeight={900}>نوع دروس</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                                <h3>تخصصی</h3>
                                <input
                                    type="radio"
                                    value="specialized"
                                    checked={category === 'specialized'}
                                    onChange={e => setCategory(e.target.value)}
                                />
                            </span>
                            <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                                <h3>عمومی</h3>
                                <input
                                    type="radio"
                                    value="general"
                                    checked={category === 'general'}
                                    onChange={e => setCategory(e.target.value)}
                                />
                            </span>
                        </AccordionDetails>
                    </Accordion>
                </Drawer>
            </div>
        </>
    )
}

export default OstadsFilter