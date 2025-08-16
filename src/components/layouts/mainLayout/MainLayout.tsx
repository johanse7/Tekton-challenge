import { BackButton } from "@/components/ui/BackButton";
import { Outlet } from "react-router";
import { Header } from "./Header";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <BackButton className="mt-8 md:ml-8 " />
      <main className="w-full p-6 mt-10 max-w-5xl mx-auto">
        <Outlet />
      </main>
    </>
  );
};
