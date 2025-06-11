// import CouponsTable from "@/components/marketing/Coupons_Table";
import AllCouponsCreateForm from "@/components/marketing/coupon_forms/All_Coupons_Create_Form";

import CouponsFormForWelcome from "@/components/marketing/coupon_forms/Coupons_Form_Wlcome";

import MyPageTab from "@/components/myUi/MyTabs";
import { CouponTableColumn } from "@/components/tasks/table_columns/marketing/Couon_table_columns";
import { DataTable } from "@/components/tasks/task_components/data-table";
import {
  DeleteSessionStorage,
  SessionStorageAllPaths,
} from "@/hooks/use-sessioStorage";
import { getCouponsRedux } from "@/redux/actions/coupon_slice";
import { dispatch, useAppSelector } from "@/redux/hook";

import { useEffect, useState } from "react";
import Select from "react-select";

type CouponOption = {
  value: string;
  label: string;
};

const couponOptions: CouponOption[] = [
  { value: "product", label: "Normal Type" },
  // { value: "store", label: "For Store" },
  // { value: "total_order", label: "For Total Order" },
  { value: "welcome_coupon", label: "Welcome Coupon" },
];

export default function CouponPage() {
  const [selectedCouponType, setSelectedCouponType] =
    useState<CouponOption | null>(null);
  const { coupons } = useAppSelector((state) => state.coupons);

  const handleCouponTypeChange = (selectedOption: CouponOption | null) => {
    setSelectedCouponType(selectedOption);
  };

  useEffect(() => {
    dispatch(getCouponsRedux());
  }, []);

  // const renderFormContent = () => {
  //   switch (selectedCouponType?.value) {
  //     case "product":
  //       return   <CouponsFormForProduct/>;
  //     case "store":
  //       return <CouponsFormForStore />;
  //     case "total_order":
  //       return <CouponsForm />;
  //     case "welcome_coupon":
  //       return <CouponsFormForWelcome />;
  //     default:
  //       return <p>Select a coupon type to start.</p>;
  //   }
  // };
  const renderFormContent = () => {
    switch (selectedCouponType?.value) {
      case "product":
        return <AllCouponsCreateForm />;
      case "welcome_coupon":
        return <CouponsFormForWelcome />;
      default:
        return <AllCouponsCreateForm />;
    }
  };

  const { coupon } = SessionStorageAllPaths();

  return (
    <div>
      <div className="font-bold text-sm p-4">
        <h1>All Coupon Information</h1>
      </div>
      <div className="min-h-screen dark:text-neutral-300 bg-white dark:bg-inherit rounded-md p-3 overflow-x-hidden">
        <MyPageTab
          tabs={[
            {
              title: "Coupon List",
              url: "/marketing/coupons",
              value: "coupons",
              onClick: () => {
                DeleteSessionStorage(coupon);
              },
              children: (
                <div className="max-w-screen-2xl mx-auto sm:mt-6">
                  <DataTable
                    enableSearch
                    searchWith="coupon_code"
                    data={coupons}
                    columns={CouponTableColumn}
                  />
                </div>
              ),
            },
            {
              title: "Create Coupon",
              url: "/marketing/coupons?type=create",
              value: "create",
              children: (
                <div className="max-w-screen-2xl mx-auto sm:mt-6">
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
                  <div className="mt-4">{renderFormContent()}</div>
                </div>
              ),
            },
          ]}
        />
      </div>
      {/* ===== */}

      {/* 
      
      ===== coupons adding from ===============================================================
      */}
    </div>
  );
}
