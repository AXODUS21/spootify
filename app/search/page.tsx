// app/search/page.tsx
import { use } from "react";
import getSongsByTitle from "@actions/getSongByTitle";
import Header from "@components/Header";
import SearchInput from "@components/SearchInput";
import SearchContent from "./SearchContent";

export const revalidate = 0;

// Define the type for searchParams as a Promise
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  // Use the 'use' hook to resolve the Promise
  const resolvedParams = use(searchParams);

  // Extract title safely
  const titleParam = resolvedParams.title;
  const title =
    typeof titleParam === "string"
      ? titleParam
      : Array.isArray(titleParam)
      ? titleParam[0]
      : "";

  const songs = use(getSongsByTitle(title));

  return (
    <div
      className="
            bg-neutral-900
            rounded-lg
            h-full
            w-full
            overflow-hidden
            overflow-y-auto
        "
    >
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
}
