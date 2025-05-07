import React from 'react'
import LinkButton from './buttons/LinkButton'
import { useRouter } from 'next/navigation'

const Appbar = () => {
    const router = useRouter();
  return (
    <div>
        <div>Zapier</div>
        <div>
            <LinkButton onclick={()=>{}}>Contact Sales</LinkButton>
            <LinkButton onclick={()=>{
                router.push('/login')
            }}>Log In</LinkButton>
        </div>
    </div>
  )
}

export default Appbar