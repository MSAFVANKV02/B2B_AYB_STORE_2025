// canvas-scale-context.tsx
import React, { createContext, useContext } from "react";

const CanvasScaleContext = createContext(1);

// eslint-disable-next-line react-refresh/only-export-components
export const useCanvasScale = () => useContext(CanvasScaleContext);

export const CanvasScaleProvider: React.FC<{ scale: number; children: React.ReactNode }> = ({
  scale,
  children,
}) => (
  <CanvasScaleContext.Provider value={scale}>
    {children}
  </CanvasScaleContext.Provider>
);
