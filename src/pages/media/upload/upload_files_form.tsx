import File_Size_Formatter from "@/components/myUi/File_Size_Formatter";
import MyPdf from "@/components/myUi/MyPdf";
import { makeToastError } from "@/utils/toaster";
import { Accept, useDropzone } from "react-dropzone";

type Props = {
  files: File[];
  setFieldValue: (field: string, value: any) => void;
};

export default function UploadFilesForm({ files, setFieldValue }: Props) {
  // const onDrop = (acceptedFiles: File[]) => {
  //   // Set the files selected by the user (either by drag & drop or file selection)
  //   setFieldValue("files", [...files, ...acceptedFiles]);
  // };

  // === new ondrop===
  const onDrop = (acceptedFiles: File[]) => {
    // Filter out files larger than 1MB before adding them
    const validFiles = acceptedFiles.filter(
      (file) => file.size <= 5 * 1024 * 1024
    );

    if (validFiles.length < acceptedFiles.length) {
      makeToastError("Each file must be smaller than 5MB.");
    }

    setFieldValue("files", [...files, ...validFiles]); // Append only valid files
  };

  // Use 'as const' to ensure the array is treated as a readonly array
  const acceptedFileTypes: Accept = {
    "application/pdf": [".pdf"],
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/webp": [".webp"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      ".xlsx",
    ],
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFileTypes, // Pass the readonly array to 'accept'
    multiple: true,
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Dropzone Area */}
      <div
        {...getRootProps()} // Applying root props to the dropzone div
        className="border-2 border-dashed cursor-pointer sm:w-1/2 w-full md:min-h-[400px] flex flex-col justify-center items-center mx-auto border-textMain shadow-xl p-8 text-center rounded-lg hover:bg-bgSoft transition-colors"
      >
        <input {...getInputProps()} />{" "}
        {/* Applying input props to the file input */}
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="48"
            height="48"
            className="text-textMain mb-4"
          >
            <path d="M12 2v12.2l4-4 1.5 1.5-7.5 7.5-7.5-7.5 1.5-1.5 4 4V2h3z" />
          </svg>
          <p className="text-sm text-gray-700">
            Drag & drop files here or{" "}
            <span className="text-blue-500 underline cursor-pointer">
              upload
            </span>
          </p>
        </div>
      </div>

      {/* File Preview */}
      {files.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-[500px] overflow-y-auto">
          <h4 className="text-xl text-gray-800 mb-2">Selected Files:</h4>
          <ul className="grid grid-cols-4 gap-3">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex justify-between rounded-md gap-3 items-center mb-2 border flex-col p-5"
              >
                {file.type.startsWith("image/") ? ( // Changed from 'image/*' check
                  <div className="w-1/2 h-36">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                ) : file.type === "application/pdf" ? (
                  <MyPdf value={URL.createObjectURL(file)} isPdfShown />
                ) : (
                  <div className="w-1/2 h-36 bg-gray-100 rounded-md flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                )}
                <span className="text-gray-700">{file.name}</span>
                <File_Size_Formatter size={file.size} />
                {/* <span className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </span> */}
                <button
                  type="button"
                  className="bg-red-500 text-white py-1 px-3 rounded-md text-xs hover:bg-red-600"
                  onClick={() =>
                    setFieldValue(
                      "files",
                      files.filter((_, i) => i !== index)
                    )
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
