import Checkbox from "@/components/myUi/checkBox";
import { getCategoriesWithSub } from "@/redux/actions/category_Slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ICategory } from "@/types/categorytypes";
import { Collapse } from "@mui/material";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { GeneralFormValues } from "./GeneralSection-page";
import { Separator } from "@/components/ui/separator";
import { ErrorMessage } from "formik";

type Props = {
  setFieldValue: (name: string, value: any) => void;
  values: GeneralFormValues;
};

const CategorySelection = ({ setFieldValue, values }: Props) => {
  const categories = useAppSelector((state) => state.category.categories);
  //   console.log(JSON.stringify(categories));
  // console.log(categories);

  const dispatch = useAppDispatch();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});

  const categoryId = useMemo(() => {
    return typeof values.categoryId === "string" ? values.categoryId : values.categoryId?._id;
  }, [values.categoryId]);

  // Fetch categories on mount
  useEffect(() => {
    // if (categoryData.length > 0) {
    //   dispatch(setCategories(categoryData));
    // }
    dispatch(getCategoriesWithSub());
  }, []);

  // Handle category selection
  const handleCheckboxChange = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
    if (categoryId === id) {
      setFieldValue("categoryId", null); // Deselect category
    } else {
      setFieldValue("categoryId", id); // Select category
    }
  };

  // Toggle collapse
  const handleToggle = (id: string) => {
    setOpenRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  // console.log(values.categoryId,'values.categoryId');
  const findCategoryById = (
    categories: ICategory[],
    id: string
  ): ICategory | undefined => {
    for (const category of categories) {
      if (category._id === id) return category;
      if (category.subcategories && category.subcategories.length > 0) {
        const subCategory = findCategoryById(category.subcategories, id);
        if (subCategory) return subCategory;
      }
    }
    return undefined; // Return undefined if not found
  };

  // Find the selected category or subcategory based on values.categoryId
  const selectedCategory = findCategoryById(categories, categoryId ??"");

  // Recursive function to render categories
  const renderCategories = (categories: ICategory[], level = 0) => {
    // console.log(selectedId, "selectedId");

    return categories.map((category) => (
      <div key={category._id} className={`ml-${level * 4} text-sm`}>
        {/* Category checkbox and name */}
        <div className="  flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Checkbox
              size="small"
              color="ayaboo"
              label={category.name}
              checked={categoryId === category._id}
              onChange={() => handleCheckboxChange(category._id!)}
            />
            {/* <span className="cursor-pointer text-xs capitalize">
              {category.name}
            </span> */}
            {category.subcategories && category.subcategories.length > 0 && (
              <div
                className="cursor-pointer"
                onClick={() => handleToggle(category._id!)}
              >
                {openRows[category._id!] ? (
                  <ChevronDown className="w-4" />
                ) : (
                  <ChevronUp className="w-4" />
                )}
              </div>
            )}
          </div>

          {values.categoryId === category._id ? (
            <label className="radio-button">
              <input
                id={`option-${selectedId}`} // Use unique IDs for each input
                name="radio-group"
                type="radio"
                // checked
                checked={values.categoryId === category._id}
              />
              {values.categoryId === category._id && (
                <span className="radio-checkmark"></span>
              )}
            </label>
          ) : (
            <label className="radio-button">
              <input
                id={`option-${selectedId}`} // Use unique IDs for each input
                name="radio-group"
                type="radio"
              />
              <span className="radio-checkmark"></span>
            </label>
          )}

          {/* <div
            className={`w-2 h-2 rounded-full border ${
              selectedId === category._id ? "border-textMain" : ""
            }`}
          /> */}
        </div>

        {/* Recursive rendering of subcategories */}
        {category.subcategories && category.subcategories.length > 0 && (
          <Collapse in={!!openRows[category._id!]} timeout="auto" unmountOnExit>
            <div className="ml-2 mt-1">
              {renderCategories(category.subcategories, level + 1)}
            </div>
          </Collapse>
        )}
      </div>
    ));
  };

  return (
    <div>
      {/* <h2 className="font-bold mb-2">Product Category</h2> */}
      {/* {renderCategories(categories.filter((cat) => !cat.parentId))} */}
      {categories.some((cat) => !cat.parentId)
        ? renderCategories(categories.filter((cat) => !cat.parentId))
        : renderCategories(categories)}

      <ErrorMessage
        name={"categoryId"}
        component="span"
        className="text-red-500 text-xs"
      />
      {selectedCategory && (
        <div className="mt-4 text-sm flex flex-col gap-3">
          <span className="">Selected Category</span>
          <Separator />
          <span>{selectedCategory.name}</span>
        </div>
      )}
    </div>
  );
};

export default CategorySelection;
