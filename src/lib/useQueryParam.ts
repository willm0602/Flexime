import { useEffect, useState } from 'react';

export default function useQueryParam(key: string, defaultVal: string): [string, (newVal: string) => void] {
  const [val, setVal] = useState<string>(defaultVal); // Start with default value

  // Hydrate from URL when on client
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const queryParam = queryParams.get(key);
    if (queryParam) {
      setVal(queryParam);
    }
  }, [key]);

  function updateQueryParam(newVal: string) {
    setVal(newVal);
    const url = new URL(window.location.href);
    url.searchParams.set(key, newVal);
    window.history.replaceState({}, '', url.toString()); // Update URL without reload
  }

  return [val, updateQueryParam];
}
