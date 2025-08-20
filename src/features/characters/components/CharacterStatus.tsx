import clsx from "clsx";
import type { StatusType } from "../interfaces/character";

type CharacterStatusProps = {
  status: StatusType;
};

const statusColors: Record<StatusType, string> = {
  Alive: "bg-green-500",
  Dead: "bg-red-500",
  Unknown: "bg-gray-500",
};

export const CharacterStatus = ({ status }: CharacterStatusProps) => {
  return (
    <div
      className="inline-flex items-center gap-2"
      aria-label="character-status"
    >
      <span
        className={clsx(
          `inline-block  w-2 h-2 text-xs font-semibold text-white rounded-full`,
          statusColors[status] || "bg-gray-500"
        )}
        role="presentation"
      />
      <span className="text-sm font-medium text-gray-500">{status}</span>
    </div>
  );
};
