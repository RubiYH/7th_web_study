import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Card from "../components/card";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { axiosMovieInstance } from "../lib/api";
import { useInView } from "react-intersection-observer";

export default function MovieCategory() {
  const { category } = useParams();

  const [page, setPage] = useState(1);

  const { isLoading, data, error, fetchNextPage } = useQuery({
    queryFn: () =>
      axiosMovieInstance
        .get(
          ((category, page) => {
            switch (category) {
              case "now-playing":
                return "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=" + page;

              case "popular":
                return "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=" + page;

              case "top-rated":
                return "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=" + page;

              case "up-coming":
                return "https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=" + page;
            }
          })(category, page)
        )
        .then((res) => res.data),
    queryKey: ["category", category, page],
    enabled: !!category,
    placeholderData: keepPreviousData,
  });

  return (
    <div style={{ flex: 1 }}>
      <Wrapper>
        {isLoading && <span>Loading...</span>}
        {data?.results.map((movie) => (
          <Card key={movie?.id} movie={movie} />
        ))}
      </Wrapper>
      <div style={{ padding: "8px", display: "flex", justifyContent: "space-between" }}>
        <Button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
          이전
        </Button>
        <span>{page}</span>
        <Button onClick={() => setPage((prev) => prev + 1)} disabled={page === data?.total_pages}>
          다음
        </Button>
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

const Button = styled.button`
  padding: 8px 16px 8px 16px;
  height: 2.5rem;
  border-radius: 32px;
  color: white;
  background: #e31b64;
  cursor: pointer;
  transition: all 150ms ease-in-out;

  &:hover {
    background: #b80f4c;
  }

  &:disabled {
    background: gray;
  }
`;
