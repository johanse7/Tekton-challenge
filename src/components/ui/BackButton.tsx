import { HOME_PATH } from "@/utils";
import clsx from "clsx";
import { FaArrowLeft } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router";
import { Button } from "./button";

type BackButton = {
  className?: string;
};

export const BackButton = ({ className }: BackButton) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate(-1);
  };

  if (location.pathname === HOME_PATH) return null;

  return (
    <Button
      variant="ghost"
      onClick={handleBack}
      className={clsx("flex gap-2 items-center", className)}
    >
      <FaArrowLeft size={20} />
      <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
        Back
      </span>
    </Button>
  );
};
