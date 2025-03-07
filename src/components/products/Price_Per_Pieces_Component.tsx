
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IPricePerPieces, IProducts } from "@/types/productType";
import { Icon } from "@iconify/react";
import { makeToastError } from "@/utils/toaster";

type Props = {
  pricePerPieces: IPricePerPieces[];
  setFieldValue: (field: string, value: any) => void;
  values: IProducts;
};

export default function PricePerPiecesComponent({
  pricePerPieces,
  setFieldValue,
  values
}: Props) {
  const handleAddField = () => {
    const newField = {
      minPiece: values.minimum_quantity ? values.minimum_quantity : 0,
      max_Piece: 0,
      discount: 0,
    };
    setFieldValue("price_per_pieces", [...pricePerPieces, newField]);
  };

  const handleRemoveField = (index: number) => {
    if (pricePerPieces.length === 1) {
      makeToastError("Cannot remove the first field.");
      return;
    }
    const updatedFields = pricePerPieces.filter((_, i) => i !== index);
    setFieldValue("price_per_pieces", updatedFields);
  };

  const handleChange = (
    index: number,
    field: keyof IPricePerPieces,
    value: number
  ) => {
    if (field === "minPiece" && values.minimum_quantity) {
      value = Math.max(value, values.minimum_quantity); // Prevent entering value lower than minimum_quantity
    }
    const updatedFields = pricePerPieces.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFieldValue("price_per_pieces", updatedFields);
  };

  return (
    <div className="border rounded-md ">
      <div className="p-2 border-b flex items-center">
        <span className="w-1/2 text-center">Piece Limit</span>
        <span className="w-1/2 text-center">Discount</span>
      </div>
      <div className="p-2">
        {pricePerPieces.map((field, index) => (
          <div key={index} className="flex items-center gap-4 mb-2">
            <div className="flex flex-col items-center">
              {index === 0 && <span className="span">min</span>}
              <Input
                type="number"
                className="w-[80px]"
                placeholder="Min"
                min={values.minimum_quantity ? values.minimum_quantity : 0}
                value={field.minPiece}
                onChange={(e) => handleChange(index, "minPiece", +e.target.value)}
              />
            </div>
            <span className="pt-3">-</span>
            <div className="flex flex-col items-center">
              {index === 0 && <span className="span">max</span>}
              <Input
                type="number"
                  className="w-[80px]"
                placeholder="Max"
                value={field.maxPiece}
                onChange={(e) => handleChange(index, "maxPiece", +e.target.value)}
              />
            </div>

            <span className="pt-3">=</span>
            <div className="flex flex-col items-center">
              {index === 0 && <span className="text-white select-none">discount</span>}
              <Input
                type="number"
                className="w-full"
                placeholder="Discount"
                value={field.discount}
                onChange={(e) => handleChange(index, "discount", +e.target.value)}
              />
            </div>
            <button onClick={() => handleRemoveField(index)}>
              <Icon icon="fluent:delete-24-regular" />
            </button>
          </div>
        ))}
      </div>
      <div className="p-2">
        <Button
          variant="outline"
          type="button"
          className="w-full border-dashed bg-gray-50 border-textMain"
          onClick={handleAddField}
        >
          Add New +
        </Button>
      </div>
    </div>
  );
}
