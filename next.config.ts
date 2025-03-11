import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["mtgzcifzfziddvbnwgxm.supabase.co"], //!self imported this should comefrom your supabase project id and just add ".supabase.co" to it
  },
};

export default nextConfig;
