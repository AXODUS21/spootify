import React, { useState } from 'react'
import Modal from './Modal'
import useUploadModal from '@hooks/useUploadModal'
import { FieldValues, SubmitHandler, useForm } from '@node_modules/react-hook-form'
import Input from './Input'
import uniqid from "uniqid"
import Button from './Button'
import toast from '@node_modules/react-hot-toast/dist'
import { useUser } from '@hooks/useUser'
import { useSupabaseClient } from '@node_modules/@supabase/auth-helpers-react'
import { useRouter } from '@node_modules/next/navigation'


const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const {user} = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {register, handleSubmit, reset} = useForm<FieldValues>({
        defaultValues: {
            author: "",
            title: "",
            song: null,
            image: null,
        }
    });

    const onChange = (open:boolean) => {
        if(!open){
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try{
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const songFile =  values.song?.[0];
            
            if(!imageFile || !songFile || !user){
                toast.error('Missing fields');
                return;
            } 

            const uniqueId = uniqid();

            //Uploading the song
            const { data: songData, error: songError } =
              await supabaseClient.storage
                .from("songs")
                .upload(`song-${values.title}-${uniqueId}`, songFile, {
                  cacheControl: "3600", //Sets caching behavior (in seconds).
                  upsert: false, // Prevents overwriting existing files
                });

            if(songError){
                setIsLoading(false);
                return toast.error('Failed song upload')
            }

            //Uploading the image
            const { data: imageData, error: imageError } =
              await supabaseClient.storage
                .from("images")
                .upload(`image-${values.title}-${uniqueId}`, imageFile, {
                  cacheControl: "3600", //Sets caching behavior (in seconds).
                  upsert: false, // Prevents overwriting existing files
                });

            if (imageError){
                setIsLoading(false);
                return toast.error('Failed image upload');
            }

            //uploading the song in the main database (not just the storage)
            const {error: supabaseError} = await supabaseClient
            .from("songs")
            .insert({
                user_id: user.id,
                title: values.title,
                author: values.author,
                image_path: imageData.path,
                song_path: songData.path,
            })

            if(supabaseError){
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success('Song uploaded successfully');
            reset(); // resets the form
            uploadModal.onClose();

        } catch (err) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <Modal
      title="Add A Song"
      description="Upload an MP3 File"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 "
      >
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })} //spreads a bunch of props like (onChange, onBlur, onFocus, etc.)
          placeholder="Song Title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song Author"
        />

        <div className="">
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type='file'
            disabled={isLoading}
            accept='.mp3'
            {...register("song", { required: true })} 
          />
          <div className="pb-1">Select an image</div>
          <Input
            id="image"
            type='file'
            disabled={isLoading}
            accept='image/*'
            {...register("image", { required: true })} 
          />
        </div>
        <Button disabled={isLoading} type='submit' className='cursor-pointer'>
            Create
        </Button>
      </form>
    </Modal>
  );
}

export default UploadModal