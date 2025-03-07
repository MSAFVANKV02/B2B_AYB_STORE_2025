import * as XLSX from "xlsx";
import { IProducts } from "@/types/productType";

export const handleExportExcel = (products: IProducts[]) => {
  if (!Array.isArray(products) || products.length === 0) {
    alert("No products to export.");
    return;
  }

  // Convert data into a worksheet
  const worksheet = XLSX.utils.json_to_sheet(products);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Data");

  // Generate and trigger download
  XLSX.writeFile(workbook, "inventory_data.xlsx");
};
