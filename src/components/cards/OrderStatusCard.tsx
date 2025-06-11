import { Icon } from "@iconify/react";
import { CardContent } from "./Card";
import { useTheme } from "../ui/theme";

export type StatusCardProps = {
  id: number;
  icon: any;
  count?: number;
  label: string;
  discription?: string;
  className?: string;
  bgcolor: string;
  iColor: string
  iconIsSvg?:boolean

};

export default function OrderStatusCard({
  icon,
  count,
  label,
  bgcolor,
  iColor,
  iconIsSvg
}: StatusCardProps) {
  const {theme} = useTheme()
  return (
    <CardContent className={` dark:bg-transparent shadow-none dark:border-neutral-400/20`} style={{ }}>
      <section className="w-full flex  items-center justify-start gap-4 ">
        <div className=" w-fit p-3 bg-inherit rounded-lg flex justify-center items-center text-white" style={{ backgroundColor:theme === "dark"?"":`${bgcolor}` }}>
        {iconIsSvg ?icon : <Icon icon={icon} fontSize={30} color={`${iColor}`}/>} 
        </div>
        <div className="">
          <p className=" text-textGray  text-sm ">{label}</p>
          <h5 className="text-2xl dark:text-neutral-300 font-bold">{count}</h5>
        </div>
      </section>
    </CardContent>
  );
}
