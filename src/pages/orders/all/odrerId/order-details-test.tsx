// import MyBackBtn from "@/components/myUi/myBackBtn";
// import MyClock from "@/components/myUi/MyClock";
// import { UseUpdateModal } from "@/providers/context/modal-context";
// import { IFlatOrderItem, IOrders, IOrderStatus } from "@/types/orderTypes";
// import OrderStatusChangerWidget from "@/components/tasks/table_actions/Orders/all-orders-action/order-status-changer";
// import React from "react";
// import Image from "@/components/global/image";
// import { useQueryData } from "@/hooks/useQueryData";
// import { getAllOrdersAction } from "@/actions/orders/ordersAction";
// import { useParams } from "react-router-dom";
// import { decodeId } from "@/utils/encorder";

// type Props = {
//   orders: IOrders;
// };

// const OrderDetailsPage = ({ orders }: Props) => {
//   const { dispatchModal } = UseUpdateModal();

//   const storeOrder = orders.store_orders?.[0];
//   const status = storeOrder?.order_status as IOrderStatus;
//   const isReturned = storeOrder?.is_returned;
//   const statusLabelMap: Record<IOrderStatus, string> = {
//     pending: "Pending",
//     processing: "In Progress",
//     ready_to_pickup: "Ready for Pickup",
//     shipped: "Shipped",
//     out_for_delivery: "Out for Delivery",
//     delivered: "Delivered",
//     cancelled: "Cancelled",
//   };

//   const statusColorMap: Record<IOrderStatus, string> = {
//     pending:
//       "bg-yellow-50 text-yellow-600 border border-yellow-500 dark:bg-yellow-50/20 dark:border-yellow-500/30 dark:text-neutral-300",
//     processing:
//       "bg-blue-50 text-blue-600 border border-blue-500 dark:bg-blue-50/20 dark:border-blue-500/30 dark:text-neutral-300",
//     ready_to_pickup:
//       "bg-orange-50 text-orange-600 border border-orange-500 dark:bg-orange-50/20 dark:border-orange-500/30 dark:text-neutral-300",
//     shipped:
//       "bg-[#16A085]/10 text-[#16A085] border border-[#16A085] dark:bg-[#16A085]/20 dark:border-[#16A085]/30 dark:text-neutral-300",
//     out_for_delivery:
//       "bg-violet-50 text-violet-600 border border-violet-500 dark:bg-violet-50/20 dark:border-violet-500/30 dark:text-neutral-300",
//     delivered:
//       "bg-[#27AE60]/10 text-[#27AE60] border border-[#27AE60] dark:bg-[#27AE60]/20 dark:border-[#27AE60]/30 dark:text-neutral-300",
//     cancelled:
//       "bg-red-50 text-red-600 border border-red-500 dark:bg-red-50/20 dark:border-red-500/30 dark:text-neutral-300",
//   };

//   const label = statusLabelMap[status] ?? "Unknown";
//   const color = statusColorMap[status] ?? "bg-gray-200";

//   return (
//     <div className="2xl:px-0 lg:px-10  space-y-5 w-full">
//       <MyBackBtn
//         clickEvent={() => {
//           dispatchModal({ type: "CLOSE_MODAL" });
//         }}
//       />
//       <div className="flex gap-3">
//         <div className="lg:w-3/4 space-y-3 ">
//           {/* 1. */}
//           <div className="bg-white dark:bg-inherit p-4 rounded-md flex justify-between">
//             {/* 2.==== */}
//             <div className="space-y-4">
//               <p className="text-xs">
//                 <span className="font-bold">Order Id :</span>{" "}
//                 <span className="">{orders.order_id}</span>
//               </p>

//               <p className="text-xs">
//                 <span className="font-bold">Order Created at :</span>{" "}
//                 <MyClock date={orders.createdAt} showSeconds={false} />
//               </p>
//             </div>
//             <div className=" flex md:flex-row  gap-5 flex-col items-start">
//               <div className="flex flex-col items-start gap-2">
//                 <span className="font-bold text-xs">Current Status</span>
//                 {isReturned ? (
//                   <div className="px-2 py-1 rounded text-xs text-center w-full bg-pink-100 text-pink-600 border border-pink-400">
//                     Returned
//                   </div>
//                 ) : (
//                   <div
//                     className={`px-2 py-1 rounded text-xs text-center w-full ${color}`}
//                   >
//                     {label}
//                   </div>
//                 )}
//               </div>

