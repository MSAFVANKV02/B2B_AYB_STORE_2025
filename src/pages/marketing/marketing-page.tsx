// import CouponsTable from "@/components/marketing/Coupons_Table";
import CouponsForm from "@/components/marketing/coupon_forms/Coupons_Form";
import CouponsFormForProduct from "@/components/marketing/coupon_forms/Coupons_Form_Product";
import CouponsFormForStore from "@/components/marketing/coupon_forms/Coupons_Form_Store";
import CouponsFormForWelcome from "@/components/marketing/coupon_forms/Coupons_Form_Wlcome";

import AyButton from "@/components/myUi/AyButton";
import { CouponTableColumn } from "@/components/tasks/table_columns/marketing/Couon_table_columns";
import { DataTable } from "@/components/tasks/task_components/data-table";
import { ICoupon } from "@/types/types";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Select from 'react-select';

const coupons: ICoupon[] = [
  {
    id: "1",
    coupon_code: "DISCOUNT10",
    discount_type: "percentage",
    discount_amount: 10,
    minimum_purchase_amount: 50,
    start_date: new Date("2025-01-01"),
    expired_at: new Date("2025-12-31"),
    is_active: true,
    applicable_brand_id: ["brand1"],
    applicable_category_id: ["category1"],
    applicable_product_id: ["product1"],
    applicable_store_id: ["store1"],
    applicable_seller_id: ["seller1"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add more coupon objects here
];

type CouponOption = {
  value: string;
  label: string;
};

const couponOptions: CouponOption[] = [
  { value: "product", label: "For Product" },
  { value: "store", label: "For Store" },
  { value: "total_order", label: "For Total Order" },
  { value: "welcome_coupon", label: "Welcome Coupon" },
];


export default function MarketingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [view, setView] = useState(false);
  const [selectedCouponType, setSelectedCouponType] = useState<CouponOption | null>(null);

  const params = searchParams.get("add");

  const showCouponForm = (params: string) => {
    navigate(`/marketing/coupons?add=${params}`);
  };

  const handleCouponsPage = () => {
    navigate("/marketing/coupons", { replace: false }); // Navigate to the base route without query parameters
    setView(false);
  };

  const handleCouponTypeChange = (selectedOption: CouponOption | null) => {
    setSelectedCouponType(selectedOption);
  };
  

  useEffect(() => {
    if (params) {
      setView(true);
    } else {
      setView(false);
    }
  }, [searchParams, params]);

  const renderFormContent = () => {
    switch (selectedCouponType?.value) {
      case "product":
        return   <CouponsFormForProduct/>;
      case "store":
        return <CouponsFormForStore />;
      case "total_order":
        return <CouponsForm />;
      case "welcome_coupon":
        return <CouponsFormForWelcome />;
      default:
        return <p>Select a coupon type to start.</p>;
    }
  };

  return (
    <div>
      <div className="font-bold text-sm p-4">
        <h1>All Coupon Information</h1>
      </div>
      {/* ===== */}
      <div className="page-outer">
        <div className="flex justify-between mb-5">
          {view ? (
            <>
              <span className="text-sm font-bold capitalize">Add Coupon </span>

              <AyButton
                title="Show All Coupons"
                sx={{
                  borderRadius: "100px",
                  height: "50px",
                }}
                onClick={() => {
                  // Navigate to CouponsForm
                  // setIsOpen(true);
                  handleCouponsPage();
                }}
              />
            </>
          ) : (
            <>
              <span className="text-sm font-bold capitalize">Coupon List</span>
              <AyButton
                title="+ Add New Coupon"
                sx={{
                  borderRadius: "100px",
                  height: "50px",
                }}
                onClick={() => {
                  // Navigate to CouponsForm
                  // setIsOpen(true);
                  showCouponForm("coupon");
                }}
              />
            </>
          )}
        </div>
        {/* <CouponsTable /> */}

        {!view ? (
          <DataTable
            enableSearch
            searchWith="name"
            data={coupons}
            columns={CouponTableColumn}
          />
        ) : (
          <div className="max-w-screen-lg mx-auto ">
            <Select
              className="basic-single text-xs"
              classNamePrefix="select"
              isClearable
              isSearchable
              placeholder="Select Coupon Type"
              options={couponOptions}
              value={selectedCouponType}
              onChange={handleCouponTypeChange}
            />
             <div className="mt-4">
              {renderFormContent()}
            </div>
          
          </div>
         
        )}
      </div>

      {/* 
      
      ===== coupons adding from ===============================================================
      */}
    </div>
  );
}
