import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Card from "../components/card";
import { useParams } from "react-router-dom";

export default function MovieCategory() {
  const { category } = useParams();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      let query;

      switch (category) {
        case "now-playing":
          query = `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1`;
          break;

        case "popular":
          query = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`;
          break;

        case "top-rated":
          query = "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1";
          break;

        case "up-coming":
          query = "https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1";
          break;
      }

      const movies = await axios.get(query, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API_TOKEN}`,
        },
      });

      setMovies(movies?.data?.results);
    };

    if (category) getMovies();
  }, [category]);

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
