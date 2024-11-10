import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = ({ movie }) => {
  return (
    <StyledCard to={`/movies/movie/${movie?.id}`}>
      <StyledImage src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} />
      <CardText bold="true">{movie?.title}</CardText>
      <CardText>{movie?.release_date}</CardText>
    </StyledCard>
  );
};

const StyledCard = styled(Link)`
  width: 128px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.5rem;
  border-radius: 1rem;
  overflow: hidden;
  text-decoration: none;
  color: white;
`;

const CardText = styled.span`
  font-size: 0.8rem;
  font-weight: ${(props) => (props?.bold === "true" ? 700 : 400)};
`;

const StyledImage = styled.img`
  width: 128px;
  height: 192px;
  object-fit: cover;
  background-color: black;
  transition: all 200ms ease-in-out;
  &:hover {
    opacity: 0.5;
  }
`;

export default Card;
