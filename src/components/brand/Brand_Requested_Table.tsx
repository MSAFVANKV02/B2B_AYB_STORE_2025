import { useModal } from "@/providers/context/context";
import MyEyeIcon from "../icons/My_EyeIcon";
import TaskModal, {
  TaskModalContent,
  TaskModalHeader,
} from "../modals/TaskModal";
import MyCloseIcon from "../icons/My_CloseIcon";
import BrandAcceptionForm from "./Brand_Acception_Form";
import { IBrand } from "@/types/brandtypes";
import { useAppDispatch } from "@/redux/hook";
import { setSelectedBrand } from "@/redux/actions/brandsSlice";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  brands: IBrand[];
};

export default function BrandRequestedTable({ brands }: Props) {
  const dispatch = useAppDispatch();

  const { setIsOpen } = useModal();

  return (
    <div className="overflow-x-auto rounded-lg border mt-5 h-[68vh] overflow-y-auto ">
      <table className="w-full border-collapse rounded-lg overflow-hidden">
        <thead className="text-left text-sm font-semibold">
          <tr>
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Brand</th>
            <th className="py-2 px-4">Seller Name</th>
            <th className="py-2 px-4">Brand owner name</th>
            <th className="py-2 px-4">Logo</th>
            <th className="py-2 px-4 text-right"></th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {brands.length === 0 ? (
            // Show a single row indicating no brands
            <tr className="text-center">
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
                <td className="py-3 px-4">{brand.certificateOwnerName}</td>
                <td className="py-3 px-4">{brand.name}</td>

                <td className="py-3 px-4 ">
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
                <td className="py-3 px-4 flex justify-end">
                  <MyEyeIcon
                    onClick={() => {
                      dispatch(setSelectedBrand(brand));
                      setIsOpen(true);
                      // Open brand details modal
                    }}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <TaskModal className="p-7">
        <TaskModalHeader>
          <h5 className="font-bold capitalize">Brand request</h5>
          {/* Close Icon */}
          <MyCloseIcon
            onClick={() => {
              setIsOpen(false);
            }}
            isTooltip={false}
          />
        </TaskModalHeader>

        <TaskModalContent>
          {/* Brand Details */}
          <BrandAcceptionForm />
        </TaskModalContent>
      </TaskModal>
    </div>
  );
}
