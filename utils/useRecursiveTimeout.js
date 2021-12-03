import { useEffect, useRef } from "react";

const useRecursiveTimeout = (callback, delay = 1000) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = callback;
  });

  useEffect(() => {
    const tick = () => {
      const ret = ref.current();
      if (!ret) {
        setTimeout(tick, delay);
      }
    };
    const timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [delay]);
};

export default useRecursiveTimeout;
