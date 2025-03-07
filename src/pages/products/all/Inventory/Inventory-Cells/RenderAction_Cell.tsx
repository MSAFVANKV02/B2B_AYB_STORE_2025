import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Icon } from "@iconify/react/dist/iconify.js";

import { useCallback, useEffect, useState } from "react";
import { IProducts, IProductStatus } from "@/types/productType";


import { dispatch, useAppSelector } from "@/redux/hook";
import { fetchSellerOrStoreDetails } from "@/redux/actions/storeSellerSlice";
import AyButton from "@/components/myUi/AyButton";
import Loader from "@/components/global/loader";

import MyDeleteIcon from "@/components/icons/My_DeleteIcon";
import { MoreVertical } from "lucide-react";
import MyCheckBox from "@/components/myUi/myCheckBox";
import MyEditIcon from "@/components/icons/My_EditIcon";
import { DeleteProductFn } from "@/actions/products/productActions";

import { useNavigate } from "react-router-dom";
import { useSoftDeleteProduct, useUpdateProductStatus, useUpdateToggleWithStore } from "@/hooks/use-product-statusChange";
import My_Icon from "@/components/icons/My_Icon";

type IProps = {
  data: IProducts;
  refetch: any;
  isDarkMode: boolean;
};

export const ActionsCellRenderer = ({ data, refetch }: IProps) => {
  const { _id: productId } = data || {};
  const navigate = useNavigate()

// states ==
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedStores, setSelectedStore] = useState<string[]>([]);
  const [selectedField, setSelectedField] = useState<string>(
    "is_featured_product"
  );

  // callbacks ==
  const { onChangeNewStatus } = useUpdateProductStatus(productId ?? "");
  const { onChangeNewToggle, isPending } = useUpdateToggleWithStore(
    productId ?? "",refetch
  );
  const {  restoreDeletedProductFn } = DeleteProductFn();
  const {onSoftDelete}= useSoftDeleteProduct(refetch)


  // data ==
  const { storeSeller } = useAppSelector((state) => state.storeSeller);


  // const isOutOfStock = variations?.details?.some((variant: IVariantsDetails) => variant.stock <= 0) ?? false;

  // const onRemoveClick = useCallback(() => {
  //   api.applyTransaction({ remove: [node.data] });
  // }, [node, api]);

  const statusList = [
    { id: 1, value: "pending", label: "Pending", color: "#FF9F43" },
    { id: 2, value: "hold", label: "Hold", color: "#FFC107" },
    { id: 3, value: "approved", label: "Approved", color: "#4CAF50" },
    { id: 4, value: "rejected", label: "Rejected", color: "#F44336" },
  ];

  const openTaskModal = useCallback(() => {
    setDialogOpen(true);
    dispatch(fetchSellerOrStoreDetails("storeSeller"));
  }, []);

  const closeTaskModal = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleSelectStores = (storeId: string) => {
    setSelectedStore((prevStoreId) =>
      prevStoreId.includes(storeId)
        ? prevStoreId.filter((id) => id !== storeId)
        : [...prevStoreId, storeId]
    );
  };

  useEffect(() => {
    if (!data) return;
  
    const {
      non_featured_stores = [],
      non_published_stores = [],
      non_todays_deal_stores = [],
    } = data;
  
    let newSelectedStores: string[] = [];
  
    if (selectedField === "is_featured_product") {
      newSelectedStores = non_featured_stores
        .map((store) => store.store)
        .filter((storeId) =>
          !non_published_stores.map((store) => store.store).includes(storeId) // Ignore stores present in both
        );
    } else if (selectedField === "is_published") {
      newSelectedStores = non_published_stores
        .map((store) => store.store)
        .filter((storeId) =>
          !non_featured_stores.map((store) => store.store).includes(storeId) // Ignore stores present in both
        );
    } else if (selectedField === "is_todays_deal") {
      newSelectedStores = non_todays_deal_stores.map((store) => store.store);
    }
  
    setSelectedStore(newSelectedStores);
  }, [selectedField, data]);

  // console.log(data);
  if (!data) return null;

  return (
    <div className="flex justify-center items-center">
      {/* delete button */}

      {data.isDeleted ? (
        <My_Icon
          icon="mdi:restore"
          onClick={async() => {
            await restoreDeletedProductFn(productId ?? "");
            refetch();
          }}
        />
      ) : (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-md hover:bg-gray-100">
                <MoreVertical size={18} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-[250px] cursor-pointer"
            >
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  openTaskModal();
                  dispatch(fetchSellerOrStoreDetails("storeSeller"));
                  // openTaskModal(productId)
                }}
              >
                Change On Stores
              </DropdownMenuItem>

              {/* <DropdownMenuItem className="cursor-pointer" onClick={() => {}}>
                Duplicate
              </DropdownMenuItem> */}
              <ul>
                {statusList.map(({ id, value, label }) => (
                  <DropdownMenuItem
                    className="cursor-pointer flex justify-between"
                    key={id}
                    onClick={async () => {
                      await onChangeNewStatus(value as IProductStatus);
                      refetch();
                    }}
                  >
                    {label}
                    {value === data.status && <Icon icon="charm:tick-double" />}
                  </DropdownMenuItem>
                ))}
              </ul>
            </DropdownMenuContent>
          </DropdownMenu>
          <MyEditIcon onClick={() => {
            navigate(`/products/add-new/${productId}`);
          }} />
          <MyDeleteIcon
            onClick={async () => {
            //  await softDeleteProductFn({ productId: productId });
            await onSoftDelete(productId);

            //  refetch();
            }}
            color="red"
          />
        </>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Status Of A Store </DialogTitle>
            {/* <DialogDescription>{productId}</DialogDescription> */}
          </DialogHeader>
          <div className="">
            <ul className="flex flex-col gap-3">
              {storeSeller.map((store) => (
                <div className="flex gap-2">
                  <div className="">
                    {/* <Input type="checkbox" className="w-fit" 
               onChange={() => handleSelectStores(store._id ?? "")}
               /> */}
                    <MyCheckBox
                      key={store._id}
                      id={store._id ?? ""}
                      checked={selectedStores.includes(store?._id ?? "")}
                      onChange={() => handleSelectStores(store._id ?? "")}
                    />
                  </div>
                  <li
                    key={store._id}
                    //   onClick={() => handleSelectStores(store._id ?? "")}
                    className={`border p-3 w-full rounded-md text-sm cursor-pointer duration-300 transition-all transform ${
                      selectedStores.includes(store._id ?? "")
                        ? "bg-bgSoft text-black"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    {store.name}
                  </li>
                </div>
              ))}
            </ul>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="border p-2 text-sm rounded-md w-full"
            >
              <option value="is_featured_product">Featured</option>
              <option value="is_published">Publish</option>
              <option value="is_todays_deal">Todays Deals</option>
            </select>
            {/* === */}
            <AyButton
              title=""
              onClick={() => {
                onChangeNewToggle(selectedField, selectedStores);
                closeTaskModal();
              }}
            >
              <Loader state={isPending}>
                {selectedField === "is_published"
                  ? "Hide Store"
                  : "Feature Product"}
              </Loader>
            </AyButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
