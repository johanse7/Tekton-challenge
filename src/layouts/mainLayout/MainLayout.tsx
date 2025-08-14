import { Outlet } from "react-router";
import { Navbar } from "./Navbar";

export const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="w-full max-w-4xl mx-auto p-6">
        <Outlet />
      </main>
    </>
  );
};
