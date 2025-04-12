import BrandTable from "@/components/brand/Brand_Table";
import { Input } from "@/components/ui/input";
import BrandCreateSection from "./brand_create_section";
import {  useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getAllBrands } from "@/redux/actions/brandsSlice";
import { IBrand } from "@/types/brandtypes";
import useSearchFn from "@/hooks/useSeach-Fn";
import { useSearchParams } from "react-router-dom";




export default function BrandPage() {
  const dispatch = useAppDispatch();
  const {brands} = useAppSelector((state)=> state.brand);
  const {currentAdmin} = useAppSelector((state)=> state.admin);

  const { filteredData: filteredBrands, handleSearch } = useSearchFn<IBrand>(brands);

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type")

  useEffect(() => {
    dispatch(getAllBrands({status:"",userId:currentAdmin?._id}));
  }, [dispatch,type]);
 

  return (
    <div className="min-h-[80vh]">
      <div className="sm:w-1/2 w-full mb-3">
        <Input
          type="search"
          className="border-none outline-none sm:w-1/2 w-3/4 text-xs p-6 shadow-sm"
          placeholder="Search By Brand Name"
          onChange={handleSearch}
        />
        {/* ==== search option brand ===== */}
      </div>
      <div className="lg:h-[80vh] rounded-lg  flex justify-between gap-3 lg:flex-row flex-col">
        {/* Brand Table======= */}
        <div className="lg:w-[65%] w-full bg-white rounded-lg p-5 shadow ">
          <BrandTable brands={filteredBrands} />
        </div>
        {/* ===== brand creating section ======= */}
        <div className="flex-grow bg-white rounded-lg p-5 shadow overflow-y-auto">
          <BrandCreateSection />
        </div>
      </div>
    </div>
  );
}
