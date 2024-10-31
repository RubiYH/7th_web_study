// navbar.jsx
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <NavWrapper>
      <NavLogo to="/">YOONCHA</NavLogo>
      <NavMenu>
        <MenuButton to="/login">로그인</MenuButton>
        <MenuButton to="/register" register="true">
          회원가입
        </MenuButton>
      </NavMenu>
    </NavWrapper>
  );
};

const NavLogo = styled(Link)`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
`;

const NavWrapper = styled.nav`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const NavMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const MenuButton = styled(Link)`
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 8px;
  color: white;
  text-decoration: none;
  &:hover {
    background-color: ${(props) => (props?.register === "true" ? "#e31b64" : "white")};
    color: black;
  }
`;

export default Navbar;
