import MyPageTab from "../myUi/MyTabs";
import BrandApprovedTable from "./Brand_Approved_Table";
import BrandRequestedTable from "./Brand_Requested_Table";
import { IBrand } from "@/types/brandtypes";

type Props = {
  brands: IBrand[];
};

export default function BrandTable({ brands }: Props) {
  const filterApprovedBrands = brands.filter((brand) => {
    return brand.status === "approved";
  });

  const filterRequestedBrands = brands.filter((brand) => {
    return brand.status === "pending";
  });

  const filterRejectedBrands = brands.filter((brand) => {
    return brand.status === "rejected";
  });


  return (
    <div className="">
      <MyPageTab
        tabs={[
          {
            title: "Approved Brands",
            value: "approved",
            url: "/products/brand?type=approved",
            children: <BrandApprovedTable brands={filterApprovedBrands} />,
          },
          {
            title: "Requested Brand",
            value: "requested",
            url: "/products/brand?type=requested",
            children: <BrandRequestedTable brands={filterRequestedBrands} />,
          },
          {
            title: "Rejected Brand",
            value: "rejected",
            url: "/products/brand?type=rejected",
            children: <BrandRequestedTable brands={filterRejectedBrands} />,
          },
        ]}
      />
    </div>
  );
}
