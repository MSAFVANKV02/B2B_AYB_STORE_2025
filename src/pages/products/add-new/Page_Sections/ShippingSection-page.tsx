import { MySwitch } from "@/components/myUi/mySwitch";
import { Label } from "@/components/ui/label";
import { IProducts } from "@/types/productType";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  setFieldValue: any;
  values: IProducts;
  errors: any;
  sectionRefs: {
    general: React.RefObject<HTMLDivElement>;
    "files-media": React.RefObject<HTMLDivElement>;
    "price-stock": React.RefObject<HTMLDivElement>;
    shipping: React.RefObject<HTMLDivElement>;
  };
};

export default function ShippingSectionPage({
  values,
  setFieldValue,
  errors,
  sectionRefs
}: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  


  const errorToPage = {
    product_name: "general",
    mrp: "general",
    sku: "general",
    barcode: "general",
    brand: "general",
    keywords: "general",
    minimum_quantity: "general",
    product_weight: "general",
    height: "general",
    length: "general",
    width: "general",
    taxSlab: "general",
    status: "general",
    description: "general",
    isCess: "general",
    cess: "general",
    gallery_image: "files-media",
    thumbnails: "files-media",
    variations: "files-media",
    sizeImages: "files-media",
    basePrice: "price-stock",
    samplePrice: "price-stock",
    discount: "price-stock",
    discount_type: "price-stock",
    pricePerPieces: "price-stock",
    selectWise: "price-stock",
    store: "price-stock",
    shipping: "shipping",
    categoryId:"general"
  } as const;

  // Filter errors to get unresolved errors
  const unresolvedErrors = Object.keys(errors).filter((key): key is keyof typeof errorToPage =>
    key in errorToPage && !["is_cod", "is_free_shipping"].includes(key)
  );

  // Utility function to navigate to the error page
  // const navigateToErrorPage = (errorKey: keyof typeof errorToPage) => {
  //   const step = errorToPage[errorKey];
  //   if (step) {
  //     navigate(`${pathname}?q=${step}`);
  //   }
  // };
  const handleScrollToField = (errorKey: keyof typeof errorToPage) => {
    const step = errorToPage[errorKey]; // Get the step for the error
    if (step && sectionRefs[step]?.current) {
      sectionRefs[step].current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    navigate(`${pathname}?q=${step}`); // Update the query parameter
  };
  

  return (
    <div className="xl:min-h-[60vh] md:min-h-[55vh] sm:min-h-[40vh] min-h-[50vh]">
      <div className="flex flex-col gap-4 lg:w-[30%]">
        <div className="flex items-center justify-between">
          <Label htmlFor="is_cod" className="text-textGray">
            COD
          </Label>
          <MySwitch
            id="is_cod"
            isOn={values.is_cod}
            handleToggle={() => {
              setFieldValue("is_cod", !values.is_cod);
            }}
          />
        </div>
        {/* free shipping */}
        <div className="flex items-center justify-between">
          <Label htmlFor="is_free_shipping" className="text-textGray">
            Free Shipping
          </Label>
          <MySwitch
            id="is_free_shipping"
            isOn={values.is_free_shipping}
            handleToggle={() => {
              setFieldValue("is_free_shipping", !values.is_free_shipping);
            }}
          />
        </div>
      </div>

      {/* Error Display */}
      <div className="flex flex-col mt-5 items-center">
        {unresolvedErrors.length > 0 && (
          <div className="bg-red-100 text-red-600 p-4 text-sm rounded-md w-fit">
            <p className="font-bold">Unresolved Issues:</p>
            <p>Please resolve these errors in the corresponding steps.</p>
            <ul className="list-disc pl-6 space-y-1 mt-1">
              {unresolvedErrors.map((key) => (
                <li
                  key={key}
                  onClick={() => handleScrollToField(key)}
                  className="cursor-pointer underline text-red-600"
                >
                  {errors[key]}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
