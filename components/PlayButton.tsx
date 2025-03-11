import { FaPlay } from '@node_modules/react-icons/fa'
import React from 'react'

type Props = {}

const PlayButton = (props: Props) => {
  return (
    <button className='
        transition
        opacity-0
        rounded-full
        flex
        items-center
        bg-green-500
        p-4
        drop-shadow-md
        translate
        translate-y-1/4
        group-hover:opacity-100
        group-hover:translate-y-0
        hover:scale-110
        cursor-pointer   
    '>
        <FaPlay className='text-black'/>
    </button>
  )
}

export default PlayButton