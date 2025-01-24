import { useCallback, useEffect, useRef, useState } from "react";
import MultiSelect from "../myUi/MultiSelect";
import { SelectOption } from "@/types/productType";
import AyButton from "../myUi/AyButton";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  onClose: () => void; // Callback to close the component
  isOpen: boolean;
};

export default function BundleCreation({ onClose, isOpen }: Props) {
  const sizePickerRef = useRef<HTMLDivElement | null>(null);
  const [sizeOptions] = useState([
    { _id: "S", name: "S" },
    { _id: "M", name: "M" },
    { _id: "L", name: "L" },
  ]);
  const [selectedBundles, setSelectedBundles] = useState<
    { size: string; quantity: number }[]
  >([]);
  const [selectedSizes, setSelectedSizes] = useState<SelectOption[]>([]);
  const [bundleName, setBundleName] = useState("");
  const [error, setError] = useState("");

  // console.log(selectedSizes,'selectedSizes');
  // console.log(selectedBundles,'selectedBundles');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sizePickerRef.current &&
        !sizePickerRef.current.contains(event.target as Node)
      ) {
        onClose(); // Call the callback to close the component
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleQuantityChange = useCallback((size: string, quantity: number) => {
    setSelectedBundles((prev) =>
      prev.map((bundle) =>
        bundle.size === size ? { ...bundle, quantity } : bundle
      )
    );
  }, []);

  // === delete created bundles ===
  // const handleDeleteBundle = (size: string) => {
  //   setSelectedBundles((prev) => prev.filter((bundle) => bundle.size !== size));
  //   setSelectedSizes((prev) => prev.filter((option) => option.name !== size));
  // };
  const handleDeleteBundle = useCallback((size: string) => {
    setSelectedBundles((prev) => prev.filter((bundle) => bundle.size !== size));
    setSelectedSizes((prev) => prev.filter((option) => option.name !== size));
  }, []);

  const handleSave = useCallback(() => {
    if (bundleName === "") {
      return setError("Please create a name");
    }
    if (selectedBundles.length === 0) {
      return setError("Please select a size");
    }
    const dataToSave = {
      name: bundleName,
      bundles: selectedBundles,
    };
    console.log("Saved Data:", dataToSave);
    // Further save logic here
  }, [bundleName, selectedBundles]);
  return (
    <>
      {isOpen && (
        <div
          className="border w-[300px] min-h-[250px] h-auto rounded-lg flex gap-3 p-2 flex-col bg-gray-100"
          ref={sizePickerRef}
        >
          <p className="text-lg font-semibold">Create Bundle</p>
          <MultiSelect
            fieldName="sizes"
            selectedValue={selectedSizes}
            setSelectedValues={(_, value) => {
              setSelectedSizes(value);
              // Ensure selectedBundles sync with selectedSizes
              const newBundles = value.map((size) => ({
                size: size.name,
                quantity: 1, // Default quantity
              }));
              setSelectedBundles(newBundles);
            }}
            options={sizeOptions}
          />
          {/* Name Input */}
          <input
            type="text"
            value={bundleName}
            onChange={(e) => {
              setBundleName(e.target.value);
              setError("");
            }}
            placeholder="Enter bundle name"
            className="border rounded px-2 py-1 text-sm w-full"
          />

          {/* Quantity Selection Dropdown */}
          <div className="flex gap-2 flex-wrap justify- ">
            {selectedBundles.map(({ size, quantity }) => (
              <div key={size} className="flex items-center gap-2">
                <span className="text-sm font-medium">{size}:</span>
                <select
                  className="border rounded py-1 text-sm"
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(size, Number(e.target.value))
                  }
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((qty) => (
                    <option key={qty} value={qty}>
                      {qty}
                    </option>
                  ))}
                </select>

                <Icon
                  icon="material-symbols:delete"
                  color="red"
                  className="cursor-pointer"
                  onClick={() => handleDeleteBundle(size)}
                />
              </div>
            ))}
          </div>

          {error && <div className="m-auto text-red-500 text-sm">{error}</div>}

          <div className="flex justify-end mt-auto">
            <AyButton title="Save" onClick={handleSave} />
          </div>
        </div>
      )}
    </>
  );
}
