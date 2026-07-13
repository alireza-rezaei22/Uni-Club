"use client"
import { Search as SearchBox } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Search() {
    const router = useRouter()
    const [searchedValue, setSearchedValue] = useState('')
    const search = (e) => {
        if(searchedValue){
            console.log('search');
            router.push(`/searchResult?query=${searchedValue}`)
        }
    }
    return (
        <>
            <div className="bg-[#0056AA] text-zinc-900 hover:bg-iblue-400 transition-all w-3/5 max-w-80 flex justify-between rounded-full p-2 cursor-pointer">
                <input
                    value={searchedValue}
                    onChange={(e) => setSearchedValue(e.target.value)}
                    placeholder="جستوجو"
                    className="w-4/5 outline-0 cursor-pointer"
                />
                <SearchBox onClick={(e)=>search()} />
            </div>
        </>
    )
}
