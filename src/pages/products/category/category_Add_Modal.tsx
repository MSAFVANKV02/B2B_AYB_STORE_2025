import TaskModal, {
  TaskModalContent,
  TaskModalFooter,
  TaskModalHeader,
} from "@/components/modals/TaskModal";

import { v4 as uuidv4 } from "uuid";

import { getCategories } from "@/redux/actions/category_Slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ErrorMessage, Form, Formik } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useModal } from "@/providers/context/context";
import { useMemo, useState } from "react";
const animatedComponents = makeAnimated();

import { SelectOption } from "@/types/productType";
import OpenMediaDrawer from "@/components/myUi/OpenMediaDrawer";
import AyButton from "@/components/myUi/AyButton";
import { FormField } from "@/components/myUi/FormField";
import {
  create_Category_Api,
  update_Category_Api,
} from "@/services/category/route";
import { makeToast, makeToastError } from "@/utils/toaster";
import { categorySchemaAll, categorySchemaMain } from "./categoryShema";

type Props = {
  isMain: boolean;
};

const CategoryAddModal = ({ isMain }: Props) => {
  const [randomId] = useState(() => uuidv4().toString());

  const dispatch = useAppDispatch();
  const { setIsOpen, selectedCategory } = useModal();
  const categories = useAppSelector((state) => state.category.categories);

  const [selectedParent, setSelectedParent] = useState<SelectOption | null>(
    null
  );

  // console.log(categories, "categories");

  const categoryOptions = useMemo(
    () => [
      { _id: "none", name: "No Parent" },
      ...categories
        // .filter((cat) => cat.name !== cat.name)
        .map((cat) => ({
          _id: cat?._id ?? "", // Ensure _id is always a string
          name: cat.name,
        })),
    ],
    [categories]
  );

  // const getErrorMessage = (errors)=>{
  //   console.log(errors);

  // }

  return (
    <div>
      <TaskModal className="w-[45vw] p-8">
        {/* <div className="">{JSON.stringify(selectedCategory)}</div> */}
        <Formik
          enableReinitialize
          validationSchema={isMain ? categorySchemaMain : categorySchemaAll}
          initialValues={{
            name: selectedCategory ? selectedCategory.name : "",
            parentId: selectedCategory ? selectedCategory.parentId : null,
            coverImage: selectedCategory ? selectedCategory.coverImage : null,
            iconImage: selectedCategory ? selectedCategory.iconImage : null,
            featured: false,
            published: true,
            _id: randomId,
          }}
          onSubmit={async (values, { resetForm }) => {
            // console.log("Updated Values:", values);

            // const newCategory = {
            //   ...values,
            //   coverImage: coverImageFile,
            //   iconImage: categoryIcon,
            // };

            try {
              const route = selectedCategory
                ? update_Category_Api(
                    {
                      coverImage: values.coverImage,
                      iconImage: values.iconImage,
                      name: values.name,
                      parentId: values.parentId,
                    },
                    selectedCategory?._id ?? ""
                  )
                : create_Category_Api({
                    coverImage: values.coverImage,
                    iconImage: values.iconImage,
                    name: values.name,
                    parentId: values.parentId,
                  });

              const { data, status } = await route;

              // console.log(data,'data add cat');

              if (status === 201 || status === 200) {
                makeToast(`${data.message}`);
                // dispatch(addCategory(values));
                dispatch(getCategories());
                resetForm();
                setIsOpen(false);
                setSelectedParent(null);
              } else {
                makeToastError("Failed to create category.");
              }
            } catch (error: any) {
              if (error.response.data) {
                return makeToastError(error.response.data.message);
              } else {
                makeToastError("Failed to create category.");
              }
              console.error("Error creating category:", error);
              // makeToastError("Failed to create category.");
            }
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col justify-between h-full">
              <TaskModalHeader>
                <h3>Add New Category</h3>
              </TaskModalHeader>
              <TaskModalContent className="space-y-7 ">
                {/* {getErrorMessage(errors)} */}

                <div className="flex justify-between w-full">
                  <FormField
                    id="name"
                    name="name"
                    value={values.name}
                    fieldAs={Input}
                    title="Name"
                    placeholder="Category Name"
                    className="w-full "
                  />
                  {/* <FormFieldGenal
                    id="name"
                    name="name"
                    value={values.name}
                    fieldAs={Input}
                    title="Name"
                    placeholder="Category Name"
                    className="w-full "
                  /> */}
                </div>

                {/* ======  Starting Parent Category ===== */}
                <div className=" flex justify-between gap-1 items-center">
                  <Label className="text-textGray">Parent Category</Label>
                  <div className="flex flex-col gap-3 w-3/4">
                    <Select
                      components={animatedComponents}
                      name="parentId"
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
                          : selectedCategory
                          ? {
                              _id: selectedCategory?.parentId ?? "",
                              name: selectedCategory?.parent,
                            }
                          : null
                      }
                      placeholder="Select Parent Category"
                      // options={Category.map((cat) => ({
                      //   _id: cat._id,
                      //   name: cat.name,
                      // }))}
                      options={categoryOptions}
                      getOptionLabel={(e: SelectOption) => e.name}
                      getOptionValue={(e: SelectOption) => e._id}
                      isMulti={false} // Single selection
                      onChange={(selected: SelectOption | null) => {
                        setSelectedParent(selected); // Update state with the selected option
                        // console.log(selected);

                        setFieldValue(
                          "parentId",
                          selected && selected._id !== "none"
                            ? selected._id
                            : null
                        ); // Update Formik with the selected _id
                      }}
                    />

                    <ErrorMessage
                      name="parentId"
                      component="span"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>

                {/* ==== cover image starting ==== */}

                <OpenMediaDrawer
                  title="Cover Image"
                  className="gap-1 flex-row overflow-hidden"
                  values={values}
                  className2="lg:w-3/4"
                  name={"coverImage"}
                  mediaType="image"
                  handleFileChange={(event, fieldName) => {
                    const files = event;
                    if (!files) return;
                    const srcArray = files.map((file) => file.imageurl);
                    // console.log(srcArray,'srcArray');

                    setFieldValue(fieldName, srcArray[0]);
                  }}
                />

                {/* ==== Icon image starting ==== */}

                <OpenMediaDrawer
                  title="Icon Image"
                  className="gap-1 flex-row overflow-hidden"
                  values={values}
                  className2="lg:w-3/4"
                  name={"iconImage"}
                  mediaType="image"
                  handleFileChange={(event, fieldName) => {
                    const files = event;
                    if (!files) return;
                    const srcArray = files.map((file) => file.imageurl);
                    // console.log(srcArray,'srcArray');

                    setFieldValue(fieldName, srcArray[0]);
                  }}
                />
              </TaskModalContent>
              <TaskModalFooter>
                <AyButton
                  title={selectedCategory ? "Edit" : "Save"}
                  type="submit"
                />
              </TaskModalFooter>
            </Form>
          )}
        </Formik>
      </TaskModal>
    </div>
  );
};

export default CategoryAddModal;
