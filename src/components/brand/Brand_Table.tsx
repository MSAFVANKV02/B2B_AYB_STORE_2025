import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrandApprovedTable from "./Brand_Approved_Table";
import BrandRequestedTable from "./Brand_Requested_Table";
import { IBrand } from "@/types/brandtypes";
type Props = {
    brands: IBrand[]
};

export default function BrandTable({
    brands,
  
}: Props) {
    
  return (
    <Tabs defaultValue="approved" className="w-full">
      <TabsList className="border bg-transparent rounded-full py-6 ">
        <TabsTrigger
          value="approved"
          className="data-[state=active]:bg-bg text-xs w-32 py-3 data-[state=active]:text-white data-[state=active]:rounded-full"
          onClick={() => {}}
        >
         Approved Brands
        </TabsTrigger>
        <TabsTrigger
          value="requested"
          className="data-[state=active]:bg-bg text-xs w-32 py-3 data-[state=active]:text-white data-[state=active]:rounded-full"
          onClick={() => {}}
        >
          Brand Requests
        </TabsTrigger>
      </TabsList>
      <TabsContent value="approved">
        <BrandApprovedTable brands={brands} />
      </TabsContent>
      <TabsContent value="requested">
        <BrandRequestedTable brands={brands}/>
      </TabsContent>
    </Tabs>
  );
}