//               {/* status updater */}
//               <div className="">
//                 <OrderStatusChangerWidget orders={orders} />
//               </div>
//             </div>
//             {/* 3.=== */}
//           </div>

//           {/* table start here */}
//           <DetailsTable orders={orders} />
//         </div>
//         {/* 4. */}
//         <div className="lg:flex-grow bg-white">d</div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetailsPage;

// const DetailsTable = ({ orders }: Props) => {
//   const storeOrder = orders.store_orders?.[0];
//   const { orderId, storeOrderId } = useParams();
//   const decodedStoreOrderId = decodeId(storeOrderId ?? "");


//   const {
//     data: fetchedOrders,
//     isFetching,
//     refetch,
//   } = useQueryData(
//     ["order-details", orderId, storeOrderId],
//     async () => {
//       const res = await  getAllOrdersAction([
//         // { key: "page", value: pageQ },
//         // { key: "status", value: type },
//         // {key:"limit", value: "1"},
//       ])
//       if (res?.status === 200 && res.data) {
//         const filteredItems: IFlatOrderItem[] = res.data.orders.flatMap(
//           (order: IOrders) =>
//             order.store_orders
//               .filter((store) => store.store_order_id === decodedStoreOrderId)
//               .flatMap((store) =>
//                 store.items.map((item, index) => ({
//                   ...item,
//                   store,
//                   order,
//                   showVerifiedLabel: index === 0,
//                 }))
//               )
//         );
//         return { status: res.status, data: filteredItems };
//       }
//       return { status: 500, data: [] };
//     }
//     // { disableRefetch: true }
//   );

//   // Group items by product name
//   const groupedItems =
//     storeOrder?.items.reduce((acc, item) => {
//       const key = item.product.product_name;
//       if (!acc[key]) acc[key] = [];
//       acc[key].push(item);
//       return acc;
//     }, {} as Record<string, typeof storeOrder.items>) ?? {};

//   return (
//     <div className="">
//       <h2 className="text-lg font-semibold">Order Items</h2>
//       <div className="bg-white dark:bg-inherit rounded-md p-4">
//         <table className="w-full ">
//           {/* <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10 text-left text-xs uppercase text-gray-500 dark:text-neutral-400">
//             <tr>
//               <th className="p-2">Image</th>
//               <th className="p-2">Name</th>
//               <th className="p-2">Color</th>
//               <th className="p-2">Size</th>
//               <th className="p-2">Qty</th>
//               <th className="p-2">Price (1PCS)</th>
//               <th className="p-2">Total</th>
//             </tr>
//           </thead> */}
//           <tbody className="w-full">
//             {storeOrder.items.map((item, index) => (
//               <table className=" w-full">
//                 <thead
//                   className={` ${
//                     index === 0 ? "visi bg-gray-100" : "hiddn"
//                   }  dark:bg-gray-800 sticky top-0 z-10 text-left text-xs uppercase
//                   text-gray-500 dark:text-neutral-400`}
//                 >
//                   <tr className="w-full">
//                     <th className="p-2">Image</th>
//                     <th className="p-2">Name</th>
//                     <th className="p-2">Color</th>
//                     <th className="p-2">Size</th>
//                     <th className="p-2">Qty</th>
//                     <th className="p-2">Price (1PCS)</th>
//                     <th className="p-2">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody className="w-full">
//                   {item.product.variations.map((variation, v) =>
//                     variation.details.map((details, dIndex) => (
//                       <tr
//                         className={`border rounded-2xl ${
//                           dIndex === 0 ? "rounded-tl-md" : ""
//                         } `}
//                       >
//                         <td className="adas p-2">{dIndex}</td>
//                         <td className="adas">{dIndex}</td>
//                         <td className="adas">{dIndex}</td>
//                         <td className="adas">{dIndex}</td>
//                         <td className="adas">{dIndex}</td>
//                         <td className="adas">{dIndex}</td>
//                         <td className="adas">{dIndex}</td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {/* <div className="bg-white dark:bg-inherit rounded-md p-4">
//         <h2 className="text-lg font-semibold mb-4">Order Items</h2>
//         <div className="overflow-auto space-y-4">
//           <table className="min-w-full text-sm border-separate border-spacing-y-0">
//             <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10 text-left text-xs uppercase text-gray-500 dark:text-neutral-400">
//               <tr>
//                 <th className="p-2">Image</th>
//                 <th className="p-2">Name</th>
//                 <th className="p-2">Color</th>
//                 <th className="p-2">Size</th>
//                 <th className="p-2">Qty</th>
//                 <th className="p-2">Price (1PCS)</th>
//                 <th className="p-2">Total</th>
//               </tr>
//             </thead>
//           </table>

