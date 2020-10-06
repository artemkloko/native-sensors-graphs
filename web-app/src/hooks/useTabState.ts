import { useEffect, useState } from "react";

export const useTabState = () => {
  const [state, setState] = useState<{
    status: "focus" | "blur";
  }>({
    status: "focus",
  });

  const onFocus = () => {
    setState((state) => ({ ...state, status: "focus" }));
  };

  const onBlur = () => {
    setState((state) => ({ ...state, status: "blur" }));
  };

  useEffect(() => {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    window.onbeforeunload = onBlur

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return state;
};
