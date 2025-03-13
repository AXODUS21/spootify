import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@components/Sidebar";
import SupabaseProvider from "@providers/SupabaseProvider";
import UserProvider from "@providers/UserProvider";
import ModalProvider from "@providers/ModalProvider";
import ToasterProvider from "@providers/ToasterProvider";
import getSongsByUserId from "@actions/getSongsByUserId";
import Player from "@components/Player";

const figtree = Figtree({subsets: ['latin']});

export const metadata: Metadata = {
  title: "Spootify",
  description: "An app made by a developer that thought he could study every technology used in this app just by using the docs. While the developer is writing this app definition he's thinking to himself that he's a fucking idiot and he probably shouldn't be making a project when he doesnt know half of the technologies he's using. This project will ruin the developers brain for the next 3 years",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body
        className={`${figtree.className} antialiased`}
      >
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
