'use client'
import React from 'react'
import { Home, CirclePlus, Bookmark, UserRound, LogInIcon } from 'lucide-react'
import RouteBtn from '../routeBtn/RouteBtn'
import { useAuthStore } from '@/store/useAuthStore'

function BottomNav() {
  const userData = useAuthStore(state => state.user)
  const routes = [
    { Icon: Home, path: '/' },
    { Icon: CirclePlus, path: '/panel/newProduct' },
    { Icon: Bookmark, path: '/panel/markedProducts' },
    userData ?
      { Icon: UserRound, path: '/panel' } :
      { Icon: LogInIcon, path: '/login-register' },
  ]
  
  return (
    <nav className='fixed bottom-0 w-full flex justify-between divide-x divide-x-reverse md:hidden'>
      {routes.map((route, index) => {
        return <RouteBtn key={index} {...route} />
      })}
    </nav>
  )
}

export default BottomNav

