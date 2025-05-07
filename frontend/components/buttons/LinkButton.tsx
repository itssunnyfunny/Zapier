import React from 'react'

const LinkButton = ({children, onclick }:{children: React.ReactNode, onclick: ()=>void}) => {
  return (
    <div className='flex items-center justify-center cursor-pointer hover:bg-slate-100 font-light text-sm rounded' onClick={onclick}>
      {children} 
    </div>
  )
}

export default LinkButton