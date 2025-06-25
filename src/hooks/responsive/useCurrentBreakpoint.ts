// hooks/useCurrentBreakpoint.ts
import { useEffect, useState } from 'react';
// constants/breakpoints.ts
export type Breakpoint = 'desktop' | 'tablet' | 'mobile';

export const breakpoints: Record<Breakpoint, number> = {
  desktop: 1024,
  tablet: 768,
  mobile: 0,
};


export const useCurrentBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < breakpoints.tablet) setBreakpoint('mobile');
      else if (width < breakpoints.desktop) setBreakpoint('tablet');
      else setBreakpoint('desktop');
    };

    updateBreakpoint(); // initial
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
};
