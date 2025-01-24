import { useModal } from "@/providers/context/context";
import TaskModal, {
  TaskModalContent,
  TaskModalHeader,
} from "../modals/TaskModal";
import BrandCreateSection from "@/pages/products/brand/brand_create_section";
import MyCloseIcon from "../icons/My_CloseIcon";
import MyEditIcon from "../icons/My_EditIcon";
import MyDeleteIcon from "../icons/My_DeleteIcon";

type Props = {
  brands: {
    id: number;
    name: string;
    logo: string; // Replace with actual image path
  }[];
};

export default function BrandApprovedTable({ brands }: Props) {
  const { setIsOpen } = useModal();
  return (
    <div className="overflow-x-auto rounded-lg border mt-5 h-[68vh] overflow-y-auto ">
      <table className="w-full border-collapse rounded-lg overflow-hidden">
        <thead className="text-left text-sm font-semibold">
          <tr>
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Brand</th>
            <th className="py-2 px-4">Logo</th>
            <th className="py-2 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {brands.map((brand, index) => (
            <tr
              key={brand.id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100 `}
            >
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{brand.name}</td>
              <td className="py-3 px-4 ">
                <img
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  className="w-20 h-20 object-contain"
                />
              </td>
              <td className="py-3 flex justify-end px-3">
                <MyEditIcon
                  onClick={() => {
                    setIsOpen(true);
                  }}
                />
                {/* ==== */}
                <MyDeleteIcon
                  onClick={() => {
                    // setIsOpen(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <TaskModal>
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
      </TaskModal>
    </div>
  );
}
