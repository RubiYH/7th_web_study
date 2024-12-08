import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <h2 style={{ marginBottom: "64px" }}>UMC TodoList</h2>
      <Outlet />
    </>
  );
}
