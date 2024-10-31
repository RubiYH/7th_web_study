import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/api";

export default function useCustomFetch(url) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    (async (url) => {
      try {
        const response = await axiosInstance.get(url);

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
