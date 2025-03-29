import DataTable, { TableColumn } from "react-data-table-component";
import { Button } from "@/components/ui/button";
import { CustomStylesInventory } from "./Inventory-Cells/custome-style";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import useSearchFn from "@/hooks/useSeach-Fn";
import { LoaderSkelton } from "./Inventory-Cells/Loader-Skelton";
import { handleExportExcel } from "./Inventory-Cells/xlsx_downloader";
import { IProducts } from "@/types/productType";

// ✅ Use IProducts instead of generic T
interface Props {
  products: any[];
  loading: boolean;
  columns: TableColumn<any>[]; // Ensure columns are of type IProducts
  expandableRowsComponent?: React.FC<{ data: any }>;
  expandableRows?: boolean;
}

const InventoryDataTable = ({ products = [], loading, columns, expandableRowsComponent,expandableRows=true }: Props) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const { filteredData: filteredProducts, handleSearch } =
    useSearchFn<IProducts>(products);

  const handleRowExpand = (row: IProducts) => {
    setExpandedRow((prev) => (prev === String(row._id) ? null : String(row._id)));
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-end py-5">
        <div className="flex gap-4">
          <div className="ps-4">
            <Input
              type="search"
              placeholder="Search Product"
              className="text-xs w-[300px]"
              onChange={handleSearch}
            />
          </div>
          <Button
            onClick={() => handleExportExcel(products)}
            className="bg-green-600 text-white"
          >
            Export XLSX
          </Button>
        </div>
      </div>

      <div className="w-full overflow-auto">
        <DataTable
          columns={columns}
          data={filteredProducts}
          progressPending={loading}
          progressComponent={<LoaderSkelton />}
          highlightOnHover
          pointerOnHover
          customStyles={CustomStylesInventory}
          pagination
          responsive
          expandableRows={expandableRows}
          expandableRowExpanded={(row) => String(row._id) === expandedRow}
          onRowExpandToggled={(_, row) => handleRowExpand(row)}
          expandableRowsComponent={expandableRowsComponent}
        />
      </div>
    </div>
  );
};

export default InventoryDataTable;
