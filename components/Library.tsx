import useAuthModal from '@hooks/useAuthModal'
import useUploadModal from '@hooks/useUploadModal'
import { useUser } from '@hooks/useUser'
import { AiOutlinePlus } from '@node_modules/react-icons/ai'
import { TbPlaylist } from '@node_modules/react-icons/tb'
import { Song } from '@types'
import React from 'react'
import MediaItem from './MediaItem'
import useOnPlay from '@hooks/useOnPlay'

interface Props {
  songs: Song[]
}

export default function Library({songs}: Props) {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const {user} = useUser();
  const onPlay = useOnPlay(songs);

  //handles uploads of songs
  const onClick = () => {
    if(!user){
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  }

  return (
    <div className='flex flex-col'>
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2 ">
          <TbPlaylist className='text-neutral-400' size={26}/>
          <p className='text-neutral-400 font-medium text-base'>Your Library</p>
        </div>
        <AiOutlinePlus onClick={onClick}
          size={20}
          className='
             text-neutral-400
             cursor-pointer
             hover:text-white
             transition
          '
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((item) => (
          <MediaItem
            onClick={(id:string) => onPlay(id)}
            data={item}
            key={item.id}
          />
        ))}
      </div>
    </div>
  )
}