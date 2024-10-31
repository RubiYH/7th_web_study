import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Card from "../components/card";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const movies = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API_TOKEN}`,
          },
        }
      );
      setMovies(movies?.data?.results);
    };

    getMovies();
  }, []);

  return (
    <Wrapper>
      {movies?.map((movie, i) => (
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
