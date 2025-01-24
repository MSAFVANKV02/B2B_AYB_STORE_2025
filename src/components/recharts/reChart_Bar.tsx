import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 300 },
  { name: "Apr", value: 200 },
  { name: "May", value: 200 },
  { name: "Jun", value: 200 },
  { name: "Jul", value: 200 },
  { name: "Aug", value: 200 },
  { name: "Sep", value: 100 },
  { name: "Oct", value: 100 },
  { name: "Nov", value: 100 },
  { name: "Dec", value: 600 },
];

export default function ReChartBar() {
  const { t } = useTranslation();

  return (
    <main className="lg:w-[60%] w-full">
      <Card>
        <CardHeader>
        <CardTitle>{t("Total Revenue")}</CardTitle>
        </CardHeader>
        <CardContent className="h-[550px] w-full">
          <ResponsiveContainer height={"100%"} width={"100%"}>
            <BarChart data={data} className="border-b">
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#EC922B" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </main>
  );
}
