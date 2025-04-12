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
  _id?: string;
  name: string;
  parent: string;
  parentId: string | null;
  subcategories?: ICategory[];
  coverImage: string | null;
  iconImage: string | null;
  featured: boolean;
  published: boolean;
  isDeleted?: boolean;
  createdAt?:Date;
  updatedAt?: Date;
}
