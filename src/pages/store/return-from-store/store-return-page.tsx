import { ReturnFromStoreTableColumn } from "@/components/tasks/table_columns/store/store-return-column";
import { DataTable } from "@/components/tasks/task_components/data-table";

const data = [
  {
    id: "1",
    name: "John Doe",
    date: "2023-01-01",
    store: "ABC Store",
    email: "johndoe@example.com",
    gst: "1234567890",
    pinCode: "12345",
    buildingNo: "123",
    actions: "Actions",
  },
];

export default function StoreReturnPage() {
  return (
    <div>
      <div className="p-4">
        <h1>Return from Store</h1>
      </div>
      <div className="page-outer">
        <DataTable data={data} columns={ReturnFromStoreTableColumn} />
      </div>
    </div>
  );
}
