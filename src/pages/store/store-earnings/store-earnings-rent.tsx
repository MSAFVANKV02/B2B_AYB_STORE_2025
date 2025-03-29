import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function StoreEarningRent() {
  return (
    <div className="">
      <span className="text-sm font-bold capitalize p-2">Rent earning</span>
      <div className="w-full flex justify-end">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort" className="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-store">All Store</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/*  */}
      <Table>
        <TableCaption>A list of your Store Payments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-">Date</TableHead>

            <TableHead className="w-">Store name</TableHead>

            <TableHead className="text-right">Rent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableHead className="w-">Date</TableHead>

            <TableCell className="font-medium">Store 1</TableCell>

            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
