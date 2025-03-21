import { createServerComponentClient } from "@node_modules/@supabase/auth-helpers-nextjs/dist"
import { cookies } from "@node_modules/next/headers"
import { Song } from "@types"

//                        this means that it returns a promise of array of songs
const getLikedSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
      cookies: () => cookies(),
    });

    const {data: {session}} = await supabase.auth.getSession();

    const {data,error} = await supabase
    .from('liked_songs')
    .select('*, songs(*)')
    .eq('user_id', session?.user?.id)
    .order('created_at', {ascending: false});

    if(error){
        console.log(error)
        return [];
    }

    if(!data){
        return [];
    }

    return data.map((item) => ({
      ...item.songs
    }))
}

export default getLikedSongs;