export type IReviews = {
    _id?: string;
    product_name: string;
    customer: string;
    rating: number;
    review: string;
    image: string[];
    video?: string[];
    created_at?: Date;
  }
  

//   type Iimage = {
//     imageUrl: string;
//     profileUrl: string;
//   }