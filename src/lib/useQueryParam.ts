import { useState } from 'react'

export default function useQueryParam(key: string, defaultVal: string): [string, (newVal: string) => unknown] {
    const queryParams = new URLSearchParams(window.location.search)
    const queryParam = queryParams.get(key)
    const initVal = queryParam || defaultVal

    const [val, dispatch] = useState<string>(initVal)

    function setVal(newVal: string) {
        dispatch(newVal)
        if(window && window.location){
            const search = new URLSearchParams(window.location.search)
            search.set(key, newVal)
            window.location.search = search.toString()
        }
    }

    return [val, setVal]
}
