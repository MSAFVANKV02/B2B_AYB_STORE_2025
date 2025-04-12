
import { getSizesRedux } from "@/redux/actions/size_color_Slice";
import { dispatch } from "@/redux/hook";
import { create_New_Size_Api } from "@/services/extra/route";
import { makeToast, makeToastError } from "@/utils/toaster";
import Button from "@mui/material/Button";

import { useEffect, useRef, useState } from "react";

type Props = {
  onClose: () => void; // Callback to close the component
  isOpen: boolean;
  handleSave?: () => void;
};

export default function AddNewSize({ onClose, isOpen }: Props) {
  const sizePickerRef = useRef<HTMLDivElement | null>(null);
  const [newSize, setNewSize] = useState("");

  const handleSaveNewColor = async () => {
    if (newSize.trim() === "") {
      makeToastError("Please add a Value");
      return;
    }
    try {
      const { status, data } = await create_New_Size_Api({
        name: newSize,
      });
      if (status === 201) {
        makeToast(data.message);
        dispatch(getSizesRedux());
        setNewSize("")
        // onClose()
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <>
      {isOpen && (
        <div
          className="  border rounded-lg flex gap-3 p-1 items-center bg-gray-100"
          ref={sizePickerRef}
        >
          <input
            type="text"
            placeholder="New Size"
            onChange={(e) => {
              setNewSize(e.target.value);
            }}
            className="border rounded-md px-4 w-[150px] py-2 h-10"
          />
          <Button
            type="button"
            onClick={handleSaveNewColor}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "5px",
              backgroundColor: "#5F08B1",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#450586",
              },
            }}
          >
            Save
          </Button>
        </div>
      )}
    </>
  );
}
