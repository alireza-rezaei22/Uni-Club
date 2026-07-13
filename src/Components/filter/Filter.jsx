"use client"
import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Drawer, Typography } from '@mui/material'
import { ChevronDown, Funnel, FunnelX } from 'lucide-react'
import useFilters from '@/app/hooks/useFilters'
import { useFilterSotre } from '@/store/useFilterStore'

function Filter() {
    const filters = useFilterSotre(state => state.filters);
    const setFilters = useFilterSotre(state => state.setFilters);
    const clearFilters = useFilterSotre(state => state.clearFilters);
    const { data } = useFilters(filters)
    const [hasFilter, setHasFilter] = useState(false)
    const setFiltersHandler = (filter) => {
        setHasFilter(true)
        setFilters(filter);
    };
    const clearFiltersHadler = () => {
        setHasFilter(false)
        clearFilters()
    };

    const [drawerStatus, setDrawerStatus] = useState(false)

    return (
        <>
            <div className=' md:hidden flex justify-start p-2 gap-2'>
                <button
                    className='flex justify-between hover:bg-zinc-700 items-center border-2 border-[#0056AA] text-indigo-400 font-medium px-2 py-1 rounded-md transition-colors '
                    onClick={() => setDrawerStatus(prev => !prev)}
                >
                    <h2>فیلتر</h2>
                    <Funnel size={16} />
                </button>
                {
                    hasFilter &&
                    <button
                        className='flex justify-between hover:bg-zinc-700 items-center border-2 border-[#0056AA] text-indigo-400 font-medium px-2 py-1 rounded-md transition-colors'
                        onClick={clearFiltersHadler}
                    >
                        <FunnelX size={16} />
                        <h2>حذف فیلتر ها</h2>
                    </button>
                }
            </div>

            <div
                className='w-full flex-wrap justify-start hidden bg-[#0056AA] text-zinc-100 font-medium
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
                            <h3>ارزان ترین</h3>
                            <input
                                type="radio"
                                id="cheepest"
                                value='asc'
                                checked={filters.order?.price === 'asc'}
                                onChange={e => setFiltersHandler({ order: { price: e.target.value } })}
                            />
                        </span>
                        <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                            <h3>گران ترین</h3>
                            <input
                                type="radio"
                                id="expensivest"
                                value="desc"
                                checked={filters.order?.price === 'desc'}
                                onChange={e => setFiltersHandler({ order: { price: e.target.value } })}
                            />
                        </span>
                        <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                            <h3>جدید ترین</h3>
                            <input
                                type="radio"
                                id="newest"
                                value="asc"
                                checked={filters.order?.createdAt === 'asc'}
                                onChange={e => setFiltersHandler({ order: { createdAt: e.target.value } })}
                            />
                        </span>
                        <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                            <h3>قدیمی ترین</h3>
                            <input
                                type="radio"
                                id="oldest"
                                value="desc"
                                checked={filters.order?.createdAt === 'desc'}
                                onChange={e => setFiltersHandler({ order: { createdAt: e.target.value } })}
                            />
                        </span>

                    </AccordionDetails>
                </Accordion>
                <Accordion className='w-full'>
                    <AccordionSummary
                        expandIcon={<ChevronDown />}>
                        <Typography component="span" fontWeight={900}>قیمت</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className='flex justify-between gap-2 p-2'>
                            <h3>از</h3>
                            <input
                                type="number"
                                className="w-full border border-gray-300 rounded-md outline-0 px-1 hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-colors"
                                onChange={e => setFiltersHandler({ price: { ...filters.price, from: e.target.value } })}
                            />
                        </div>
                        <div className='flex justify-between gap-2 p-2'>
                            <h3>تا</h3>
                            <input
                                type="number"
                                className="w-full border border-gray-300 rounded-md outline-0 px-1 hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-colors"
                                onChange={e => setFiltersHandler({ price: { ...filters.price, to: e.target.value } })}
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
                        <Typography component="span" fontWeight={900}>وضعیت</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                            <h3>نو</h3>
                            <input
                                type="radio"
                                value="new"
                                checked={filters.condition === 'new'}
                                onChange={e => setFiltersHandler({ condition: e.target.value })}
                            />
                        </span>
                        <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                            <h3>درحد نو</h3>
                            <input
                                type="radio"
                                value="as_new"
                                checked={filters.condition === 'as_new'}
                                onChange={e => setFiltersHandler({ condition: e.target.value })}
                            />
                        </span>
                        <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                            <h3>کارکرده</h3>
                            <input
                                type="radio"
                                value="worked"
                                checked={filters.condition === 'worked'}
                                onChange={e => setFiltersHandler({ condition: e.target.value })}
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
                            <Typography component="span">ترتیب</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                                <h3>ارزان ترین</h3>
                                <input
                                    type="radio"
                                    id="cheepest"
                                    value='asc'
                                    checked={filters.order?.price === 'asc'}
                                    onChange={e => setFiltersHandler({ order: { price: e.target.value } })}
                                />
                            </span>
                            <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                                <h3>گران ترین</h3>
                                <input
                                    type="radio"
                                    id="expensivest"
                                    value="desc"
                                    checked={filters.order?.price === 'desc'}
                                    onChange={e => setFiltersHandler({ order: { price: e.target.value } })}
                                />
                            </span>
                            <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                                <h3>جدید ترین</h3>
                                <input
                                    type="radio"
                                    id="newest"
                                    value="asc"
                                    checked={filters.order?.createdAt === 'asc'}
                                    onChange={e => setFiltersHandler({ order: { createdAt: e.target.value } })}
                                />
                            </span>
                            <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                                <h3>قدیمی ترین</h3>
                                <input
                                    type="radio"
                                    id="oldest"
                                    value="desc"
                                    checked={filters.order?.createdAt === 'desc'}
                                    onChange={e => setFiltersHandler({ order: { createdAt: e.target.value } })}
                                />
                            </span>

                        </AccordionDetails>
                    </Accordion>
                    <Accordion className='w-full'>
                        <AccordionSummary
                            expandIcon={<ChevronDown />}>
                            <Typography component="span">قیمت</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className='flex justify-between gap-2 p-2'>
                                <h3>از</h3>
                                <input
                                    type="number"
                                    className="w-full border border-gray-300 rounded-md outline-0 px-1 hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-colors"
                                    onChange={e => setFiltersHandler({ price: { ...filters.price, from: e.target.value } })}
                                />
                            </div>
                            <div className='flex justify-between gap-2 p-2'>
                                <h3>تا</h3>
                                <input
                                    type="number"
                                    className="w-full border border-gray-300 rounded-md outline-0 px-1 hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-colors"
                                    onChange={e => setFiltersHandler({ price: { ...filters.price, to: e.target.value } })}
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
                            <Typography component="span">وضعیت</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                                <h3>نو</h3>
                                <input
                                    type="radio"
                                    value="new"
                                    checked={filters.condition === 'new'}
                                    onChange={e => setFiltersHandler({ condition: e.target.value })}
                                />
                            </span>
                            <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                                <h3>درحد نو</h3>
                                <input
                                    type="radio"
                                    value="as_new"
                                    checked={filters.condition === 'as_new'}
                                    onChange={e => setFiltersHandler({ condition: e.target.value })}
                                />
                            </span>
                            <span className='flex justify-between p-1 hover:bg-gray-100 hover:border hover:border-gray-400 transition-colors rounded-md cursor-pointer'>
                                <h3>کارکرده</h3>
                                <input
                                    type="radio"
                                    value="worked"
                                    checked={filters.condition === 'worked'}
                                    onChange={e => setToFilterStore({ condition: e.target.value })}
                                />
                            </span>
                        </AccordionDetails>
                    </Accordion>
                </Drawer>
            </div>
        </>
    )
}

export default Filter