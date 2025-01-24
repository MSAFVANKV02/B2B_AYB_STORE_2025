// =================================================================
// =================================================================
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { makeToast, makeToastError } from "@/utils/toaster";
import ImageUploader from "@/components/web-setups/Image_Uploader";
import AyButton from "@/components/myUi/AyButton";
import FileInput from "@/components/myUi/FileInput";
import MyDeleteIcon from "@/components/icons/My_DeleteIcon";

type FormData = {
  home_slider_1: { imageUrl: File | string; imageLink: string }[];
  home_slider_2: { imageUrl: File | string; imageLink: string }[];
  home_slider_3: { imageUrl: File | string; imageLink: string }[];
  home_banner: { imageUrl: File | string; imageLink: string }[];
  kyc_slider: File[];
  login_page: File[];
};

export default function WebBannerForm() {
  const [loading, setLoading] = useState(false);
  const initialValues: FormData = {
    home_slider_1: [],
    home_slider_2: [],
    home_slider_3: [],
    home_banner: [],
    kyc_slider: [],
    login_page: [],
  };

  //   const handleNewImageUpload = (
  //     event: React.ChangeEvent<HTMLInputElement>,
  //     fieldName: keyof FormData,
  //     values: FormData,
  //     setFieldValue: (field: keyof FormData, value: any) => void
  //   ) => {
  //     const files = event.target.files;
  //     if (files) {
  //       const selectedFiles = Array.from(files);
  //       if (selectedFiles.length + values[fieldName].length > 4) {
  //         makeToastError("You can only select up to 4 images");
  //       } else {
  //         const newImages = selectedFiles.map((file) => ({
  //           imageUrl: file,
  //           imageLink: "https://ayaboo.com/",
  //         }));
  //         setFieldValue(fieldName, values[fieldName].concat(newImages));
  //       }
  //     }
  //   };

  const handleNewImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof FormData,
    values: FormData,
    setFieldValue: (field: keyof FormData, value: any) => void
  ) => {
    const files = event.target.files;
    if (files) {
      const selectedFiles = Array.from(files);
      if (
        fieldName === "home_banner" &&
        selectedFiles.length + values[fieldName].length > 2
      ) {
        makeToastError(
          "You can only select up to 2 images for the home banner"
        );
      } else if (selectedFiles.length + values[fieldName].length > 4) {
        makeToastError("You can only select up to 4 images for sliders");
      } else if (fieldName === "kyc_slider") {
        setFieldValue(fieldName, [...values.kyc_slider, ...selectedFiles]); // Allow multiple files for kyc_slider
      } else if (fieldName === "login_page") {
        setFieldValue(fieldName, [...values.login_page, ...selectedFiles]); // Allow multiple files for kyc_slider
      } else {
        const newImages = selectedFiles.map((file) => ({
          imageUrl: file,
          imageLink: "https://ayaboo.com/",
        }));
        setFieldValue(fieldName, values[fieldName].concat(newImages));
      }
    }
  };

  const handleImageLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    fieldName: keyof FormData,
    values: FormData,
    setFieldValue: (field: keyof FormData, value: any) => void
  ) => {
    const baseLink = "https://ayaboo.com/";
    let updatedValue = e.target.value;

    if (!updatedValue.startsWith(baseLink)) {
      updatedValue = baseLink;
    }
    if (fieldName !== "kyc_slider" && fieldName !== "login_page") {
      const updatedImages = [...values[fieldName]];
      updatedImages[index].imageLink = updatedValue;
      setFieldValue(fieldName, updatedImages);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          console.log(values);
          try {
            setLoading(true);
            // Simulate API request or any async action
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // On success
            makeToast("Form saved successfully!");
          } catch (error) {
            makeToastError("Failed to save form. Please try again.");
            console.log(error);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="">
            <div className="lg:max-w-2xl  space-y-4 shadow-sm p-4 border rounded-md">
              <ImageUploader
                label="Home Slider 1"
                fieldName="home_slider_1"
                images={values.home_slider_1}
                setFieldValue={setFieldValue}
                handleFileUpload={(e, fieldName) =>
                  handleNewImageUpload(
                    e,
                    fieldName as keyof FormData,
                    values,
                    setFieldValue
                  )
                }
                handleLinkChange={(e, index) =>
                  handleImageLinkChange(
                    e,
                    index,
                    "home_slider_1",
                    values,
                    setFieldValue
                  )
                }
              />

              {/* 2 */}
              <ImageUploader
                label="Home Slider 2"
                fieldName="home_slider_2"
                images={values.home_slider_2}
                setFieldValue={setFieldValue}
                handleFileUpload={(e, fieldName) =>
                  handleNewImageUpload(
                    e,
                    fieldName as keyof FormData,
                    values,
                    setFieldValue
                  )
                }
                handleLinkChange={(e, index) =>
                  handleImageLinkChange(
                    e,
                    index,
                    "home_slider_2",
                    values,
                    setFieldValue
                  )
                }
              />

              {/* 3. */}
              <ImageUploader
                label="Home Slider 3"
                fieldName="home_slider_3"
                images={values.home_slider_3}
                setFieldValue={setFieldValue}
                handleFileUpload={(e, fieldName) =>
                  handleNewImageUpload(
                    e,
                    fieldName as keyof FormData,
                    values,
                    setFieldValue
                  )
                }
                handleLinkChange={(e, index) =>
                  handleImageLinkChange(
                    e,
                    index,
                    "home_slider_3",
                    values,
                    setFieldValue
                  )
                }
              />

              {/* 4. */}
              <ImageUploader
                label="Home Banner"
                fieldName="home_banner"
                images={values.home_banner}
                setFieldValue={setFieldValue}
                handleFileUpload={(e, fieldName) =>
                  handleNewImageUpload(
                    e,
                    fieldName as keyof FormData,
                    values,
                    setFieldValue
                  )
                }
                handleLinkChange={(e, index) =>
                  handleImageLinkChange(
                    e,
                    index,
                    "home_banner",
                    values,
                    setFieldValue
                  )
                }
              />

              {/* 5 */}

              <div className="flex justify-between gap-4">
                <label className="text-sm text-textGray font-bold">
                  KYC Slider
                </label>
                <div className="lg:w-3/4 flex flex-col gap-3">
                  <FileInput
                    img="typcn:camera"
                    type="file"
                    className=""
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    id={"kyc_slider"}
                    name={"kyc_slider"}
                    multiple
                    onChange={(e) =>
                      handleNewImageUpload(
                        e,
                        "kyc_slider",
                        values,
                        setFieldValue
                      )
                    }
                  />

                  <div className="flex flex-wrap gap-4 mt-2">
                    {values.kyc_slider &&
                      values.kyc_slider.map((file, index) => (
                        <div key={index} className="relative w-16 h-16">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`KYC Slider ${index + 1}`}
                            className="w-full h-full object-cover border rounded"
                          />
                          <div className="absolute -right-4 -top-8">
                            <MyDeleteIcon
                              color="#EC922B"
                              onClick={() => {
                                const updatedImages = values.kyc_slider.filter(
                                  (_, i) => i !== index
                                );
                                setFieldValue("kyc_slider", updatedImages);
                              }}
                              icon="zondicons:close-solid"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* 6 */}
              <div className="flex justify-between gap-4">
                <label className="text-sm text-textGray font-bold">
                  Login Page
                </label>
                <div className="lg:w-3/4 flex flex-col gap-3">
                  <FileInput
                    img="typcn:camera"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    id="login_page"
                    name="login_page"
                    multiple
                    onChange={(e) =>
                      handleNewImageUpload(
                        e,
                        "login_page",
                        values,
                        setFieldValue
                      )
                    }
                  />

                  <div className="flex flex-wrap gap-4 mt-2">
                    {values.login_page &&
                      values.login_page.map((file, index) => {
                        const fileUrl =
                          typeof file === "string"
                            ? file
                            : URL.createObjectURL(file);

                        return (
                          <div key={index} className="relative w-16 h-16">
                            <img
                              src={fileUrl}
                              alt={`Login Page ${index + 1}`}
                              className="w-full h-full object-cover border rounded"
                            />
                            <div className="absolute -right-4 -top-8">
                              <MyDeleteIcon
                                color="#EC922B"
                                onClick={() => {
                                  const updatedImages =
                                    values.login_page.filter(
                                      (_, i) => i !== index
                                    );
                                  setFieldValue("login_page", updatedImages);
                                }}
                                icon="zondicons:close-solid"
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-10">
              <AyButton title="Save" type="submit" loading={loading} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
