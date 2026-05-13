import { SearchX } from 'lucide-react'
import React from 'react'

function PopUp({ Icon, msg}) {
  return (
      <div className='w-full h-full flex justify-center items-center'>
          <div className='h-max  m-10 bg-blue-200 flex flex-col text-center justify-center items-center p-12 rounded-lg text-zinc-700 '>
              <Icon className='w-16 h-16' />
              <h3 className='font-medium text-lg'>
                  {msg}
              </h3>
          </div>
      </div>
  )
}

export default PopUp