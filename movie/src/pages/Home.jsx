import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Card from "../components/card";
import useCustomFetch from "../hooks/useCustomFetch";
import { useQuery } from "@tanstack/react-query";
import { axiosMovieInstance } from "../lib/api";

export default function Home() {
  const { isLoading, data, error } = useQuery({
    queryFn: () =>
      axiosMovieInstance.get("/movie/popular?language=ko-KR&page=1").then((res) => res.data),
    queryKey: ["home"],
  });

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
