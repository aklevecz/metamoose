import { useEffect, useState } from "react";

export default function useDevice() {
  const [isMobile, setIsMobile] = useState(true);
  const [viewHeight, setViewHeight] = useState<any>(null);
  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      setViewHeight(window.innerHeight);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("resize", onResize);
      onResize();
    }
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { viewHeight, isMobile };
}
