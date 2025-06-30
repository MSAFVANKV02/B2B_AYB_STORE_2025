// // "use client";
// // import { useState, useContext, ReactNode } from "react";
// // import {
// //   BuilderDeviceContext,
// //   BuilderDeviceContextType,
// //   DeviceType,
// // } from "./builder-device-context";

// // // Custom hook
// // export const UseBuilderDevice = (): BuilderDeviceContextType =>
// //   useContext(BuilderDeviceContext);

// // // Provider component
// // interface BuilderDeviceProviderProps {
// //   children: ReactNode;
// // }

// // export const BuilderDeviceProvider = ({ children }: BuilderDeviceProviderProps) => {
// //   const [device, setDevice] = useState<DeviceType>("desktop");

// //   return (
// //     <BuilderDeviceContext.Provider value={{ device, setDevice }}>
// //       {children}
// //     </BuilderDeviceContext.Provider>
// //   );
// // };
// // context/DeviceContext.tsx
// import { Breakpoint } from '@/hooks/responsive/useCurrentBreakpoint';
// import { createContext, useContext, useState } from 'react';


// const BuilderDeviceContext = createContext<{
//   device: Breakpoint;
//   setDevice: (bp: Breakpoint) => void;
// }>({ device: 'desktop', setDevice: () => {} });

// export const UseDevice = () => useContext(BuilderDeviceContext);

// export const BuilderDeviceProvider = ({ children }: { children: React.ReactNode }) => {
//   const [device, setDevice] = useState<Breakpoint>('desktop');

//   return (
//     <BuilderDeviceContext.Provider value={{ device, setDevice }}>
//       {children}
//     </BuilderDeviceContext.Provider>
//   );
// };
