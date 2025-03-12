"use client"
import { useUser } from '@hooks/useUser';
import { useRouter } from '@node_modules/next/navigation';
import { Song } from '@types'
import React, { useEffect } from 'react'

interface Props {
    songs: Song[];
}

const LikedContent = ({songs}: Props) => {
    const router = useRouter();

    const { isLoading, user } = useUser();

    useEffect(() => {
        if(!isLoading && !user) {
            router.replace('/')
        }

    },[isLoading, user, router])

    if(songs.length === 0) {
        return <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>No Liked Songs.</div>
    }

  return (
    <div>
        
    </div>
  )
}

export default LikedContent