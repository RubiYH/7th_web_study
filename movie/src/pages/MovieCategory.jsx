import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Card from "../components/card";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { axiosMovieInstance } from "../lib/api";
import { useInView } from "react-intersection-observer";

export default function MovieCategory() {
  const { category } = useParams();

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const { isLoading, data, error, hasNextPage, fetchNextPage, isFetched } = useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      axiosMovieInstance
        .get(
          ((category, pageParam) => {
            switch (category) {
              case "now-playing":
                return (
                  "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=" + pageParam
                );

              case "popular":
                return (
                  "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=" + pageParam
                );

              case "top-rated":
                return (
                  "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=" + pageParam
                );

              case "up-coming":
                return (
                  "https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=" + pageParam
                );
            }
          })(category, pageParam)
        )
        .then((res) => res.data),
    queryKey: ["category", category],
    enabled: !!category,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastMovie = lastPage.results[lastPage.results.length - 1];

      return lastMovie ? allPages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (isFetched && inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetched]);

  return (
    <div style={{ flex: 1 }}>
      <Wrapper>
        {isLoading && <span>Loading...</span>}
        {data?.pages?.map((page) =>
          page.results.map((movie) => <Card key={movie?.id} movie={movie} />)
        )}
      </Wrapper>
      <div ref={ref}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"
          >
            <animateTransform
              attributeName="transform"
              dur="0.75s"
              repeatCount="indefinite"
              type="rotate"
              values="0 12 12;360 12 12"
            />
          </path>
        </svg>
      </div>
    </div>
  );
}

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;
