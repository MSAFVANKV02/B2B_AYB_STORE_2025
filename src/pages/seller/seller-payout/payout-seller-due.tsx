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

export default function PayoutSellerDue() {
  return (
    <div className="">
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
            <TableHead className="w-">Store name</TableHead>

            <TableHead className="text-right">Payment due</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Store 1</TableCell>

            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
