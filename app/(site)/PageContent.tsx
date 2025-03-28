"use client"

import SongItem from "@components/SongItem";
import useOnPlay from "@hooks/useOnPlay";
import { Song } from "@types"

interface Props {
    songs: Song[];
}

const PageContent = ({songs}: Props) => {
    const onPlay = useOnPlay(songs)
    
    if (songs.length === 0) {
        return <div className="mt-4 text-neutral-500">No Songs Available</div>
    }

  return (
    <div
        className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-4
            2xl:grid-cols-6
            gap-4
            mt-4
        "
    >
        {songs.map((item) => (
            <SongItem
                data={item}
                onClick={(id: string) => onPlay(id)}
                key={item.id}
            />
        ))}
    </div>
  )
}

export default PageContent