// import * as XLSX from "xlsx";
// import { IProducts } from "@/types/productType";

// export const handleExportExcel = (products: IProducts[]) => {
//   if (!Array.isArray(products) || products.length === 0) {
//     alert("No products to export.");
//     return;
//   }

//   // Convert data into a worksheet
//   const worksheet = XLSX.utils.json_to_sheet(products);

//   // Create a new workbook and append the worksheet
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Data");

//   // Generate and trigger download
//   XLSX.writeFile(workbook, "inventory_data.xlsx");
// };
import ExcelJS from "exceljs";
import { IProducts } from "@/types/productType";

export const handleExportExcel = async (products: IProducts[]) => {
  if (!Array.isArray(products) || products.length === 0) {
    alert("No products to export.");
    return;
  }

  // Create workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Inventory Data");

  // Auto extract keys from first product to make header
  const headers = Object.keys(products[0] || {}).map((key) => ({
    header: key,
    key: key,
    width: 20,
  }));

  worksheet.columns = headers;

  // Add data rows
  products.forEach((product) => {
    worksheet.addRow(product);
  });

  // Create buffer and download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/octet-stream" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "inventory_data.xlsx";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
