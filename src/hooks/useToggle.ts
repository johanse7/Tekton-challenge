import { useCallback, useState } from "react";

export const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState<boolean>(initialValue);

  const changeToggle = useCallback(() => {
    setValue((prevState) => !prevState);
  }, []);

  return [value, changeToggle];
};
