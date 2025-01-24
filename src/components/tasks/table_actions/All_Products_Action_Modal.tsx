// import TaskModal, {
//   TaskModalContent,
//   TaskModalFooter,
  
// } from "@/components/modals/TaskModal";
// import { useModal } from "@/providers/context/context";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   //   DropdownMenuLabel,
//   //   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import { IProducts } from "@/types/productType";
// import useDownloadXl from "@/hooks/DownloadStockReport";
// import { IconButton } from "@mui/material";
// import { Form, Formik } from "formik";
// import AyButton from "@/components/myUi/AyButton";
// import { useEffect, useState } from "react";
// import ProductTableModalData from "./Product_Table_Modal";

// type Props = {
//   product: IProducts; // The product object to be passed to the modal
// };

// const InitialValues:IProducts = {
//   product_name: '',
//   mrp: 0,
//   product_sku: '',
//   barcode: '',
//   brand: '',
//   keywords: '',
//   minimum_quantity: 0,
//   product_weight: 0,
//   height: 0,
//   length: 0,
//   width:0,
//   dimensions: '',
//   taxSlab: [],
//   is_published:false,
//   status: "hold",
//   is_todays_deal: false,
//   is_featured_product:false,
//   description: '',
//   isCess: false,
//   cess: [],
//   // ===== File upload section =================
//   gallery_image: [],
//   thumbnails:[],
//   // productImages: [],
//   sizeImages: [],
//   // ===== price stock section =================

//   base_price:0,
//   sample_price:0,
//   discount:0,
//   discount_type:"",
//   pricePerPieces:[],
//   selectWise:"size",
//   store:"",
//   variations:[],

//   cod:false,
//   freeShipping:false,
  
// }

// export default function AllProductsActionModal({ product }: Props) {
//   const { openProductModal, selectedProducts } = useModal();
//   const [formData, setFormData] = useState<IProducts>(InitialValues);
//   const { downloadStockReport } = useDownloadXl();

//   useEffect(() => {
//     if (selectedProducts) {
//       setFormData((prevData) => ({
//         ...prevData, // Preserve existing default values
//         ...selectedProducts, // Override with selected product data
//       }));
//     }
//   }, [selectedProducts]); // Include `selectedProducts` as a dependency
  

//   return (
//     <div className="flex">
//       <IconButton>
//         <Icon
//           icon="fluent:open-20-regular"
//           onClick={() => openProductModal(product)}
//         />
//       </IconButton>

//       <DropdownMenu>
//         {/* ••• */}
//         <DropdownMenuTrigger>
//           <IconButton>
//             <Icon icon="mi:options-vertical" />
//           </IconButton>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="sm:mr-10">
//           {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
//           {/* <DropdownMenuSeparator /> */}
//           <DropdownMenuItem>Approve</DropdownMenuItem>
//           <DropdownMenuItem>Reject</DropdownMenuItem>
//           <DropdownMenuItem>Hold</DropdownMenuItem>
//           <DropdownMenuItem onClick={() => downloadStockReport([product])}>
//             Download Stock Report
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       {/* modal starts */}

//       <TaskModal className="w-[60vw]  ">
//         {/* <TaskModalHeader>Select Store</TaskModalHeader> */}
//         <Formik
//           initialValues={InitialValues}
//           onSubmit={() => {
//             console.log("form submitted");
//           }}
//         >
//           {({values, setFieldValue }) => (
//             <Form
//             className="flex flex-col justify-between h-full"
//             >
//               <TaskModalContent>
//                 <ProductTableModalData
//                   values={formData}
//                   setFieldValue={()=>{
//                     setFormData((prevData) => ({ ...prevData, ...formData }));
//                   }}
//                 />
//               </TaskModalContent>
//               <TaskModalFooter>
//                 <AyButton title="Save" />
//               </TaskModalFooter>
//             </Form>
//           )}
//         </Formik>
//       </TaskModal>
//     </div>
//   );
// }
import TaskModal, { TaskModalContent, TaskModalFooter } from "@/components/modals/TaskModal";
import { useModal } from "@/providers/context/context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { IProducts } from "@/types/productType";
import useDownloadXl from "@/hooks/DownloadStockReport";
import { IconButton } from "@mui/material";
import { Form, Formik } from "formik";
import AyButton from "@/components/myUi/AyButton";
import { useEffect, useState } from "react";
import ProductTableModalData from "../../products/All_Products_Modal/Product_Table_Modal";

type Props = {
  product: IProducts;
};

const InitialValues: IProducts = {
  product_name: '',
    mrp: 0,
    product_sku: '',
    barcode: '',
    brand: '',
    keywords: '',
    minimum_quantity: 0,
    product_weight: 0,
    product_owner:'admin',
    // height: 0,
    // length: 0,
    // width:0,
    product_dimensions: {
      product_height: 0,
      product_length: 0,
      product_width: 0,
    },
    // dimensions: '',
    tax_details:{
      taxSlab: [],
      isCess: false,
      cess: 0,
    },
// isCess: false,
//     cess: [],
//     taxSlab: [],
    is_published:false,
    status: "hold",
    is_todays_deal: false,
    is_featured_product:false,
    description: '',
    
    // ===== File upload section =================
    gallery_image: [],
    thumbnails:[],
    // productImages: [],
    sizeImages: [],
    // ===== price stock section =================

    base_price:0,
    sample_price:0,
    discount:0,
    discount_type:"percentage",
    price_per_pieces:[],
    selectWise:"size",
    store:"",
    variations:[],


    // ===== shipping section =================
    cod:false,
    freeShipping:false,
};

export default function AllProductsActionModal({ product }: Props) {
  const { openProductModal, selectedProducts } = useModal();
  const { downloadStockReport } = useDownloadXl();

  const [initialValues, setInitialValues] = useState<IProducts>(InitialValues);

  useEffect(() => {
    if (selectedProducts) {
      setInitialValues((prevData) => ({
        ...prevData,
        ...selectedProducts,
      }));
    }
  }, [selectedProducts]);

  return (
    <div className="flex">
      <IconButton>
        <Icon icon="fluent:open-20-regular" onClick={() => openProductModal(product)} />
      </IconButton>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconButton>
            <Icon icon="mi:options-vertical" />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Approve</DropdownMenuItem>
          <DropdownMenuItem>Reject</DropdownMenuItem>
          <DropdownMenuItem>Hold</DropdownMenuItem>
          <DropdownMenuItem onClick={() => downloadStockReport([product])}>
            Download Stock Report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TaskModal className="w-[60vw]">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log("Updated Values:", values);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col justify-between h-full">
              <TaskModalContent>
                <ProductTableModalData values={values} setFieldValue={setFieldValue} />
              </TaskModalContent>
              <TaskModalFooter>
                <AyButton title="Save" type="submit" />
              </TaskModalFooter>
            </Form>
          )}
        </Formik>
      </TaskModal>
    </div>
  );
}
