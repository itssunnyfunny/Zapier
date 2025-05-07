import React from 'react'

const PrimaryButton = ({children, onClick, size = 'small'}:{
    children: React.ReactNode, 
    onClick: () => void, 
    size?: 'small' | 'large'
}) => {
    return <div onClick={onClick} className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-8 py-2" : "px-10 py-4"} cursor-pointer hover:shadow-md bg-orange-700 text-white rounded-full text-center flex justify-center flex-col`}>
    {children}
</div>
}

export default PrimaryButton