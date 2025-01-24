import BrandTable from "@/components/brand/Brand_Table";
import { Input } from "@/components/ui/input";
import BrandCreateSection from "./brand_create_section";


const brands = [
  {
    id: 1,
    name: "Brand Name",
    logo: "/img/logo/Logo_black.svg", // Replace with actual image path
    brand_cert_owner_name:"Safvan",
    user:"seller",
  },
  {
    id: 2,
    name: "Brand Name",
    logo: "/img/logo/Logo_black.svg", // Replace with actual image path
    brand_cert_owner_name:"Fayiz",
    user:"store",
  },
];


export default function BrandPage() {

  return (
    <div className="min-h-[80vh]">
      <div className="sm:w-1/2 w-full mb-3">
        <Input
          type="text"
          className="border-none outline-none sm:w-1/2 w-3/4 text-xs p-6 shadow-sm"
          placeholder="Search By Brand Name"
        />
        {/* ==== search option brand ===== */}
      </div>
      <div className="lg:h-[80vh] rounded-lg  flex justify-between gap-3 lg:flex-row flex-col">
        {/* Brand Table======= */}
        <div className="lg:w-[65%] w-full bg-white rounded-lg p-5 shadow ">
          <BrandTable brands={brands} />
        </div>
        {/* ===== brand creating section ======= */}
        <div className="flex-grow bg-white rounded-lg p-5 shadow overflow-y-auto">
          <BrandCreateSection />
        </div>
      </div>
    </div>
  );
}
