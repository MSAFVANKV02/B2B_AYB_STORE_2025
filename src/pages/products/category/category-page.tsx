import AyButton from "@/components/myUi/AyButton";
import {
  CategoryColumnAll,
  CategoryColumnMain,
} from "@/components/tasks/table_columns/category-table-columns";
import { DataTable } from "@/components/tasks/task_components/data-table";
import { UseModal } from "@/providers/context/context";
import { useEffect, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hook";



import {  getCategories } from "@/redux/actions/category_Slice";
import CategoryAddModal from "./category_Add_Modal";
import MyPageTab from "@/components/myUi/MyTabs";


export default function CategoryPage() {
  const categories = useAppSelector((state) => state.category.categories);
  const [isMain, setIsMain] = useState(true);
  const { setIsOpen, setSelectedCategory } = UseModal();
  const dispatch = useAppDispatch();

  const filterMainCat = useMemo(
    () => categories.filter((category) => category.parentId === null),
    [categories]
  );
  // const filterSubCat = categories.filter(
  //   (category) => category.parent_category !== null
  // );



  // const { data: categories1 } = useQueryData(['category-details'], getAllCategories);
  // console.log(categories1);
  
  // // Ensure categories1 is properly typed before destructuring
  // const {  data: categoryData = [] } = (categories1 ?? {}) as {
  //   status?: number;
  //   data?: ICategory[];
  // };

  // console.log(categoryData,'categoryData');
  
  
  
  
  useEffect(() => {
    // if (categoryData.length > 0) {
    //   dispatch(setCategories(categoryData));
    // }
    dispatch(getCategories())
  }, []);
  




  return (
    <div>
      <div className="p-3">
        <h1 className="font-bold">Category Page</h1>
      </div>
      <div className="min-h-screen bg-white rounded-md shadow-sm p-5">
        <MyPageTab
          tabs={[
            {
              value: "main",
              title: "Main",
              url: "/products/category?type=main",
              onClick: () => {
                setIsMain(true);
              },
              children: (
                <div>
                  <DataTable
                    enableSearch
                    columns={CategoryColumnMain}
                    data={filterMainCat}
                    searchWith="name"
                    // statuses={statuses}

                    enableStatus={false}
                    enableView={false}
                  />
                </div>
              ),
            },
            {
              value: "all",
              title: "All",
              url: "/products/category?type=all",
              onClick: () => {
                setIsMain(false);
              },
              children: (
                <div>
                  <DataTable
                    enableSearch
                    columns={CategoryColumnAll}
                    data={categories}
                    searchWith="name"
                    // statuses={statuses}

                    enableStatus={false}
                    enableView={false}
                  />
                </div>
              ),
            },
          ]}
          sideBtn={
            <div className="">
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
          }
        />

        {/* =========== category Modal ============ */}

        <CategoryAddModal 
        isMain={isMain}
        />
      </div>
    </div>
  );
}
