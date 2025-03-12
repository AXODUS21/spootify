import { createServerComponentClient } from "@node_modules/@supabase/auth-helpers-nextjs/dist"
import { cookies } from "@node_modules/next/headers"
import { Song } from "@types"
import getSongs from "./getSongs";

//                        this means that it returns a promise of array of songs
const getSongsByTitle = async (title: string): Promise<Song[]> => {
    const supabase = createServerComponentClient({
      cookies: () => cookies(),
    });


    if(!title){
        const allSongs = await getSongs();
        return allSongs;
    }

    const {data,error} = await supabase
    .from('songs')
    .select('*')
    .ilike('title', `%${title}%`) //this is basically what gives you the search algorithim 
    .order('created_at', {ascending: false});

    if(error){
        console.log(error)
    }

    return (data as any) || []
}

export default getSongsByTitle;