import * as XLSX from "xlsx";
import { IProducts } from "@/types/productType";

const useDownloadXl = () => {
  const downloadStockReport = (products: IProducts[]) => {
    // Prepare the stock data for export
    const stockData = products.map((product) => ({
      product_name: product.product_name,
      Brand: product.brand || "N/A",
      product_weight: product.product_weight || "N/A",
      "Min Order": product.minimum_quantity,
      Variations: product.variations
        .map((variant) => `${variant.colorName}: ${variant.details.map((detail) => `${detail.size}(${detail.stock})`).join(", ")}`)
        .join(" | "),
      "Base Price": product.base_price,
      "Discount (%)": product.discount,
      "Price (MRP)": product.mrp,
      "is_published?": product.is_published ? "Yes" : "No",
      "is_featured_product?": product.is_featured_product ? "Yes" : "No",
    }));

    // Create a new workbook and add the stock data
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(stockData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Stock Report");

    // Write the workbook to a file and trigger the download
    XLSX.writeFile(workbook, `Stock_Report_${new Date().toLocaleDateString()}.xlsx`);
  };

  return { downloadStockReport };
};

export default useDownloadXl;
