import DataTableProductStockReports from "@/components/tasks/task_components/report/data-table-product-stock-report";

type Props = {};

export type ProductLocalType = {
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  unitsSold: number;
  revenue: number;
  avgSalePerCustomer: number;
  returnRate: string;
  variants: {
    name: string;
    sku: string;
    price: number;
    stock: number;
  }[];
};

const sampleData: ProductLocalType[] = [
  {
    name: "Product A",
    sku: "PA-001",
    price: 49.99,
    stock: 100,
    category: "Electronics",
    unitsSold: 1405,
    revenue: 142305,
    avgSalePerCustomer: 1232.3,
    returnRate: "7.5%",
    variants: [
      { name: "Grey", sku: "PA-001-GR", price: 50, stock: 20 },
      { name: "Red", sku: "PA-001-RD", price: 55, stock: 15 },
    ],
  },
  {
    name: "Product B",
    sku: "PB-001",
    price: 29.99,
    stock: 200,
    category: "Clothing",
    unitsSold: 1200,
    revenue: 119988,
    avgSalePerCustomer: 999.9,
    returnRate: "5.0%",
    variants: [
      { name: "Blue", sku: "PB-001-BL", price: 30, stock: 50 },
      { name: "Green", sku: "PB-001-GR", price: 35, stock: 30 },
    ],
  },
];

export default function ProductStockPage({}: Props) {
  return (
    <div>
      <div className="p-4">
        <h1 className="select-none font-bold text-textGray text-sm">
          Product stock
        </h1>
      </div>
      {/*  */}
      <div className="page-outer">
        <DataTableProductStockReports data={sampleData} />
      </div>
    </div>
  );
}
