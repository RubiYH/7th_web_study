import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Movies() {
  return (
    <Wrapper>
      <Header>카테고리</Header>
      <CategoryWrapper>
        <Category to="/movies/category/now-playing">현재 상영중인</Category>
        <Category to="/movies/category/popular">인기있는</Category>
        <Category to="/movies/category/top-rated">높은 평가를 받은</Category>
        <Category to="/movies/category/up-coming">개봉 예정중인</Category>
      </CategoryWrapper>
    </Wrapper>
  );
}

const Header = styled.span`
  font-size: 2rem;
  color: white;
  font-weight: 600;
`;

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
const Category = styled(Link)`
  padding: 1rem;
  border-radius: 16px;
  text-decoration: none;
  color: white;
`;
