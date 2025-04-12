// import React, { useState } from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import Draggable from "react-draggable"; // Import react-draggable

// const data = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 },
// ];

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// const RADIAN = Math.PI / 180;

// // Define the type for renderCustomizedLabel props
// type LabelProps = {
//   cx: number;
//   cy: number;
//   midAngle: number;
//   innerRadius: number;
//   outerRadius: number;
//   percent: number;
//   index: number;
// };

// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
// }: LabelProps) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central"
//     >
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// const ReChartPie: React.FC = () => {
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   // const [isSticky, setIsSticky] = useState(false);
//   // console.log(position,'position');
  

//   const handleDrag = (_: any, data: any) => {
//     setPosition({ x: data.x, y: data.y });
//   };

//   // const handleStop = () => {
//   //   // Add sticky behavior if pie chart is dragged a certain amount
//   //   if (position.y > 100) { // Threshold for sticky behavior
//   //     setIsSticky(true);
//   //   } else {
//   //     setIsSticky(false);
//   //   }
//   // };

//   return (
//     <main className={`lg:w-[40%] w-full `}>
//       <Card
//       //  className={`${isSticky && "sticky top-0"}`}
//       className="z-[10000]"
//        >
//         <CardHeader>
//         <CardTitle>All Orders</CardTitle>
//         <CardDescription className="">
//           {
//             COLORS.map((color,index) =>(
//               <span
//               key={`${color}-${index}`}
//                 className="inline-flex mx-1 items-center text-xs h-3 w-3 font-medium leading-4 bg-gray-100 text-gray-700"
//                 style={{ backgroundColor: color }}
//               >
//                 {/* {color} */}
//               </span>
//             ))
//           }
//         </CardDescription>
//         </CardHeader>
//         <Draggable
//          position={position} // To make the component stick to its position
//          onDrag={handleDrag}
//         //  onStop={handleStop} 
//         >
//           <CardContent className="h-[400px] w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={data}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={renderCustomizedLabel}
//                   outerRadius={150}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {data.map((_, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Draggable>
//       </Card>
//     </main>
//   );
// };

// export default ReChartPie;
// =================================================================  
import React from "react";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface DataEntry {
  name: string;
  value: number;
  color: string;
}

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const ReChartPie: React.FC = () => {
  const { t } = useTranslation();

  const data: DataEntry[] = [
    { name: "Pending", value: 20, color: "#FFC107" },
    { name: "Shipped", value: 50, color: "#03A9F4" },
    { name: "Delivered", value: 30, color: "#4CAF50" },
    { name: "Cancelled", value: 10, color: "#FF6F61" },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: CustomizedLabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full lg:w-[40%]  mx-auto p-6 bg-card rounded-lg shadow-sm">
      <h2 className="text-heading font-heading text-center mb-6">{t("Order Status Distribution")}</h2>
      <div className="w-full h-[400px]" role="img" aria-label="Pie chart showing order status distribution">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span className="text-foreground text-sm">{t(value)}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div
            key={`stat-${index}`}
            className="p-4 bg-secondary rounded-lg text-center"
            role="presentation"
          >
            <p className="text-accent-foreground text-sm mb-1">{t(item.name)}</p>
            <p className="text-foreground font-heading text-lg">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReChartPie;
