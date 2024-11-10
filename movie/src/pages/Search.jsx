import styled, { keyframes } from "styled-components";
import { useDebounce } from "../hooks/useDebounce";
import { useEffect, useState } from "react";
import useCustomFetch from "../hooks/useCustomFetch";
import Card from "../components/card";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState(null);

  const debouncedSearch = useDebounce(searchQuery, 1000);

  const { data, isLoading, error } = useCustomFetch(
    `/search/movie?&language=ko-KR${debouncedSearch ? `&query=${debouncedSearch}` : ""}&page=1`
  );

  return (
    <Wrapper>
      <SearchWrapper>
        <SearchInput
          placeholder="영화 제목을 입력하세요."
          type="search"
          onChange={(e) => setSearchQuery(e.target?.value)}
        />
        <SearchButton>검색</SearchButton>
      </SearchWrapper>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "16px",
          padding: "16px",
        }}
      >
        {isLoading ? (
          Array(10)
            .fill()
            .map((_, i) => <Skeleton key={i} />)
        ) : data?.results?.length > 0 ? (
          data?.results?.map((movie) => <Card key={movie?.id} movie={movie} />)
        ) : debouncedSearch ? (
          <span>{`'${debouncedSearch}'에 대한 검색 결과가 없습니다.`}</span>
        ) : (
          <span>검색어를 입력하세요.</span>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1;
`;

const SearchWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input`
  padding: 16px 32px 16px 32px;
  width: 32rem;
  border-radius: 16px 0 0 16px;
  border: none;
  font-size: 1.05rem;
`;

const SearchButton = styled.button`
  padding: 16px 32px 16px 32px;
  border: none;
  color: white;
  font: inherit;
  box-shadow: none;
  background: #e31b64;
  border-radius: 0 16px 16px 0;
  cursor: pointer;
  &:hover {
    background: #bd0f4f;
  }
`;

const SkeletonAnimation = keyframes`

      0% {
          background-color: rgba(165, 165, 165, 0.1);
      }

      50% {
          background-color: rgba(165, 165, 165, 0.3);
      }

      100% {
          background-color: rgba(165, 165, 165, 0.1);
      }

`;

const Skeleton = styled.div`
  width: 128px;
  height: 198px;
  animation: ${SkeletonAnimation} 1.8s infinite ease-in-out;
`;
