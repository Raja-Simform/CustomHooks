import { useCallback, useEffect, useRef, useState } from "react";

interface useFetchProps<T> {
  fn: () => Promise<T>;
  enabled:boolean;
}
export default function useFetch<T>({ fn,enabled}: useFetchProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const ref=useRef(fn);
  // useEffect(()=>{
  //   ref.current=fn;
  // },[fn]);
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const Data = await fn();
      setData(Data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("Unknown error"));
      }
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled, fetchData]);
  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  return { data, refetch, isLoading, error };
}
