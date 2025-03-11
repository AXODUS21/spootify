import { createMiddlewareClient } from "@node_modules/@supabase/auth-helpers-nextjs/dist";
import { NextRequest, NextResponse } from "@node_modules/next/server";


//!This middleware acts as a bridge between Supabase authentication and Next.js routing, ensuring that users stay logged in and their session remains valid across the app.
export async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    const supabase = createMiddlewareClient({
        req,
        res
    })

    await supabase.auth.getSession();
    return res;
}