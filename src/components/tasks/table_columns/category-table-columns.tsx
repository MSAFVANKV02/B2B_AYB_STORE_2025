"use client";

import { MySwitch } from "@/components/myUi/mySwitch";
import { ColumnDef } from "@tanstack/react-table";
import { ICategory } from "@/types/categorytypes";
import CategoryAddModal from "../table_actions/category_Actions";
import { CategoryToggle } from "@/actions/category/categoryAction";

// import { DataTableColumnHeader } from "../task_components/data-table-column-header";

export const CategoryColumnMain: ColumnDef<ICategory>[] = [
  {
    accessorKey: "numbers",
    // header: "Variants",
    // header: ({ column }) => (
    //   <DataTableColumnHeader column={column} title="Category Name" />
    // ),
    header: () => <div className="font-bold text-black max-w-32 ">#</div>,
    cell: ({ row }) => {
     
      return (
        <div>
        {row.index + 1}
      </div>
      );
    },
  },

  {
    accessorKey: "name",
    // header: "Variants",
    // header: ({ column }) => (
    //   <DataTableColumnHeader column={column} title="Category Name" />
    // ),
    header: () => <div className="font-bold text-black max-w-32 ">Main Category</div>,
    cell: ({ row }) => {
      const catName = row.original.name;
      return (
        <div>
         {catName}
        </div>
      );
    },
  },
  {
    accessorKey: "coverImage",
    // header: "Discount",
    header: () => <div className="font-bold text-black">Cover Img</div>,
    cell: ({ row }) => {
      return <div className="">
        <img src={row.original.coverImage||""} alt={row.original.name} className="w-[80px] h-[80px] object-cover rounded-md" />
      </div>;
    },
  },
  {
    accessorKey: "iconImage",
    // header: "Discount",
    header: () => <div className="font-bold text-black">Icon</div>,
    cell: ({ row }) => {
      return <div className="">
        <img src={row.original.iconImage||""} alt={row.original.name} className="w-[80px] h-[80px] object-cover rounded-md" />
      </div>;
    },
  },
  {
    accessorKey: "empty",
    // header: "Discount",
    header: () => <div className="font-bold text-black"></div>,
    cell: () => {
      return <div className="">
      </div>;
    },
  },
  {
    accessorKey: "featured",
    // header: "Today's Deal",
    header: () => <div className="font-bold text-black">Featured</div>,
    cell: ({ row }) => {

      const {toggleCategories} = CategoryToggle();
       
      return (
      <MySwitch
        isOn={row.original.featured}
        id={`is_Category_featured-${row.original._id}`}
        handleToggle={() => {
          console.log("toggled");
          toggleCategories("featured",row.original._id??"")
          //  row.original.featured =!row.original.featured;
        }}
      />
    )
    },
  },
  {
    accessorKey: "published",
    // header: "Today's Deal",
    header: () => <div className="font-bold text-black">Publish</div>,
    cell: ({ row }) => {
      const {toggleCategories} = CategoryToggle();
      return(
           <MySwitch
        isOn={row.original.published}
        id={`is_Category_published-${row.original._id}`}
        handleToggle={() => {
          console.log("toggled");
          toggleCategories("published",row.original._id??"")
        }}
      />
      )
   
    },
  },
 
  {
    accessorKey: "actions",
    // header: "Actions",
    header: () => <div className="font-bold text-black">Actions</div>,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="relative">
       <CategoryAddModal product={product} />

          {/* Add menu logic here */}
        </div>
      );
    },
  },
];


// =================================================================
export const CategoryColumnAll: ColumnDef<ICategory>[] = [
  {
    accessorKey: "numbers",
    // header: "Variants",
    // header: ({ column }) => (
    //   <DataTableColumnHeader column={column} title="Category Name" />
    // ),
    header: () => <div className="font-bold text-black max-w-32 ">#</div>,
    cell: ({ row }) => {
     
      return (
        <div>
        {row.index + 1}
      </div>
      );
    },
  },

  {
    accessorKey: "name",
    header: () => <div className="font-bold text-black max-w-32 ">All Categories</div>,
    cell: ({ row }) => {
      const catName = row.original.name;
      return (
        <div>
         {catName}
        </div>
      );
    },
  },
  {
    accessorKey: "parentId",
    header: () => <div className="font-bold text-black max-w-32 ">Parent Category</div>,
    cell: ({ row }) => {
      const catName = row.original.parent;
      return (
        <div>
         {catName}
        </div>
      );
    },
  },

  {
    accessorKey: "iconImage",
    // header: "Discount",
    header: () => <div className="font-bold text-black">Icon</div>,
    cell: ({ row }) => {
      return <div className="">
        <img src={row.original.iconImage || ""} alt={row.original.name} className="w-[80px] h-[80px] object-cover rounded-md" />
      </div>;
    },
  },
  {
    accessorKey: "empty",
    // header: "Discount",
    header: () => <div className="font-bold text-black"></div>,
    cell: () => {
      return <div className="">
      </div>;
    },
  },
  {
    accessorKey: "empty2",
    // header: "Discount",
    header: () => <div className="font-bold text-black"></div>,
    cell: () => {
      return <div className="">
      </div>;
    },
  },
  {
    accessorKey: "featured",
    // header: "Today's Deal",
    header: () => <div className="font-bold text-black">Featured</div>,
    cell: ({ row }) => {

      const {toggleCategories} = CategoryToggle();
       
      return (
      <MySwitch
        isOn={row.original.featured}
        id={`is_Category_featured-${row.original._id}`}
        handleToggle={() => {
          console.log("toggled");
          toggleCategories("featured",row.original._id??"")
          //  row.original.featured =!row.original.featured;
        }}
      />
    )
    },
  },
  {
    accessorKey: "published",
    // header: "Today's Deal",
    header: () => <div className="font-bold text-black">Publish</div>,
    cell: ({ row }) => {
      const {toggleCategories} = CategoryToggle();
      return(
           <MySwitch
        isOn={row.original.published}
        id={`is_Category_published-${row.original._id}`}
        handleToggle={() => {
          console.log("toggled");
          toggleCategories("published",row.original._id??"")
        }}
      />
      )
   
    },
  },
 
  {
    accessorKey: "actions",
    // header: "Actions",
    header: () => <div className="font-bold text-black">Actions</div>,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="relative">
          <CategoryAddModal product={product} />

          {/* Add menu logic here */}
        </div>
      );
    },
  },
];