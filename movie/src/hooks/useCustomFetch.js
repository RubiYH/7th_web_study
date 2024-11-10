import { useEffect, useState } from "react";
import { axiosMovieInstance } from "../lib/api";

export default function useCustomFetch(url) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    (async (url) => {
      setIsLoading(true);

      try {
        const response = await axiosMovieInstance.get(url);

        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })(url);
  }, [url]);

  return { isLoading, data, error };
}
