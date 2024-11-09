// navbar.jsx
import { useContext } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);

  const logout = () => {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");
    setUser({ isLoggedIn: false });
  };

  return (
    <NavWrapper>
      <NavLogo to="/">YOONCHA</NavLogo>
      <NavMenu>
        {user?.isLoggedIn ? (
          <>
            <span>{user?.email?.split("@")?.[0]}님, 반갑습니다.</span>
            <LogoutButton onClick={() => logout()}>로그아웃</LogoutButton>
          </>
        ) : (
          <>
            <MenuButton to="/login">로그인</MenuButton>
            <MenuButton to="/register" register="true">
              회원가입
            </MenuButton>
          </>
        )}
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

const BaseButton = css`
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 8px;
  color: white;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props?.register === "true" ? "#e31b64" : "white")};
    color: black;
  }
`;

const MenuButton = styled(Link)`
  ${BaseButton}
`;

const LogoutButton = styled.button`
  ${BaseButton}
  background-color: #e31b64;
  color: white;
  border: none;
  &:hover {
    background-color: white;
    color: black;
  }
`;

export default Navbar;
