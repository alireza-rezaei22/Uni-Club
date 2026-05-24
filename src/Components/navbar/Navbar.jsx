'use client'
import Search from "@/Components/search/Search";
import Cities from "@/Components/cities/Cities";
import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [city, setCity] = useState('')
  const userData = useAuthStore(state => state.user)
  const pathname = usePathname();
  const routes = [
    { name: 'خانه', path: '/' },
    { name: 'اساتید', path: '/ostads' },
    { name: 'مبادلات', path: '/products' },
    userData ?
      { name: 'پنل', path: '/panel' } :
      { name: 'ورود/ثبت نام', path: '/login-register' }
  ]
  return (
    <nav className="bg-zinc-950 z-50 w-full p-3 flex justify-between items-center shadow-sm rounded-b-xl">
      <ul className="hidden md:flex gap-5 mx-2">
        {routes.map((route, index) => {
          return <Link
            key={index}
            href={route.path}
            className={`${pathname === route.path ? 'bg-indigo-500 text-zinc-100 hover:bg-indigo-600' : ' text-indigo-400 border-2 border-indigo-400 hover:bg-indigo-500 hover:text-zinc-100'}  font-medium p-1 px-4 rounded-xl cursor-pointer transition-colors`}
          >
            {route.name}
          </Link>
        })}
      </ul>
      <div className="w-full flex justify-between gap-1 md:w-1/3 md:justify-end">
        <Search />
        {/* <div>
          <Cities setCity={setCity} isInNav={true} />
        </div> */}
      </div>
    </nav>
  );
}