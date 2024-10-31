import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import styled from "styled-components";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Row>
        <Sidebar />
        <Outlet />
      </Row>
    </>
  );
};

const Row = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

export default RootLayout;
