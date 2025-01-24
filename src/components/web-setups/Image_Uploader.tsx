import React from "react";
import FileInput from "@/components/myUi/FileInput";
import { Input } from "@/components/ui/input";
import MyDeleteIcon from "@/components/icons/My_DeleteIcon";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";

type ImageUploaderProps = {
  label: string;
  fieldName: string;
  images: { imageUrl: File | string; imageLink: string }[];
  setFieldValue: (field: string, value: any) => void;
  handleFileUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => void;
  handleLinkChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  fieldName,
  images,
  setFieldValue,
  handleFileUpload,
  handleLinkChange,
}) => {
  const selectedFileNames = images
    .map((img) => (typeof img.imageUrl === "string" ? "" : img.imageUrl.name))
    .filter((name) => name)
    .join(", ");

  return (
    <div className="flex lg:flex-row flex-col justify-between gap-4 ic">
      <Label
        htmlFor={fieldName}
        className="text-sm text-textGray font-bold capitalize"
      >
        {" "}
        {label}
      </Label>
      <div className="lg:w-3/4 w-full flex flex-col gap-3">
        <FileInput
          img="typcn:camera"
          type="file"
          className=""
          accept="image/png, image/jpeg, image/jpg, image/webp"
          id={fieldName}
          name={fieldName}
          multiple
          selectedData={selectedFileNames}
          onChange={(e) => handleFileUpload(e, fieldName)}
        />
        <div className="flex flex-col gap-2">
          {images.map((imageObj, index) => (
            <div key={index} className="flex items-center gap-4 p-2 rounded">
              <div className="relative w-16 h-16">
                <Link
                  to={
                    typeof imageObj.imageUrl === "string"
                      ? imageObj.imageUrl
                      : URL.createObjectURL(imageObj.imageUrl)
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={
                      typeof imageObj.imageUrl === "string"
                        ? imageObj.imageUrl
                        : URL.createObjectURL(imageObj.imageUrl)
                    }
                    alt={`Slider ${index + 1}`}
                    className="w-full h-full object-cover border rounded-lg"
                  />
                </Link>

                <div className="absolute -right-4 -top-8">
                  <MyDeleteIcon
                    color="#EC922B"
                    onClick={() => {
                      const updatedImages = images.filter(
                        (_, i) => i !== index
                      );
                      setFieldValue(fieldName, updatedImages);
                    }}
                    icon="zondicons:close-solid"
                  />
                </div>
              </div>
              <Input
                placeholder="Enter image link"
                value={imageObj.imageLink}
                onChange={(e) => handleLinkChange(e, index)}
                className="flex-1"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
