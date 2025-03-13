import getSongsByTitle from "@actions/getSongByTitle";
import Header from "@components/Header";
import SearchInput from "@components/SearchInput";
import SearchContent from "./SearchContent";

export const revalidate = 0;

// Use Next.js 15's typing system for page components
export default async function Search({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Convert to string if it's an array or undefined
  const titleParam = searchParams?.title;
  const title =
    typeof titleParam === "string"
      ? titleParam
      : Array.isArray(titleParam)
      ? titleParam[0]
      : "";

  const songs = await getSongsByTitle(title);

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
