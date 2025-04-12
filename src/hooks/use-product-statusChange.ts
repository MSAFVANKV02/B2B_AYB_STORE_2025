import {
  changeProductStatus,
  changeProductToggle,
  DeleteProductFn,
} from "@/actions/products/productActions";
import { fetchProducts } from "@/redux/actions/product_Slice";
import { dispatch } from "@/redux/hook";
import { IProductStatus } from "@/types/productType";
import { useMutationData } from "./useMutationData";

export const useUpdateProductStatus = (productId: string) => {
  const { mutate } = useMutationData(
    ["change-status", productId], // Ensure unique mutation key per product
    (newStatus: IProductStatus) => changeProductStatus(productId, newStatus), // Pass newStatus
    "product-status",
    (data) => {
      if (data.status === 200 || data.status === 201) {
        dispatch(fetchProducts());
      }
      //
    }
  );

  const onChangeNewStatus = (newStatus: IProductStatus) => {
    mutate(newStatus); // Mutate with actual selected status
  };

  return { onChangeNewStatus };
};

export const useUpdateToggleWithStore = (productId: string, refetch: any) => {
  const { mutate, isPending } = useMutationData(
    ["change-toggle", productId], // Ensure unique mutation key per product
    ({ fieldName, storeIds }: { fieldName: string; storeIds: string[] }) =>
      changeProductToggle({ productId, fieldName, storeIds }), // Pass newStatus
    "product-toggle",
    (data) => {
      if (data.status === 200 || data.status === 201) {
        refetch();
      }
      //
    }
  );

  const onChangeNewToggle = (fieldName: string, storeIds: string[]) => {
    mutate({ fieldName, storeIds });
  };

  return { onChangeNewToggle, isPending };
};

// 3. soft delete mutation
export const useSoftDeleteProduct = (refetch: any) => {
  const { softDeleteProductFn } = DeleteProductFn();

  const { mutate, isPending } = useMutationData(
    ["softDeleteProduct"],
    ({ productId }: { productId: string }) =>
      softDeleteProductFn({ productId: productId }),
    "product-delete",
    (data) => {
      if (data.status === 200 || data.status === 201) {
        refetch();
      }
      //
    }
  );

  const onSoftDelete = (productId: string | undefined) => {
    mutate({ productId });
  };

  return { onSoftDelete, isPending };
};
