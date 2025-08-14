import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

export const DarkMode = () => {
  const [isDarkMode, setDarkMode] = useState<boolean>(() => {
    const mode = localStorage.getItem("theme");

    if (mode) {
      return mode === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      return;
    }

    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }, [isDarkMode]);

  const handleClickChangeTheme = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };
  return (
    <Button
      variant="ghost"
      className="p-0 cursor-pointer"
      onClick={handleClickChangeTheme}
    >
      {!isDarkMode ? (
        <MdDarkMode size={30} />
      ) : (
        <MdOutlineLightMode size={30} />
      )}
    </Button>
  );
};
