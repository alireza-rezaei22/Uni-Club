'use client'
import DeleteBtn from '@/Components/deleteBtn/DeleteBtn'
import ItemBtn from '@/Components/itemBtn/ItemBtn'
import Loading from '@/Components/loading/Loading'
import { Edit2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function page() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getUsers = async () => {
            const res = await fetch('/api/users')
            const data = await res.json()
            if (data.status == 200) {
                setUsers(data.users)
            } else {
            }
            setLoading(false)
        }
        getUsers()
    }, [])
    const deleteUser = (event, itemId) => {
            event.preventDefault()        
            const deleteUserFunc = async () => {
                const res = await fetch(`/api/users/${itemId}`, {
                    method: 'DELETE',
                })
                const data = await res.json()
                switch (data.status) {
                    case (200): {
                        setUsers(data.newList)
                        break
                    }
                    case (401): {
                        toast.error(data.error, { position: 'bottom-center' })
                        break
                    }
                    case (403): {
                        toast.error(data.error, { position: 'bottom-center' })
                        break
                    }
                    case (500): {
                        toast.error(data.error, { position: 'bottom-center' })
                        break
                    }
                    default: {
                        console.log(data);
                    }
                }
            }
            deleteUserFunc()
        }
    return (
        <div className="w-full p-4">
            <h2 className="text-indigo-600 text-2xl font-bold mb-6">لیست کاربران</h2>
            {loading ?
                <Loading /> :
                <div className="bg-white shadow-md rounded-xl overflow-hidden border border-zinc-200">
                    <table className="w-full text-sm text-right">
                        <thead className="bg-zinc-100 text-zinc-600 uppercase text-sm font-semibold">
                            <tr>
                                <th className="px-6 py-4">ردیف</th>
                                <th className="px-6 py-4">نام</th>
                                <th className="px-6 py-4">شماره</th>
                                <th className="px-6 py-4">نقش</th>
                                <th className="px-6 py-4 text-center">اقدام‌ها</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-zinc-200">
                            {users.map((user, index) => (
                                <tr key={user._id} className="hover:bg-indigo-50 transition-colors">
                                    <td className="px-6 py-4 text-zinc-500 font-medium">{index + 1}</td>
                                    <td className="px-6 py-4 font-bold text-zinc-800">{user.name}</td>
                                    <td className="px-6 py-4 text-zinc-600">{user.phone}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${user.role === 'admin'
                                            ? 'bg-indigo-100 text-indigo-700'
                                            : 'bg-zinc-100 text-zinc-600'
                                            }`}>
                                            {user.role === 'admin' ? 'مدیر' : 'کاربر'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <ItemBtn id={user._id} title={'ویرایش'} type={'edit'} src={'/panel/editUser'} Icon={Edit2} />
                                            <DeleteBtn deleteHandler={(e) => deleteUser(e, user._id)} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default page
