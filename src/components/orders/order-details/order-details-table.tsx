import { DataTable } from "@/components/tasks/task_components/data-table";

import CustomOrderDetailsTable from "./custom-table";
import { OrderDetailsTableColumnSDcn } from "@/components/tasks/table_columns/orders/order-details-table-column";
import { IFlatOrderItemDetailsType, IOrders } from "@/types/orderTypes";

type Props = {
  orders: IOrders;
};

const OrderDetailsTables = ({ orders }: Props) => {
  const storeOrder = orders.store_orders?.[0];

  const filteredOrder: IFlatOrderItemDetailsType[] = storeOrder.items.flatMap(
    (item) => {
      const product = item.product;
      const variations = product.variations || [];

      return variations.flatMap((variation) =>
        variation.details.map((detail, index) => ({
          _id: item._id,
          product_id: item.product_id,
          stock_id: item.stock_id,
          stock_sku: item.stock_sku,
          mrp: item.mrp,
          discount_type: item.discount_type,

          product: product,
          variation: variation,
          details: detail, // ✅ typo fixed: from `detail:` to `details:`

          store: storeOrder,
          order: orders,

          showVerifiedLabel: index === 0, // ✅ only the first row per group shows label
        }))
      );
    }
  );

  const groupedOrders = filteredOrder.reduce<
    Record<string, IFlatOrderItemDetailsType[]>
  >((acc, item) => {
    const key = item.product_id;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});


  // ✅ Grouping logic corrected and aligned with type
  // const groupedOrders: {
  //   product_id: string;
  //   product_name: string;
  //   image: string;
  //   variationDetails: {
  //     color: string;
  //     size: string;
  //     quantity: number;
  //     selling_price: number;
  //   }[];
  // }[] = [];

  // const groupedMap = new Map<string, (typeof groupedOrders)[0]>();

  // filteredOrder.forEach((item) => {
  //   if (!groupedMap.has(item.product_id)) {
  //     groupedMap.set(item.product_id, {
  //       product_id: item.product_id,
  //       product_name: item.product.product_name,
  //       image: item.variation.image,
  //       variationDetails: [],
  //     });
  //   }

  //   groupedMap.get(item.product_id)?.variationDetails.push({
  //     color: item.variation.colorName,
  //     size: item.details.size,
  //     quantity: item.details.quantity,
  //     selling_price: item.details.selling_price,
  //   });
  // });

  // const groupedList = Array.from(groupedMap.values());

  return (
    <div className="bg-white dark:bg-inherit  rounded-md p-4 max-h-[500px] overflow-y-auto">
      {/* <DataTable
      isCustomTableBody={(table, columns) => (
        <CustomOrderDetailsTable
          table={table}
          // isLoading={isFetching}
          columns={columns}
          tableHeadClass="dark:text-neutral-300 "
          tableHeadRowClass="dark:text-neutral-300"
          tableRowClass="  "
        />
      )}
      className="border-none"
      columns={OrderDetailsTableColumnSDcn}
      data={groupedList}
    /> */}
      {Object.keys(groupedOrders).map((productId, index) => {
        const productGroup = groupedOrders[productId];
        // const productName = productGroup[0]?.product.product_name;
        // const productImage = productGroup[0]?.variation.image;

        return (
          <div key={productId} className="mb-4">
            {/* Header per product */}

            {/* Product table */}
            <DataTable
              enablePagination={false}
              isCustomTableBody={(table, columns) => (
                <CustomOrderDetailsTable
                  index={index}
                  table={table}
                  columns={columns}
                  tableHeadClass="dark:text-neutral-300"
                  tableHeadRowClass="dark:text-neutral-300"
                  tableRowClass=""
                />
              )}
              // className="border-t-0 rounded-none border-l-0 border-r-0 "
              className="border-none "
              classNameOne="space-y-0 "
              columns={OrderDetailsTableColumnSDcn}
              data={productGroup}
            />
          </div>
        );
      })}
    </div>
  );
};

export default OrderDetailsTables;
