"use client"
import useGetSongById from '@hooks/useGetSongsById';
import useLoadSongUrl from '@hooks/useLoadSongUrl';
import usePlayer from '@hooks/usePlayer'
import React from 'react'
import PlayerContent from './PlayerContent';

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  //!the ! is basically telling typescript that "I am 100% sure that song is not null or undefined, so don’t give me any errors about it."
  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  } 

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
        <PlayerContent
          key={songUrl}
          song={song}
          songUrl={songUrl}
        />
    </div>
  );
}

export default Player