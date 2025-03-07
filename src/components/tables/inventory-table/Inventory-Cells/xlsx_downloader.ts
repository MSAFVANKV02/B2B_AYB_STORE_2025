import * as XLSX from "xlsx";

export const handleExportExcel = <T extends Record<string, any>>(data: T[]) => {
  if (!Array.isArray(data) || data.length === 0) {
    alert("No data to export.");
    return;
  }

  // Convert data into a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Exported Data");

  // Generate and trigger download
  XLSX.writeFile(workbook, "exported_data.xlsx");
};
