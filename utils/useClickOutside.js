import { useEffect } from "react";

export default function useClickOutside(ref, callback) {
  const handleClick = (e) => {
    console.log("click");
    console.log(ref);
    if (ref.current && !ref.current.contains(e.target)) {
      callback(e);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });
}
