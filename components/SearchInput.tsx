"use client"

import qs from "query-string";
import { useEffect, useState } from "react";
import { useRouter } from "@node_modules/next/navigation"

import useDebouce from "@hooks/useDebounce";
import Input from "./Input";

const SearchInput = () => {
    const router = useRouter();
    const [value,setValue] = useState<string>("");
    const debouncedValue = useDebouce<string>(value, 500);

    useEffect(() => {
        const query = {
            title: debouncedValue
        };

        const url = qs.stringifyUrl({
            url: '/search',
            query: query
        })

        router.push(url);
    },[debouncedValue, router])

  return (
    <div>
        <Input 
            placeholder="What is your menu for today?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
        
    </div>
  )
}

export default SearchInput