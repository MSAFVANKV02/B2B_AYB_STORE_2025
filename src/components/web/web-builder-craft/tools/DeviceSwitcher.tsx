
// import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
// import TabletMacIcon from '@mui/icons-material/TabletMac';
// import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
// import { Breakpoint } from '@/hooks/responsive/useCurrentBreakpoint';
// import { ToolbarItem, ToolbarSection } from '../elements/Toolbar';
// import { Container } from '../selecters';

// const devices: { label: Breakpoint; icon: JSX.Element }[] = [
//   { label: 'desktop', icon: <DesktopWindowsIcon /> },
//   { label: 'tablet', icon: <TabletMacIcon /> },
//   { label: 'mobile', icon: <PhoneIphoneIcon /> },
// ];

// type Props = {
//   selected: Breakpoint;
//   onChange: (bp: Breakpoint) => void;
// };

// export const DeviceSwitcher = ({ selected, onChange }: Props) => {
//   return (
//     <div className="flex gap-2 p-2 border rounded bg-white shadow">
        
//       {devices.map(({ label, icon }) => (
//         <button
//           key={label}
//           className={`p-1 rounded ${
//             selected === label ? 'bg-blue-500 text-white' : 'bg-gray-100'
//           }`}
//           onClick={() => onChange(label)}
//         >
//           {icon}
//         </button>
//       ))}
//     </div>
//   );
// };

// Container.craft = {
//     displayName: 'Container',
//     // props: defaultProps,
//     rules: {
//       canDrag: () => true,
//     },
//     related: {
//       settings:  <ToolbarSection
//       title="Dimensions"
//       props={['width', 'height']}
//       summary={({ width, height }: any) => {
//         return `${width || 0} x ${height || 0}`;
//       }}
//     >
//       <ToolbarItem propKey="width" type="text" label="Width" />
//       <ToolbarItem propKey="height" type="text" label="Height" />
//     </ToolbarSection>,
//     },
//   };
  