import { ProductReviewColumn } from "@/components/tasks/table_columns/product-review-columns";
import { DataTable } from "@/components/tasks/task_components/data-table";
import { IReviews } from "@/types/reviewTypes";



const Reviews:IReviews[] = [
  {
    _id: "",
    product_name: "Product Name",
    customer: "Customer",
    rating: 4.2,
    review: "",
    image:["/img/products/image 79.png","/img/products/image 80.png","/img/products/image 81.png"],
    video:[],
  },
  {
    _id: "",
    product_name: "Product Name",
    customer: "Customer",
    rating: 4.5,
    review: "",
    image:["/img/products/image 79.png"],
    // image: [
    //   { imageUrl: "/img/products/image 79.png", profileUrl: "#" },
    //   { imageUrl: "/img/products/image 80.png", profileUrl: "#" },
    //   { imageUrl: "/img/products/image 81.png", profileUrl: "#" },
    // ],
    video:[],
  },
  {
    _id: "sdas",
    product_name: "Product Name",
    customer: "Customer",
    rating: 3.8,
    review: "Lorem ipsum dolor sit amet consectetur. Dignissim odio semper vel facilisis diam sit est turpis. Orci adipiscing neque lorem tristique enim elementum. ",
    image:["/img/products/image 79.png"],
    video:[],
  }
];

export default function ProductReviewPage() {
  return (
    <div>
      <div className=" p-4">
        <h1 className="font-bold">Product Reviews</h1>
      </div>
      <div className="page-outer">
        <DataTable
          enableSearch
          columns={ProductReviewColumn}
          data={Reviews}
          searchWith="product_name"
          // statuses={statuses}

          enableStatus={false}
          enableView={false}
        />
      </div>
    </div>
  );
}
