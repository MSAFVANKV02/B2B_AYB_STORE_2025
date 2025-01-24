import { ColorTableColumn } from "@/components/tasks/table_columns/color-table-column";
import { DataTable } from "@/components/tasks/task_components/data-table";


export type IColors = {
    id: string;
    color_code: string;
    name: string;
  
}

const Color:IColors[] = [
    {
        id:"colorid",
        color_code: "red",
        name: "Red"
    }
]


export default function ColorPage() {
  return (
    <div>
         <div className=" p-4">
        <h1 className="font-bold">Product Colors</h1>
      </div>
      {/* ===== */}
      <div className="page-outer">
      <DataTable
          enableSearch
          columns={ColorTableColumn}
          data={Color}
          searchWith="name"
          // statuses={statuses}

          enableStatus={false}
          enableView={false}
        />
      </div>
        
    </div>
  )
}