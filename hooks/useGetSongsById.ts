import { useSessionContext } from "@node_modules/@supabase/auth-helpers-react/dist";    
import { Song } from "@types"
import {toast} from "react-hot-toast"
import { useEffect, useMemo, useState } from "react"

//this is how do fetching on db if you want to do it osing CSR
const useGetSongById = (id? : string) => {
    const [isLoading, setIsLoading] = useState(false)
    const [song, setSong] = useState<Song | undefined>(undefined);

    const {supabaseClient} = useSessionContext();

    useEffect(() => {
        if(!id){
            return;
        }

        setIsLoading(true);

        const fetchSong = async () => {
            const {data,error} = await supabaseClient.from('songs').select('*').eq('id', id).single()

            if(error){
               setIsLoading(false);
               return toast(error.message)
            }

            setSong(data as Song);
            setIsLoading(false);
            
        }

        fetchSong();
    },[id, supabaseClient])

    //!only returns isLoading and song if the value of the isLoading and song changes. otherwise it will return the previous value that was returned
    return useMemo(() => ({
        isLoading,
        song
    }),[isLoading, song])
}

export default useGetSongById;