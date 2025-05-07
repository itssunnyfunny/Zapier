import React from 'react'
import LinkButton from './buttons/LinkButton'
import { useRouter } from 'next/navigation'
import PrimaryButton from './buttons/PrimaryButton';

const Appbar = () => {
    const router = useRouter();
  return (
    <div>
        <div className='flex flex-col justify-center'>Zapier</div>
        <div className='flex items-center justify-center gap-4'>
            <LinkButton onclick={()=>{}}>Contact Sales</LinkButton>
            <LinkButton onclick={()=>{
                router.push('/login')
            }}>Log In</LinkButton>
            <PrimaryButton  onClick={()=>{
                router.push('/signup')
            }
            }>Sign Up</PrimaryButton>
        </div>
    </div>
  )
}

export default Appbar