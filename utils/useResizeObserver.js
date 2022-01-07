import { useEffect, useMemo } from "react";

export default function useResizeObserver(ref, callback) {
  const observer = useMemo(() => new ResizeObserver(callback), [callback]);
  const element = ref.current;

  useEffect(() => {
    if (!element) {
      return;
    }
    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [element, observer]);
}
