import React, { useEffect, useState } from 'react'
import { useUser } from '@hooks/useUser';
import { useSessionContext } from '@node_modules/@supabase/auth-helpers-react/dist';
import { useRouter } from '@node_modules/next/navigation';
import useAuthModal from '@hooks/useAuthModal';
import { AiFillHeart, AiOutlineHeart } from '@node_modules/react-icons/ai';
import toast from "react-hot-toast";

interface Props {
    songId: string;
}

const LikeButton = ({songId}: Props) => {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();

    const authModal = useAuthModal();
    const { user } = useUser();

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if(!user?.id){
            return;
        }

        const fetchData = async () => {
            //finds all the liked songs that have the propery user_id equal to user.id and the song_id equal to songId
            //the single means that it expecting to return a single row from the table
            const {data, error} = await supabaseClient.from('liked_songs').select('*').eq('user_id', user.id).eq('song_id', songId).single();

            if(!error && data){
                setIsLiked(true);
            }
        }

        fetchData()
    },[songId,supabaseClient, user?.id]);

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    const handleLike = async () => {
        if(!user){
            return authModal.onOpen();
        }

        if(isLiked){
            const {error} = await supabaseClient.from('liked_songs').delete().eq('user_id',user.id).eq('song_id', songId)

            if(error){
                toast.error(error.message);
            } else {
                setIsLiked(false);
            }
        } else {
            //adds a liked_song to the table with the user_id and the song_id
            const {error} = await supabaseClient.from('liked_songs').insert({
                user_id: user.id,
                song_id: songId
            })

            if(error){
                toast.error(error.message);
            } else {
                setIsLiked(true);
                toast.success('Liked!');
            }
        }

        router.refresh();
    }

  return (
    <button
        onClick={handleLike}
        className='cursor-pointer hover:opacity-75 transition'
    >
        <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  )
}

export default LikeButton