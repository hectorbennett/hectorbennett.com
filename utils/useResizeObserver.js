import { useEffect } from "react";

export default function useResizeObserver(ref, callback) {
  const observer = new ResizeObserver(callback);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);
}
