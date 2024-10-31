import { useParams } from "react-router-dom";
import styled from "styled-components";
import useCustomFetch from "../hooks/useCustomFetch";

export default function MovieDetail() {
  const { movieId } = useParams();

  const { isLoading, data, error } = useCustomFetch(
    `/movie/${movieId}?language=ko-KR&append_to_response=credits`
  );

  return (
    <Wrapper>
      {isLoading && <span>Loading...</span>}
      {!!data && (
        <>
          <Header>
            <div
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: "8px",
              }}
            >
              <h1>{data?.original_title}</h1>
              <h2>{data?.release_date}</h2>
              <h3
                style={{
                  padding: "2px 4px 2px 4px",
                  background: "green",
                  color: "white",
                  borderRadius: "8px",
                }}
              >
                {data?.vote_average}
              </h3>
              <h4>{data?.runtime}분</h4>
            </div>
            <img src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`} />
          </Header>
          <Content>
            <p style={{ padding: "63px 16px 64px 16px", fontStyle: "italic", color: "gray" }}>
              {data?.overview}
            </p>
            <Cast>
              <h2>감독/출연</h2>
              <div style={{ marginTop: "8px", display: "flex", flexWrap: "wrap" }}>
                {data?.credits?.cast?.map((person, i) => (
                  <Person key={person?.credit_id}>
                    <img src={`https://image.tmdb.org/t/p/original${person?.profile_path}`} />
                    <strong>{person?.original_name}</strong>
                    <p style={{ color: "gray", fontSize: "0.9rem", padding: "0.25rem" }}>
                      {person?.character}
                    </p>
                  </Person>
                ))}
              </div>
            </Cast>
          </Content>
        </>
      )}
      {error && <span>Error!</span>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: block;
  padding: 8px;
`;

const Header = styled.div`
  position: relative;
  border-radius: 16px;
  height: 20rem;
  overflow: hidden;

  & img {
    width: 100%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Cast = styled.div`
  display: block;
`;

const Person = styled.div`
  margin: 4px;
  width: 8rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;
  border-radius: 16px;

  & img {
    cursor: pointer;
    transition: all 200ms ease-in-out;
    &:hover {
      filter: brightness(50%);
    }
  }
`;
