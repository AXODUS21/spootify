import { useSupabaseClient } from "@node_modules/@supabase/auth-helpers-react/dist";
import { Song } from "@types";

const useLoadImage = (song: Song) => {
    const supabaseClient = useSupabaseClient();
   
    if(!song){
        return null;
    }

    const {data: imageData } = supabaseClient.storage.from('images').getPublicUrl(song.image_path);

    return imageData.publicUrl;
}

export default useLoadImage;