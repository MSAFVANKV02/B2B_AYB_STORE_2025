// import * as XLSX from "xlsx";
// import { IProducts } from "@/types/productType";

// const useDownloadXl = () => {
//   const downloadStockReport = (products: IProducts[]) => {
//     // Prepare the stock data for export
//     const stockData = products.map((product) => ({
//       product_name: product.product_name,
//       Brand: product.brand || "N/A",
//       product_weight: product.product_weight || "N/A",
//       "Min Order": product.minimum_quantity,
//       Variations: product.variations
//         .map((variant) => `${variant.colorName}: ${variant.details.map((detail) => `${detail.size}(${detail.stock})`).join(", ")}`)
//         .join(" | "),
//       "Base Price": product.base_price,
//       "Discount (%)": product.discount,
//       "Price (MRP)": product.mrp,
//       "is_published?": product.is_published ? "Yes" : "No",
//       "is_featured_product?": product.is_featured_product ? "Yes" : "No",
//     }));

//     // Create a new workbook and add the stock data
//     const workbook = XLSX.utils.book_new();
//     const worksheet = XLSX.utils.json_to_sheet(stockData);

//     // Append the worksheet to the workbook
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Stock Report");

//     // Write the workbook to a file and trigger the download
//     XLSX.writeFile(workbook, `Stock_Report_${new Date().toLocaleDateString()}.xlsx`);
//   };

//   return { downloadStockReport };
// };

// export default useDownloadXl;
import ExcelJS from "exceljs";
import { IProducts } from "@/types/productType";

const useDownloadXl = () => {
  const downloadStockReport = async (products: IProducts[]) => {
    // Create a workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Stock Report");

    // Add header
    worksheet.columns = [
      { header: "Product Name", key: "product_name", width: 25 },
      { header: "Brand", key: "brand", width: 15 },
      { header: "Product Weight", key: "product_weight", width: 15 },
      { header: "Min Order", key: "minimum_quantity", width: 15 },
      { header: "Variations", key: "variations", width: 40 },
      { header: "Base Price", key: "basePrice", width: 15 },
      { header: "Discount (%)", key: "discount", width: 15 },
      { header: "Price (MRP)", key: "mrp", width: 15 },
      { header: "Is Published?", key: "is_published", width: 15 },
      { header: "Is Featured Product?", key: "is_featured_product", width: 20 },
    ];

    // Add rows
    products.forEach((product) => {
      worksheet.addRow({
        product_name: product.product_name,
        brand: product.brand || "N/A",
        product_weight: product.product_weight || "N/A",
        minimum_quantity: product.minimum_quantity,
        variations: product.variations
          .map(
            (variant) =>
              `${variant.colorName}: ${variant.details
                .map((detail) => `${detail.size}(${detail.stock})`)
                .join(", ")}`
          )
          .join(" | "),
        basePrice: product.basePrice,
        discount: product.discount,
        mrp: product.mrp,
        is_published: product.is_published ? "Yes" : "No",
        is_featured_product: product.is_featured_product ? "Yes" : "No",
      });
    });

    // Generate file and download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Stock_Report_${new Date().toLocaleDateString()}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return { downloadStockReport };
};

export default useDownloadXl;