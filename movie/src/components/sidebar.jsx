import styled from "styled-components";
import { BiSolidMoviePlay, BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarMenu to="/search">
        <BiSearch color="white" />
        <SidebarMenuText>검색</SidebarMenuText>
      </SidebarMenu>
      <SidebarMenu to="/movies">
        <BiSolidMoviePlay color="white" />
        <SidebarMenuText>영화</SidebarMenuText>
      </SidebarMenu>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background-color: #222222;
  gap: 1rem;
`;

const SidebarMenu = styled(Link)`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4rem;
  border-radius: 1rem;
  &:hover {
    background-color: #555555;
  }
`;

const SidebarMenuText = styled.span`
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  color: white;
  white-space: nowrap;
`;

export default Sidebar;
