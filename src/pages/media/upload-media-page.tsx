import PagesLayout, {
  PageLayoutHeader,
  PagesLayoutContent,
} from "@/layouts/Pages_Layout";
import { ErrorMessage, Form, Formik } from "formik";
import UploadFilesForm from "./upload/upload_files_form";
import AyButton from "@/components/myUi/AyButton";
import useNavigateClicks from "@/hooks/useClicks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { makeToast, makeToastError } from "@/utils/toaster";
import { Label } from "@/components/ui/label";
import * as Yup from "yup";
import { Create_Media_Api } from "@/services/media/route";

// const fileValidationSchema = Yup.object().shape({
//   files: Yup.array()
//     .min(1, "Please select at least one file.") // Ensure at least one file is selected
//     .test("fileSize", "Each file must be smaller than 5MB", (files: any) => {
//       if (!files || files.length === 0) return false; // Ensure at least one file is present
//       return files.every((file: File) => file.size <= 5 * 1024 * 1024); // Check file size
//     }),
// });
const fileValidationSchema = Yup.object().shape({
  files: Yup.array()
    .min(1, "Please select at least one file.") // Ensure at least one file is selected
    .test("fileSize", "Each file must be smaller than 5MB", (files: any) => {
      if (!files || files.length === 0) return false; // Ensure at least one file is present
      return files.every((file: File) => file.size <= 5 * 1024 * 1024); // Check individual file size
    })
    .test(
      "totalSize",
      "Please upload less than 20MB at a time.",
      (files: any) => {
        if (!files || files.length === 0) return false;
        const totalSize = files.reduce(
          (acc: number, file: File) => acc + file.size,
          0
        );
        return totalSize <= 20 * 1024 * 1024; // Ensure total size ≤ 20MB
      }
    ),
});

export default function UploadMediaPage() {
  const { handleClick } = useNavigateClicks();
  return (
    <PagesLayout>
      <PageLayoutHeader>
        <h1>Upload Media</h1>

        <AyButton
          title="All Media"
          onClick={() => {
            handleClick("uploads");
          }}
        />
      </PageLayoutHeader>
      <PagesLayoutContent className="">
        {/* Add your page content here */}
        {/* Upload media page content goes here. */}
        <Formik
          validationSchema={fileValidationSchema}
          initialValues={{
            files: [],
            category: "all",
          }}
          onSubmit={async (values,{resetForm}) => {
            if (values.files.length === 0) {
              makeToastError("Please select at least one file.");
              return;
            }

            const formData = new FormData();
            values.files.forEach((file) => {
              formData.append("files", file); // Append each file
            });
            formData.append("category", values.category);

            try {
              const response = await Create_Media_Api(formData);
              if(response.status === 200) {
                makeToast(`${response.data.message || 'Media uploaded successfully.'}`);
                resetForm()
              }
              console.log("Upload response:", response);
              // alert("Files uploaded successfully!");
            } catch (error) {
              console.error("Upload failed", error);
              makeToastError("Failed to upload files.");
            }
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="space-y-6">
              <div className="flex gap-10 md:items-center">
                <Label>Select File Category :</Label>

                <Select
                  onValueChange={(value) => {
                    setFieldValue("category", value);
                  }}
                  value={values.category}
                >
                  <SelectTrigger className="min-w-[180px] w-fit">
                    <SelectValue placeholder="Type Of the Media" />
                  </SelectTrigger>
                  <SelectContent className="capitalize">
                    <SelectItem value="all">all</SelectItem>
                    <SelectItem value="products">Products</SelectItem>
                    <SelectItem value="category">category</SelectItem>
                    <SelectItem value="brand">brand</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <UploadFilesForm
                  files={values.files}
                  setFieldValue={setFieldValue}
                />
                <ErrorMessage
                  name="files"
                  component="span"
                  className="text-red-500 mx-auto my-5"
                />
              </div>

              <div className="flex w-full justify-center">
                <AyButton type="submit" title="Submit" loading={isSubmitting} />
              </div>
            </Form>
          )}
        </Formik>
        {/* <MediaFiles /> */}
      </PagesLayoutContent>
    </PagesLayout>
  );
}
