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
            className={`${pathname === route.path ? 'bg-green-400 text-zinc-900 hover:bg-green-600' : ' text-green-400 border-2 border-green-400 hover:bg-green-200 hover:text-zinc-900'}  font-medium p-1 px-4 rounded-xl cursor-pointer transition-all`}
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