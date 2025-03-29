"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IReviews } from "@/types/reviewTypes";
import ReviewActionModal from "../table_actions/review_Action_Modal";
import { Icon } from "@iconify/react/dist/iconify.js";
import AvatarCircles from "@/components/ui/avatar-circles";

// import { DataTableColumnHeader } from "../task_components/data-table-column-header";

export const ProductReviewColumn: ColumnDef<IReviews>[] = [
  {
    accessorKey: "numbers",

    header: () => <div className="font-bold text-black max-w-32 ">#</div>,
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },

  {
    accessorKey: "product_name",
    header: () => <div className="font-bold text-black max-w-32 ">Product</div>,
    cell: ({ row }) => {
      const catName = row.original.product_name;
      return <div>{catName}</div>;
    },
  },
  {
    accessorKey: "image",
    // header: "Discount",
    header: () => <div className="font-bold text-black">Images</div>,
    cell: ({ row }) => {
        const image = row.original.image
      return (
        <div className="">
        {image ? (
          <div className="flex relative">
            <AvatarCircles
              numPeople={image.length}
              avatarUrls={image.map((img) => ({
                imageUrl: img,
                profileUrl: img,
              }))}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-14 h-14 bg-gray-100 rounded-sm">
            <Icon icon="tabler:camera-filled" />
          </div>
        )}
      </div>
      );
    },
  },
  {
    accessorKey: "video",
    // header: "Discount",
    header: () => <div className="font-bold text-black">videos</div>,
    cell: ({ row }) => {
        const videos = row.original.video

      return (
        <div className="">
        {videos && videos.length > 0 ? (
          <div className="flex relative">
            <AvatarCircles
              numPeople={videos.length}
              avatarUrls={videos.map((img) => ({
                imageUrl: img,
                profileUrl: "#",
              }))}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-14 h-14 bg-gray-100 rounded-sm">
            <Icon  icon="pepicons-pop:camera-off" />
          </div>
        )}
      </div>
      );
    },
  },
  {
    accessorKey: "review",
    header: () => <div className="font-bold text-black max-w-32 ">Product</div>,
    cell: ({ row }) => {
      const catName = row.original.review;
      return <div className="max-w-[500px]">{catName}</div>;
    },
  },
  //   {
  //     accessorKey: "featured",
  //     // header: "Today's Deal",
  //     header: () => <div className="font-bold text-black">Featured</div>,
  //     cell: ({ row }) => (
  //       <MySwitch
  //         isOn={row.original.featured}
  //         id="featured"
  //         handleToggle={() => {
  //           console.log("toggled");
  //            row.original.featured =!row.original.featured;
  //         }}
  //       />
  //     ),
  //   },
  //   {
  //     accessorKey: "published",
  //     // header: "Today's Deal",
  //     header: () => <div className="font-bold text-black">Featured</div>,
  //     cell: ({ row }) => (
  //       <MySwitch
  //         isOn={row.original.published}
  //         id=".published"
  //         handleToggle={() => {
  //           console.log("toggled");
  //            row.original.published =!row.original.published;
  //         }}
  //       />
  //     ),
  //   },

  {
    accessorKey: "actions",
    // header: "Actions",
    header: () => <div className="font-bold text-black"></div>,
    cell: () => {
      return (
        <div className="relative">
          <ReviewActionModal />

          {/* Add menu logic here */}
        </div>
      );
    },
  },
];
