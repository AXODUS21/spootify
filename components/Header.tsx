"use client"
import { useRouter } from '@node_modules/next/navigation';
import { BiSearch } from '@node_modules/react-icons/bi';
import { HiHome } from '@node_modules/react-icons/hi';
import { RxCaretLeft, RxCaretRight } from '@node_modules/react-icons/rx';
import { twMerge } from '@node_modules/tailwind-merge';
import { useSupabaseClient } from '@node_modules/@supabase/auth-helpers-react/dist';
import { useUser } from '@hooks/useUser';
import { FaUserAlt } from '@node_modules/react-icons/fa';
import { toast } from 'react-hot-toast';
import React from 'react'
import Button from './Button';
import useAuthModal from '@hooks/useAuthModal';

type Props = {
    children: React.ReactNode;
    className?: string;
}

export default function Header({ children, className}: Props) {
    const router = useRouter();
    const {onOpen} = useAuthModal();
    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    const handleLogOut = async () => {
        const {error} = await supabaseClient.auth.signOut();
        
        //TODO : Reset any playing songs
        router.refresh();
        
        if(error) {
            toast.error(error.message);
        } else {
            toast.success('Logged out!');
        }
    }
    
  return (
    <div className={twMerge("h-fit bg-gradient-to-b from-emerald-800 p-6", className)}>
        <div className="w-full mb-4 flex items-center justify-between">
            <div className="hidden md:flex gap-x-2 items-center">
                <button onClick={() => router.back()} className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'>
                    <RxCaretLeft size={35} className='text-white'/>
                </button>
                <button onClick={() => router.forward()} className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'>
                    <RxCaretRight size={35} className='text-white'/>
                </button>
            </div>

            {/*MOBILE NAVIGATION */}
            <div className="flex md:hidden gap-x-2 items-center">
                <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
                    <HiHome className='text-black' size={20}/>
                </button>
                <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
                    <BiSearch className='text-black' size={20}/>
                </button>
            </div>

            <div className='flex justify-between items-center gap-x-4'>
                {user ? (
                    <div className="flex gap-x-4 items-center">
                        <Button 
                            onClick={handleLogOut}
                            className='bg-white px-6 py-2'
                        >
                            Logout
                        </Button>
                        <Button
                            onClick={() => router.push('/account')}
                            className='bg-white px-3 py-3 '
                        >
                            <FaUserAlt />
                        </Button>
                    </div>
                ): (
                <>
                  <div className="">
                    <Button 
                        onClick={onOpen}
                        className='
                            bg-transparent
                            text-neutral-300
                            font-medium
                        '
                    >
                        Sign Up
                    </Button>
                  </div>

                  <div className="">
                    <Button
                        onClick={onOpen}
                        className='
                            bg-white
                            px-6
                            py-2
                        '
                    >
                        Log In
                    </Button>
                  </div>
                </>
                )}
            </div>
        </div>
        {children}
    </div>
  )
}