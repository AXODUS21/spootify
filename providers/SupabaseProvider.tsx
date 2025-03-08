"use client"

//!this part of the code will wrap around you main code and it will give every component access to supabase client

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

import { Database } from "@types_db"

interface SupabaseProviderProps{
    children: React.ReactNode;

}

//?FC means function component (people do this in ts so they dont have to make a function)

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({
    children
}) => {
    const [supabaseClient] = useState(() => 
        createClientComponentClient<Database>() //!this will create a supabase client for you
    )

    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    )
}

export default SupabaseProvider;