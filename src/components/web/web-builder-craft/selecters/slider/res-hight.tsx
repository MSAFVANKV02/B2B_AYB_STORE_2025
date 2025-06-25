import { useEffect, useState } from "react";

function useBreakpointHeight(heights: {
  desktop: string;
  tablet: string;
  mobile: string;
}) {
  const [height, setHeight] = useState(heights.desktop);

  useEffect(() => {
    const updateHeight = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setHeight(heights.mobile);
      } else if (width <= 1024) {
        setHeight(heights.tablet);
      } else {
        setHeight(heights.desktop);
      }
    };

    updateHeight(); // Initial check
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [heights]);

  return height;
}

export default useBreakpointHeight;