//           Each product group rendered separately
//           {storeOrder?.items.map((item) => {
//             const { product } = item;
//             const variations = product.variations || [];

//             const flatVariations = variations.flatMap((variation) =>
//               variation.details.map((detail) => ({
//                 color: variation.colorName || "—",
//                 size: detail.size,
//                 qty: detail.quantity,
//                 price: detail.selling_price,
//                 total: detail.quantity * detail.selling_price,
//               }))
//             );

//             return (
//               <div
//                 key={item.product_order_id}
//                 className="border border-gray-300 rounded-md overflow-hidden"
//               >
//                 <table className="min-w-full text-sm">
//                   <tbody className="bg-white">
//                     {flatVariations.map((v, i) => (
//                       <tr
//                         key={`${item.product_order_id}-${i}`}
//                         className={` ${flatVariations.length -1 !== i ?"border-b":""} `}
//                       >
//                         <td
//                           rowSpan={flatVariations.length}
//                           className="p-2 align-top"
//                         >
//                           {i === 0 && (
//                             <Image
//                               src={product.gallery_image[0] ?? "/no-img.jpg"}
//                               alt={product.product_name}
//                               className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden"
//                               classNameImg="w-full h-full object-contain"
//                             />
//                           )}
//                         </td>
//                         <td
//                           rowSpan={flatVariations.length}
//                           className="p-2 align-top font-medium"
//                         >
//                           {i === 0 && (
//                             <span className="">{product.product_name}</span>
//                           )}
//                         </td>

//                         <td className="p-2 align-top">{v.color}</td>
//                         <td className="p-2 align-top">{v.size}</td>
//                         <td className="p-2 align-top">{v.qty}</td>
//                         <td className="p-2 align-top">₹{v.price}</td>
//                         <td className="p-2 align-top font-semibold">
//                           ₹{v.total.toLocaleString("en-IN")}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             );
//           })}
//         </div>
//       </div> */}
//     </div>
//   );
// };

// {
//   /* <div className="w-full">
//         <div className="grid grid-cols-7 text-xs font-semibold text-gray-500 border-b py-2 px-2">
//           <span>Image</span>
//           <span>Name</span>
//           <span>Color</span>
//           <span>Size</span>
//           <span>Qty</span>
//           <span>Price (1PCS)</span>
//           <span>Total</span>
//         </div>

//         {storeOrder?.items.map((item) => {
//           const { product } = item;
//           const variations = product.variations || [];

//           const flatVariations = variations.flatMap((variation) =>
//             variation.details.map((detail) => ({
//               color: variation.colorName || "—",
//               size: detail.size,
//               qty: detail.quantity,
//               price: detail.selling_price,
//               total: detail.quantity * detail.selling_price,
//             }))
//           );

//           return (
//             <div
//               key={item.product_order_id}
//               className="mt-3 rounded-md border border-gray-300 overflow-hidden bg-white"
//             >
//               {flatVariations.map((v, i) => (
//                 <div
//                   key={`${item.product_order_id}-${i}`}
//                   className="grid grid-cols-7 gap-2 text-sm px-2 py-3 border-t first:border-t-0"
//                 >
//                   Image & name in first row only
//                   {i === 0 ? (
//                     <>
//                       <div rowSpan={flatVariations.length}>
//                         <Image
//                           src={product.gallery_image[0] ?? "/no-img.jpg"}
//                           alt={product.product_name}
//                           className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden"
//                           classNameImg="w-full h-full object-contain"
//                         />
//                       </div>
//                       <div rowSpan={flatVariations.length}>
//                         <span className="font-medium">
//                           {product.product_name}
//                         </span>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div />
//                       <div />
//                     </>
//                   )}
//                   <div>{v.color}</div>
//                   <div>{v.size}</div>
//                   <div>{v.qty}</div>
//                   <div>₹{v.price}</div>
//                   <div className="font-semibold">₹{v.total}</div>
//                 </div>
//               ))}
//             </div>
//           );
//         })}
//       </div> */
// }
