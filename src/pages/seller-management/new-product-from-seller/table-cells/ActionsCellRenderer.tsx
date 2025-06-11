import { UseModal } from "@/providers/context/context";
import { ArrowRight } from "lucide-react";
import RequestStockModal from "./request_stock_modal";
import { IProducts } from "@/types/productType";
import { IStockType } from "@/types/stock_types";
import RequestedProductStock from "./requested_stock_product_modal";

type Props = {
  data: any;
  refetch?: any;
  isProductList?: boolean;
};

const ActionsCellRenderer = ({ data, isProductList = true }: Props) => {
  const { dynamicOpenModal, dynamicSelectedTask, dynamicCloseModal } = UseModal<
    IProducts | IStockType
  >();

  const isProduct = (task: IProducts | IStockType | null): task is IProducts =>
    !!task && "product_name" in task;

  const isStock = (task: IProducts | IStockType | null): task is IStockType =>
    !!task && "destination" in task;

  // console.log(dynamicSelectedTask,'dynamicSelectedTask');

  return (
    <div>
      <div
        className="text-textMain dark:text-neutral-300 flex items-center gap-2 cursor-pointer"
        onClick={() => {
          dynamicOpenModal(data);
        }}
      >
        {isProductList ? (
          <>
            <span> Request for Stock </span> <ArrowRight size={14} />
          </>
        ) : (
          <>
            <span> Requested Stock</span> <ArrowRight size={14} />
          </>
        )}
      </div>

      {dynamicSelectedTask?._id === data._id && (
        <>
          {isProduct(dynamicSelectedTask) && <RequestStockModal />}
          {isStock(dynamicSelectedTask) && (
            <RequestedProductStock
              closeModal={dynamicCloseModal}
              data={dynamicSelectedTask}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ActionsCellRenderer;

// export const getAllStockRequests = async (req, res) => {
//   try {
//     let filter = {};
//     if (req.params.id) {
//       filter.source_store = req.params.id;
//     }
//     if (req.user.role !== "admin") {
//       filter.$or = [
//         { source_store: req.user._id },
//         { destination: req.user._id },
//       ];
//     }
//     Object.keys(req.query).forEach((key) => {
//       filter[key] = req.query[key];
//     });

//     const stocks = await StockRequestModel.find(filter).populate({
//       path: "product_details.product",
//       model: "Products",
//       populate: [
//         { path: "brand", select: "name logo" },
//         { path: "categoryId", select: "name description" },
//       ],
//     });

//     const storeIds = [
//       ...new Set(
//         stocks.flatMap((p) => [
//           p.source_store?.toString(),
//           p.destination?.toString(),
//         ])
//       ),
//     ].filter(Boolean);

//     const adminIds = [
//       ...new Set(stocks.map((p) => p.destination?.toString())),
//     ];

//     let storeLookup = {};
//     let adminLookup = {};
//     if (storeIds.length > 0) {
//       storeLookup = await fetchUserDetails(storeIds);
//     }
//     if (adminIds.length > 0) {
//       adminLookup = await fetchUserDetails(adminIds, "admin", "getAdminByIds");
//     }

//     const stockWithStoreDetails = stocks.map((stock) => ({
//       ...stock.toObject(),
//       source_store:
//         storeLookup[stock.source_store?.toString()] || stock.source_store,
//         destination:
//         (storeLookup[stock.destination?.toString()]?? adminLookup[stock.destination?.toString()]) || stock.destination,
//       product_details: stock.product_details.map((item) => ({
//         product: {
//           ...item.product.toObject(),
//           variations: item.variant_details.map((variant) => ({
//             image: variant.image,
//             colorCode: variant.colorCode,
//             variant_name: variant.variant_name,
//             colorName: variant.colorName,
//             sample: variant.sample,
//             details: variant.size_details.map((sizeDetail) => {
//               // Find if SKU already exists in populated product details
//               const existingDetail = item.product.variations
//                 ?.flatMap((v) => v.details)
//                 ?.find((d) => d.skuId === sizeDetail.variant_sku);

//               return {
//                 size: sizeDetail.size,
//                 discount: sizeDetail.discount,
//                 selling_price: sizeDetail.selling_price,
//                 skuId: sizeDetail.variant_sku,
//                 stock: existingDetail ? existingDetail.stock : sizeDetail.stock, // Keep original stock if SKU exists
//                 stock_threshold: sizeDetail.stock_threshold || 0,
//                 purchaseQty: sizeDetail.stock, // New purchaseQty field
//               };
//             }),
//           })),
//         },
//       })),
//     }));

//     res.status(200).json({
//       success: true,
//       message: "All stock request retrieved successfully.",
//       requestCount: stockWithStoreDetails.length,
//       data: stockWithStoreDetails,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching stock requests.",
//       error: error.message,
//     });
//   }
// };
