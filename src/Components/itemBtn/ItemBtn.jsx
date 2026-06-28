import { PenIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function ItemBtn({id, title, Icon, type, src}) {
  return (
      <Link href={`${src}/${id}`} className={`${type == 'edit' ? 'bg-orange-400 hover:bg-orange-500' : 'bg-blue-600 hover:bg-blue-700'} text-white flex gap-2 p-2 rounded-md cursor-pointer transition-colors`}>
          {title}
          <Icon />
      </Link>
  )
}

export default ItemBtn