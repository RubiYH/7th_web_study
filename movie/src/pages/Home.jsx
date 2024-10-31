import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Card from "../components/card";
import useCustomFetch from "../hooks/useCustomFetch";

export default function Home() {
  const { isLoading, data, error } = useCustomFetch("/movie/popular?language=ko-KR&page=1");

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
