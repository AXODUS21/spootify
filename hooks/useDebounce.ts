import { useEffect , useState} from "react";

//this willl make it so that the users search will only happen if the user stops typing for 500ms or the after the custom delay
const useDebouce = <T, >(value: T, delay?: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay || 500)

        return () => {
            clearTimeout(timer);
        }
    },[value, delay])

    return debouncedValue;
}

export default useDebouce;

