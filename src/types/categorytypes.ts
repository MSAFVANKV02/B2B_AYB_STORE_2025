// export type ICategory  = {
//     _id?: string;
//     category_name: string;
//     parent_category:string | null;
//     coverImage:string;
//     icon: string;
//     featured: boolean; 
//     published: boolean;
// }
export interface ICategory {
    category_name: string;
    parent_category: string | null;
    coverImage: string | null;
    icon: string | null;
    featured: boolean;
    published: boolean;
    _id: string;
  }
  