import { createServerComponentClient } from "@node_modules/@supabase/auth-helpers-nextjs/dist"
import { cookies } from "@node_modules/next/headers"
import { Song } from "@types"

//                        this means that it returns a promise of array of songs
const getSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
      cookies: () => cookies(),
    });

    const {data,error} = await supabase
    .from('songs')
    .select('*')
    .order('created_at', {ascending: false});

    if(error){
        console.log(error)
    }

    return (data as any) || []
}

export default getSongs;