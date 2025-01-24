import TaskModal, {
  TaskModalContent,
  TaskModalFooter,
  TaskModalHeader,
} from "@/components/modals/TaskModal";
import AyButton from "@/components/myUi/AyButton";
import {
  CategoryColumnAll,
  CategoryColumnMain,
} from "@/components/tasks/table_columns/category-table-columns";
import { DataTable } from "@/components/tasks/task_components/data-table";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useModal } from "@/providers/context/context";
import { ErrorMessage, Form, Formik } from "formik";
import { useCallback, useMemo, useState } from "react";
import { FormFieldGenal } from "../add-new/Page_Sections/GeneralSection-page";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { SelectOption } from "@/types/productType";
import { Label } from "@/components/ui/label";
import { makeToastError } from "@/utils/toaster";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addCategory } from "@/redux/actions/category_Slice";

const animatedComponents = makeAnimated();

// const Category = [
//   {
//     _id: "1",
//     parent_category: "1234253675",
//     category_name: "Electronics",
//     coverImage: "img/products/Group 710.jpg",
//     icon: "img/products/image 61.png",
//     featured: true,
//     published: true,
//   },
//   {
//     _id: "2",
//     parent_category: null,
//     category_name: "Clothing",
//     coverImage: "img/products/Group 710.jpg",
//     icon: "img/products/image 61.png",
//     featured: false,
//     published: true,
//   },
// ];

const categorySchemaMain = Yup.object().shape({
  category_name: Yup.string().required("Category name is required"),
  parent_category: Yup.mixed()
    .nullable()
    .test(
      "is-valid-parent",
      "Parent category is required",
      (value) => value === null || typeof value === "string"
    ),
  coverImage: Yup.string().required("Cover image is required"),
  icon: Yup.string().required("category icon is required"),
});

const categorySchemaAll = Yup.object().shape({
  category_name: Yup.string().required("Category name is required"),
  // parent_category: Yup.mixed()
  //   .nullable()
  //   .required("Parent category is required"),
  // coverImage: Yup.string().required("Parent cover image is required"),
  icon: Yup.string().required("category icon is required"),
});

