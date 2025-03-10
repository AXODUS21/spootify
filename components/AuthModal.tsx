"use client"

import { useSessionContext, useSupabaseClient } from "@node_modules/@supabase/auth-helpers-react/dist"
import { useRouter } from "@node_modules/next/navigation"
import Modal from "./Modal"
import { Auth } from "@node_modules/@supabase/auth-ui-react"
import { ThemeSupa } from "@node_modules/@supabase/auth-ui-shared/dist"
import useAuthModal from "@hooks/useAuthModal"
import { useEffect } from "react"

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const {session} = useSessionContext();
    const {onClose, isOpen} = useAuthModal();


    const OnChange = (open: boolean) => {
        if(!open) {
            onClose();
        }
    }

    //if the session is changed (user is authenticated) the page will refresh and it will close the modal
    useEffect(() => {
        if(session){
            router.refresh()
            onClose();
        }
    },[session, router, onClose])

  return (
    <Modal
        title="Welcome Back"
        description="Login to your account"
        isOpen={isOpen}
        onChange={OnChange}
    >
        <Auth 
            theme="dark"
            magicLink
            providers={["github"]}
            supabaseClient={supabaseClient}  
            appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                        colors: {
                            brand: '#404040',
                            brandAccent: '#22C55E'
                        }
                    }
                }
            }}
        />
    </Modal>
  )
}

export default AuthModal