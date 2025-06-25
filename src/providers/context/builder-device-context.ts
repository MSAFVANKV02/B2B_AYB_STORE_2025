import { createContext } from "react";

export type DeviceType = "desktop" | "tablet" | "mobile";

export interface BuilderDeviceContextType {
  device: DeviceType;
  setDevice: (d: DeviceType) => void;
}

export const BuilderDeviceContext = createContext<BuilderDeviceContextType>({
  device: "desktop",
  setDevice: () => {},
});
