// 'use client'
// import React, { useState } from 'react'
// import { Accordion, AccordionDetails, AccordionSummary, Drawer, Typography } from "@mui/material";
// import { ChevronDown, Funnel, Smile } from 'lucide-react'
// import useFilters from '@/app/hooks/useFilters';
// import { useFilterSotre } from '@/store/useFilterStore';

// function DrawerFilter() {
//     const [drawerStatus, setDrawerStatus] = useState(false)
//     const filters = useFilterSotre(state => state.filters);
//     const setFilters = useFilterSotre(state => state.setFilters);
//     const { data } = useFilters(filters)


//     const setToFilterStore = (filter) => {
//         setFilters(filter);
//     };
//     return (
//         <div className='md:hidden px-3'>
//             <button
//                 className='flex justify-between items-center border border-zinc-700 px-2 py-1 rounded-md bg-zinc-300'
//                 onClick={() => setDrawerStatus(prev => !prev)}
//             >
//                 فیلتر
//                 <Funnel size={18} />
//             </button>
//             <Drawer
//                 anchor="bottom"
//                 open={drawerStatus}
//                 onClose={() => setDrawerStatus(prev => !prev)}
//             >
//                 {/* <div className='p-5'> */}
//                 <h2 className='p-2 text-xl font-medium'>فیلتر ها</h2>
//                 <Accordion className='w-full' >
//                     <AccordionSummary
//                         expandIcon={<ChevronDown />}
//                         aria-controls="panel1-content"
//                         id="panel1-header"
//                     >
//                         <Typography component="span">ترتیب</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <span>
//                             <h3>ارزان ترین</h3>
//                             <input
//                                 type="radio"
//                                 id="cheepest"
//                                 value='asc'
//                                 checked={filters.order?.price === 'asc'}
//                                 // onChange={(e) => setFilters(prev => ({ ...prev, order: {'price': 1 }}))}
//                                 onChange={e => setToFilterStore({ order: { price: e.target.value } })}
//                             // onChange={(e) => dispatch({ type: 'ORDER', value: { 'price': 1 } })}
//                             />
//                         </span>
//                         <span>
//                             <h3>گران ترین</h3>
//                             <input
//                                 type="radio"
//                                 id="expensivest"
//                                 value="desc"
//                                 checked={filters.order?.price === 'desc'}
//                                 // onChange={(e) => setFilters(prev => ({ ...prev, order: {'price': desc} }))}
//                                 onChange={e => setToFilterStore({ order: { price: e.target.value } })}
//                             // onChange={(e) => dispatch({ type: 'ORDER', value: { 'price': desc } })}
//                             />
//                         </span>
//                         <span>
//                             <h3>جدید ترین</h3>
//                             <input
//                                 type="radio"
//                                 id="newest"
//                                 value="asc"
//                                 checked={filters.order?.createdAt === 'asc'}
//                                 // onChange={(e) => setFilters(prev => ({ ...prev, order: {'createdAt': 1} }))}
//                                 onChange={e => setToFilterStore({ order: { createdAt: e.target.value } })}
//                             // onChange={(e) => dispatch({ type: 'ORDER', value: { 'createdAt': 1 } })}
//                             />
//                         </span>
//                         <span>
//                             <h3>قدیمی ترین</h3>
//                             <input
//                                 type="radio"
//                                 id="oldest"
//                                 value="desc"
//                                 checked={filters.order?.createdAt === 'desc'}
//                                 // onChange={(e) => setFilters(prev => ({ ...prev, order: {'createdAt': desc} }))}
//                                 onChange={e => setToFilterStore({ order: { createdAt: e.target.value } })}
//                             // onChange={(e) => dispatch({ type: 'ORDER', value: { 'createdAt': desc } })}
//                             />
//                         </span>

//                     </AccordionDetails>
//                 </Accordion>
//                 <Accordion className='w-full'>
//                     <AccordionSummary
//                         expandIcon={<ChevronDown />}>
//                         <Typography component="span">قیمت</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <div>
//                             <h3>از</h3>
//                             <input
//                                 type="number"
//                                 className="w-full"
//                                 onChange={e => setToFilterStore({ price: { ...filters.price, from: e.target.value } })}
//                             />
//                         </div>
//                         <div>
//                             <h3>تا</h3>
//                             <input
//                                 type="number"
//                                 className="w-full"
//                                 // onChange={(e)=> setFilters(prev =>({...prev, price:{...prev.price, to:e.target.value}}))}
//                                 onChange={e => setToFilterStore({ price: { ...filters.price, to: e.target.value } })}
//                             // onChange={(e) => dispatch({ type: 'PRICE', value: {to:e.target.value} })}
//                             />
//                         </div>

//                     </AccordionDetails>
//                 </Accordion>
//                 <Accordion className='w-full' >
//                     <AccordionSummary
//                         expandIcon={<ChevronDown />}
//                         aria-controls="panel1-content"
//                         id="panel1-header"
//                     >
//                         <Typography component="span">وضعیت</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <span>
//                             <h3>نو</h3>
//                             <input
//                                 type="radio"
//                                 // id="cheepest"
//                                 value="new"
//                                 checked={filters.condition === 'new'}
//                                 // onChange={e =>setFilters(prev => ({...prev, condition:e.target.value}))}
//                                 onChange={e => setToFilterStore({ condition: e.target.value })}
//                             // onChange={(e) => dispatch({ type: 'CONDITION', value: e.target.value })}
//                             />
//                         </span>
//                         <span>
//                             <h3>درحد نو</h3>
//                             <input
//                                 type="radio"
//                                 // id="expensivest"
//                                 value="as_new"
//                                 checked={filters.condition === 'as_new'}
//                                 // onChange={e =>setFilters(prev => ({...prev, condition:e.target.value}))}
//                                 onChange={e => setToFilterStore({ condition: e.target.value })}
//                             // onChange={(e) => dispatch({ type: 'CONDITION', value: e.target.value })}
//                             />
//                         </span>
//                         <span>
//                             <h3>کارکرده</h3>
//                             <input
//                                 type="radio"
//                                 // id="Bestselling"
//                                 value="worked"
//                                 checked={filters.condition === 'worked'}
//                                 // onChange={e =>setFilters(prev => ({...prev, condition:e.target.value}))}
//                                 onChange={e => setToFilterStore({ condition: e.target.value })}
//                             // onChange={e => dispatch({ type: 'CONDITION', value: e.target.value })}
//                             />
//                         </span>
//                     </AccordionDetails>
//                 </Accordion>
//                 {/* </div> */}
//             </Drawer>
//         </div>
//     )
// }

// export default DrawerFilter