export default function CategoryPage() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.categories);
  const [isMain, setIsMain] = useState(true);
  const { setIsOpen , selectedCategory, setSelectedCategory} = useModal();
  const [selectedParent, setSelectedParent] = useState<SelectOption | null>(
    null
  );

  // console.log(selectedCategory);
  

  // const [coverImageFile, setCoverImageFile] = useState<File[]>([]);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [categoryIcon, setCategoryIcon] = useState<File | null>(null);

  const filterMainCat = useMemo(
    () => categories.filter((category) => category.parent_category === null),
    [categories]
  );
  // const filterSubCat = categories.filter(
  //   (category) => category.parent_category !== null
  // );

  const handleImageChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      setImageFile: React.Dispatch<React.SetStateAction<File | null>>,
      setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
      fieldName: string
    ) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const img = new window.Image(); // Use window.Image to access the native Image constructor
  
        img.src = URL.createObjectURL(file);
  
        img.onload = () => {
          const { width, height } = img;
  
          // Validate if dimensions are 256x256 @1x or 512x512 @2x
          if (
            (width === 256 && height === 256) ||
            (width === 512 && height === 512) ||
            (width < 256 && height < 256)
          ) {
            setImageFile(file);
            setFieldValue(fieldName, file);
          } else {
            makeToastError("Image must be 256x256 @1x, or smaller");
          }
        };
  
        img.onerror = () => {
          makeToastError("Failed to load image. Please try again.");
        };
      }
    },
    []
  );

  const categoryOptions = useMemo(
    () => [
      { _id: "none", name: "No Parent" },
      ...categories.map((cat) => ({
        _id: cat._id,
        name: cat.category_name,
      })),
    ],
    [categories]
  );

  return (
    <div>
      <div className="p-3">
        <h1 className="font-bold">Category Page</h1>
      </div>
      <div className="min-h-screen bg-white rounded-md shadow-sm p-5">
        <Tabs defaultValue="main" className="w-full">
          <div className="flex justify-between">
            <TabsList className="border bg-transparent rounded-full py-7 ">
              <TabsTrigger
                value="main"
                className="data-[state=active]:bg-bg w-32 py-3 data-[state=active]:text-white data-[state=active]:rounded-full"
                onClick={() => {
                  setIsMain(true);
                }}
              >
                Main
              </TabsTrigger>
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-bg w-32 py-3 data-[state=active]:text-white data-[state=active]:rounded-full"
                onClick={() => {
                  setIsMain(false);
                }}
              >
                All
              </TabsTrigger>
            </TabsList>
            {/* ===== */}

            <AyButton
              title="+ Add New Category"
              sx={{
                width: "160px",
                height: "50px",
                borderRadius: "100px",
                py: "2px",
              }}
              onClick={() => {
                setIsOpen(true);
                setSelectedCategory(null);
              }}
            />
          </div>

          <TabsContent value="main">
            <DataTable
              enableSearch
              columns={CategoryColumnMain}
              data={filterMainCat}
              searchWith="category_Name"
              // statuses={statuses}

              enableStatus={false}
              enableView={false}
            />
          </TabsContent>
          <TabsContent value="all">
            <DataTable
              enableSearch
              columns={CategoryColumnAll}
              data={categories}
              searchWith="category_name"
              // statuses={statuses}

              enableStatus={false}
              enableView={false}
            />
          </TabsContent>
        </Tabs>

        {/* =========== category Modal ============ */}

        <TaskModal className="w-[45vw] p-8">
          <Formik
            enableReinitialize
            validationSchema={isMain ? categorySchemaMain : categorySchemaAll}
            initialValues={{
              category_name: selectedCategory ? selectedCategory.category_name :"",
              parent_category:selectedCategory ? selectedCategory.parent_category : null,
              coverImage:selectedCategory ? selectedCategory.coverImage : null,
              icon: selectedCategory ? selectedCategory.icon :null,
              featured: false,
              published: true,
              _id: "",
            }}
            onSubmit={(values, { resetForm }) => {
              // console.log("Updated Values:", values);

              // const newCategory = {
              //   ...values,
              //   coverImage: coverImageFile,
              //   icon: categoryIcon,
              // };
              dispatch(addCategory(values));
              resetForm();
              setIsOpen(false);
              setSelectedParent(null);
              setCoverImageFile(null);
              setCategoryIcon(null);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="flex flex-col justify-between h-full">
                <TaskModalHeader>
                  <h3>Add New Category</h3>
                </TaskModalHeader>
                <TaskModalContent className="space-y-7 ">
                  <div className="flex justify-between w-full">
                    <FormFieldGenal
                      id="category_name"
                      name="category_name"
                      value={values.category_name}
                      fieldAs={Input}
                      title="Name"
                      placeholder="Category Name"
                      className="w-full "
                    />
                  </div>

                  {/* ======  Starting Parent Category ===== */}
                  <div className=" flex justify-between gap-1 items-center">
                    <Label className="text-textGray">Parent Category</Label>
                    <div className="flex flex-col gap-3 w-3/4">
                      <Select
                        components={animatedComponents}
                        name="parent_category"
                        styles={{
                          control: (base: any) => ({
                            ...base,
                            borderColor: "#e3dfdf",
                            borderRadius: "8px",
                            padding: "5px",
                            fontSize: "0.8rem",
                            boxShadow: "none",
                            color: "#e3dfdf",
                            "&:hover": {
                              borderColor: "#1E40AF",
                            },
                          }),
                        }}
                        className="w-full text-xs"
                        value={
                          selectedParent
                            ? {
                                _id: selectedParent._id,
                                name: selectedParent.name,
                              }
                            : null
                        }
                        placeholder="Select Parent Category"
                        // options={Category.map((cat) => ({
                        //   _id: cat._id,
                        //   name: cat.category_name,
                        // }))}
                        options={categoryOptions}
                        getOptionLabel={(e: SelectOption) => e.name}
                        getOptionValue={(e: SelectOption) => e._id}
                        isMulti={false} // Single selection
                        onChange={(selected: SelectOption | null) => {
                          setSelectedParent(selected); // Update state with the selected option
                          console.log(values);

                          setFieldValue(
                            "parent_category",
                            selected && selected._id !== "none"
                              ? selected._id
                              : null
                          ); // Update Formik with the selected _id
                        }}
                      />

                      <ErrorMessage
                        name="parent_category"
                        component="span"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>

                  {/* ==== cover image starting ==== */}
                  {isMain && (
                    <div className="flex justify-between ">
                      <Label htmlFor="coverImage" className="text-textGray">
                        Cover Image
                      </Label>
                      <div className="flex flex-col w-3/4 gap-3">
                        <Label
                          htmlFor="coverImage"
                          className="w-full border h-12 rounded-md flex items-center cursor-pointer"
                        >
                          <div className="px-5 border-r h-full text-center flex items-center bg-gray-100">
                            Browse
                          </div>
                          <div className="px-5  h-full text-center flex items-center truncate whitespace-nowrap overflow-hidden">
                            {coverImageFile
                              ? coverImageFile.name
                              : " Choose File"}
                          </div>
                        </Label>
                        <ErrorMessage
                          name="coverImage"
                          component="span"
                          className="text-red-500 text-xs"
                        />
                        <Input
                          id="coverImage"
                          name="coverImage"
                          type="file"
                          accept="image/png, image/jpeg, image/jpg, image/webp"
                          onChange={(e) => {
                            // handleImageChange(e);
                            if (e.target.files && e.target.files.length > 0) {
                              setFieldValue("coverImage", e.target.files[0]);
                              setCoverImageFile(e.target.files[0]);
                            }
                          }}
                          className="w-full hidden"
                          placeholder="Cover Image URL"
                        />
                        {/* ===== selected cover image */}
                        {coverImageFile && (
                          <div className="relative w-20 h-20  border rounded-md overflow-hidden">
                            <img
                              src={URL.createObjectURL(coverImageFile)}
                              alt="Selected"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              className="absolute top-1 right-1 text-red-400"
                              onClick={() => {
                                setCoverImageFile(null); // Clear preview
                                setFieldValue("coverImage", null); // Clear Formik field
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ==== Icon image starting ==== */}
                  <div className="flex justify-between ">
                    <Label htmlFor="icon" className="text-textGray">
                      Icon Image
                    </Label>
                    <div className="flex flex-col w-3/4 gap-3">
                      <Label
                        htmlFor="icon"
                        className="w-full border h-12 rounded-md flex items-center cursor-pointer"
                      >
                        <div className="px-5 border-r h-full text-center flex items-center bg-gray-100">
                          Browse
                        </div>
                        <div className="px-5  h-full text-center flex items-center truncate whitespace-nowrap overflow-hidden">
                          {categoryIcon ? categoryIcon.name : " Choose File"}
                        </div>
                      </Label>
                      <ErrorMessage
                        name="icon"
                        component="span"
                        className="text-red-500 text-xs"
                      />
                      <Input
                        id="icon"
                        name="icon"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        onChange={(event) =>
                          handleImageChange(
                            event,
                            setCategoryIcon,
                            setFieldValue,
                            "icon"
                          )
                        }
                        className="w-full hidden"
                        placeholder="Cover Image URL"
                      />
                      {/* ===== selected cover image */}
                      {categoryIcon && (
                        <div className="relative w-20 h-20 border rounded-md overflow-hidden">
                          <img
                            src={URL.createObjectURL(categoryIcon)}
                            alt="Selected"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 text-red-400"
                            onClick={() => {
                              setCategoryIcon(null); // Clear preview
                              setFieldValue("icon", null); // Clear Formik field
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </TaskModalContent>
                <TaskModalFooter>
                  <AyButton title="Save" type="submit" />
                </TaskModalFooter>
              </Form>
            )}
          </Formik>
        </TaskModal>
      </div>
    </div>
  );
}
