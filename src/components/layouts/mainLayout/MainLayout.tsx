import { BackButton } from "@/components/ui/BackButton";
import { Outlet } from "react-router";
import { Header } from "./Header";

export const MainLayout = () => {
  return (
    <main className="w-full ">
      <Header />
      <div className="pt-26">
        <BackButton className="md:ml-8" />
        <div className="w-full p-6 max-w-5xl mx-auto">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
