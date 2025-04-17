


import { IBrand } from "@/types/brandtypes";
import { Icon } from "@iconify/react/dist/iconify.js";

import BrandDetailsModal from "./Brand_Details_Modal";
import MyEyeIcon from "../icons/My_EyeIcon";
import { dispatch } from "@/redux/hook";
import { setSelectedBrand } from "@/redux/actions/brandsSlice";
import { UseModal } from "@/providers/context/context";


type Props = {
  brands: IBrand[];
};

export default function BrandApprovedTable({ brands }: Props) {

  // const [openModalId, setOpenModalId] = useState<string | null>(null);
  // const {selectedBrand} = useAppSelector((state)=> state.brand)
  // const { hardDeleteSingleBrandFn, softDeleteBrandFn } = DeleteBrands();
  const {setIsOpen} = UseModal();





  return (
    <div className="overflow-x-auto rounded-lg border mt-5 h-[68vh] overflow-y-auto ">
      <table className="w-full border-collapse rounded-lg overflow-hidden">
        <thead className="text-left text-sm font-semibold">
          <tr>
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Brand</th>
            <th className="py-2 px-4">Created By</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Logo</th>
            <th className="py-2 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {brands.length === 0 ? (
            // Show a single row indicating no brands
            <tr className="text-center w-full">
              <td
                colSpan={4}
                className="py-10 border-b px-4 text-gray-500 text-sm"
              >
                No brands available
              </td>
            </tr>
          ) : (
            brands.map((brand, index) => (
              <tr
                key={brand._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 `}
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{brand.name}</td>
                <td className="py-3 px-4">{brand.createdBy}</td>
                <td className="py-3 px-4">{brand.status}</td>
                <td className="py-3 px-4 ">
                  {/* <img
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  className="w-20 h-20 object-contain"
                /> */}
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={`${brand.name} Logo`}
                      className="w-14 rounded-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement; // Type casting
                        target.src = "/img/logo/Logo_black.svg";
                      }}
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                      <Icon
                        icon="material-symbols:error-outline"
                        fontSize={20}
                      />
                    </div>
                  )}
                </td>
                <td className="py-3 flex justify-end px-3">
              
                <MyEyeIcon
                    onClick={() => {
                      dispatch(setSelectedBrand({ brand, mode: "view" }));
                      setIsOpen(true);
                      // Open brand details modal
                    }}
                  />

                  {/* ==== */}
                  {/* <Modal
                    open={openModalId === brand._id}
                    setOpen={(value) =>
                      setOpenModalId(value ? brand._id : null)
                    }
                    title="Are You Sure To Delete"
                    description="Delete Permanently or move to bin"
                    trigger={
                      <div>
                        <MyDeleteIcon
                          onClick={() => {
                            // handleDelete()
                            setOpenModalId(brand._id);
                          }}
                        />
                      </div>
                    }
                    footer={
                      <div className="flex justify-end gap-3">
                        <AyButton
                          variant="cancel"
                          title="Move to bin"
                          onClick={async () => {
                            const response = await softDeleteBrandFn(
                              brand._id ?? ""
                            );
                            if (
                              response?.status === 200 ||
                              response?.status === 201
                            ) {
                              setOpenModalId(null); // Close modal after success
                            }
                          }}
                        />
                        <AyButton
                          title="Delete Permanently"
                          variant="delete"
                          onClick={async () => {
                            const response = await hardDeleteSingleBrandFn(
                              brand._id ?? ""
                            );
                            if (
                              response?.status === 200 ||
                              response?.status === 201
                            ) {
                              setOpenModalId(null); // Close modal after success
                            }
                          }}
                        />
                      </div>
                    }
                  /> */}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

       {/* view details === */}
       <BrandDetailsModal/>

      {/* <TaskModal>
        <TaskModalHeader>
          <h5 className="font-bold capitalize">Brand Edit</h5>
          <MyCloseIcon
            onClick={() => {
              setIsOpen(false);
            }}
            isTooltip={false}
          />
        </TaskModalHeader>

        <TaskModalContent>
          <BrandCreateSection />
        </TaskModalContent>
      </TaskModal> */}
    </div>
  );
}
