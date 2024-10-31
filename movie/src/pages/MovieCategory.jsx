import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Card from "../components/card";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";

export default function MovieCategory() {
  const { category } = useParams();

  const { isLoading, data, error } = useCustomFetch(
    ((category) => {
      switch (category) {
        case "now-playing":
          return "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1";

        case "popular":
          return "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1";

        case "top-rated":
          return "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1";

        case "up-coming":
          return "https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1";
      }
    })(category)
  );

  return (
    <Wrapper>
      {isLoading && <span>Loading...</span>}
      {data?.results?.map((movie, i) => (
        <Card key={movie?.id} movie={movie} />
      ))}
    </Wrapper>
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
