import { UseModal } from "@/providers/context/context";
import ProductLayout, {
  ProductContent,
  ProductFooter,
  ProductHeader,
} from "./product-layout";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import GeneralSection from "./Page_Sections/GeneralSection-page";
import FilesMediaSectionPage from "./Page_Sections/FilesMeadiaSection-page";
import PriceStockSectionPage from "./Page_Sections/PriceStockSection-page";
import ShippingSectionPage from "./Page_Sections/ShippingSection-page";
import { Form, Formik } from "formik";
import { InitialValues } from "./initialValues";
import { getValidationSchema } from "./ProductSchema";

import AddProductsNavbar from "@/components/products/Add_Products_TaskBar";
import AyButton from "@/components/myUi/AyButton";
import { add_Product_Api, update_Product_Api } from "@/services/products/route";
// import { IProdAddRoot } from "@/types/add_Prod_Types";
import { makeToast, makeToastError } from "@/utils/toaster";
import { useQueryData } from "@/hooks/useQueryData";
import { getAllProductsInAdmin } from "@/actions/products/productActions";
import { IProducts } from "@/types/productType";
import { handleSetDummyData } from "./Page_Sections/add-dymmy-data";
import Loader from "@/components/global/loader";

const pageToStep: any = {
  general: 1,
  "files-media": 2,
  "price-stock": 3,
  shipping: 4,
};

export default function ProductAddPage() {
  const { id } = useParams();
  const { data: fetchedProducts, refetch } = useQueryData(
    ["edit-products"],
    () =>
      getAllProductsInAdmin([
        {
          key: "_id",
          value: `${id}`,
        },
      ]),
    !!id
  );

  const { data: product } = (fetchedProducts ?? {}) as {
    status?: number;
    data?: IProducts;
  };

  const editProduct = useMemo(() => {
    if (!product) return null;
    return Array.isArray(product) ? product[0] : product;
  }, [product]);

  // console.log(editProduct, "edit product");

  // const initialValues = useMemo(() => {
  //   return editProduct ? { ...InitialValues, ...editProduct } : InitialValues;
  // }, [editProduct]);
  const initialValues = useMemo(() => {
    if (!editProduct) return InitialValues;

    const relevantValues = {
      product_name: editProduct.product_name || InitialValues.product_name,
      mrp: editProduct.mrp || InitialValues.mrp,
      product_sku: editProduct.product_sku || InitialValues.product_sku,
      barcode: editProduct.barcode || InitialValues.barcode,
      brand: editProduct.brand || InitialValues.brand,
      categoryId: editProduct.categoryId || InitialValues.categoryId,
      keywords: editProduct.keywords || InitialValues.keywords,
      minimum_quantity:
        editProduct.minimum_quantity || InitialValues.minimum_quantity,
      product_weight:
        editProduct.product_weight || InitialValues.product_weight,
      product_dimensions: {
        product_height:
          editProduct.product_dimensions?.product_height ||
          InitialValues.product_dimensions.product_height,
        product_length:
          editProduct.product_dimensions?.product_length ||
          InitialValues.product_dimensions.product_length,
        product_width:
          editProduct.product_dimensions?.product_width ||
          InitialValues.product_dimensions.product_width,
      },
      tax_details: {
        hsn_sac_number:
          editProduct.tax_details?.hsn_sac_number ||
          InitialValues.tax_details.hsn_sac_number,
        non_gst_goods:
          editProduct.tax_details?.non_gst_goods ||
          InitialValues.tax_details.non_gst_goods,
        calculation_types:
          editProduct.tax_details?.calculation_types ||
          InitialValues.tax_details.calculation_types,
        on_items_rate_details:
          editProduct.tax_details?.on_items_rate_details ||
          InitialValues.tax_details.on_items_rate_details,
        isCess:
          editProduct.tax_details?.isCess || InitialValues.tax_details.isCess,
        igst: editProduct.tax_details?.igst || InitialValues.tax_details.igst,
      },
      is_featured_product:
        editProduct.is_featured_product ?? InitialValues.is_featured_product,
      is_todays_deal:
        editProduct.is_todays_deal ?? InitialValues.is_todays_deal,

      description: editProduct.description || InitialValues.description,
      special_features:
        editProduct.special_features || InitialValues.special_features,
      product_details:
        editProduct.product_details || InitialValues.product_details,
      care_guid: editProduct.care_guid || InitialValues.care_guid,

      gallery_image: editProduct.gallery_image || InitialValues.gallery_image,
      thumbnails: editProduct.thumbnails || InitialValues.thumbnails,
      size_chart: editProduct.size_chart || InitialValues.size_chart,
      basePrice: editProduct.basePrice || InitialValues.basePrice,
      samplePrice: editProduct.samplePrice || InitialValues.samplePrice,
      discount: editProduct.discount || InitialValues.discount,
      discount_type: editProduct.discount_type || InitialValues.discount_type,
      price_per_pieces:
        editProduct.price_per_pieces || InitialValues.price_per_pieces,
      selectWise: editProduct.selectWise || InitialValues.selectWise,
      variations: editProduct.variations || InitialValues.variations,
      is_cod: editProduct.is_cod ?? InitialValues.is_cod,
      is_free_shipping:
        editProduct.is_free_shipping ?? InitialValues.is_free_shipping,
      status: editProduct.status || InitialValues.status,
      bundle_details:
        editProduct.bundle_details || InitialValues.bundle_details,
    };

    return relevantValues;
  }, [editProduct]);

  const { search, pathname } = useLocation(); // Access current URL
  const navigate = useNavigate(); // For navigation
  const { selectedPage, setSelectedPage } = UseModal();
  const [currentStep, setCurrentStep] = useState(1);
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  //   ====== formik =========================
  const sectionRefs = {
    general: useRef<HTMLDivElement>(null),
    "files-media": useRef<HTMLDivElement>(null),
    "price-stock": useRef<HTMLDivElement>(null),
    shipping: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const currentPath = searchParams.get("q") || "general";
    setSelectedPage(currentPath);
    setCurrentStep(pageToStep[currentPath]);
  }, [searchParams, setSelectedPage]);

  //   ====== got to next step =================================
  const handleNextStep = () => {
    // setFormData((prevData) => ({ ...prevData, ...data }));
    if (currentStep === 4) {
      return;
    }
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    const nextPage: any = Object.keys(pageToStep).find(
      (key) => pageToStep[key] === nextStep
    );
    setSelectedPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`${pathname}?q=${nextPage}`);
  };

  const handlePrevStep = () => {
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    const prevPage: any = Object.keys(pageToStep).find(
      (key) => pageToStep[key] === prevStep
    );
    setSelectedPage(prevPage);
    navigate(`${pathname}?q=${prevPage}`);
  };

  const handleSaveComplete = () => {
    setCurrentStep(1); // Resetting the step
    setSelectedPage("general"); // Resetting to the first step/page
    navigate(`${pathname}?q=general`); // Redirect to the first page
  };

  //   ==== switch pages =======
  const renderPageComponent = (
    setFieldValue: any,
    values: any,
    errors: any
  ) => {
    console.log(values);

    switch (selectedPage || "general") {
      case "general":
        return (
          <div className="" ref={sectionRefs.general}>
            <GeneralSection
              setFieldValue={setFieldValue}
              values={values}
              errors={errors}
            />
          </div>
        );
      case "files-media":
        return (
          <div ref={sectionRefs["files-media"]}>
            <FilesMediaSectionPage
              setFieldValue={setFieldValue}
              values={values}
              errors={errors}
            />
          </div>
        );
      case "price-stock":
        return (
          <div ref={sectionRefs["price-stock"]}>
            <PriceStockSectionPage
              setFieldValue={setFieldValue}
              values={values}
              errors={errors}
            />
          </div>
        );
      case "shipping":
        return (
          <div ref={sectionRefs.shipping}>
            <ShippingSectionPage
              setFieldValue={setFieldValue}
              values={values}
              errors={errors}
              sectionRefs={sectionRefs}
            />
          </div>
        );
      default:
        return null;
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <ProductLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={getValidationSchema(currentStep)}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          console.log("submit", values);
          if (currentStep !== 4) {
            return handleNextStep();
          }
          try {
            // const route = id
            //   ? update_Product_Api(values, id)
            //   : add_Product_Api(values);
            const productPayload = {
              ...values,
              ...(values.selectWise === "bundle" ? {} : { bundle_details: [] }),
            };

            const route = id
              ? update_Product_Api(productPayload, id)
              : add_Product_Api(productPayload);
            const response = await route;
            // console.log(response, "response product add");

            if (response.status === 200 || response.status === 201) {
              makeToast(response.data.message ?? "Product Added Successfully");
              handleSaveComplete();
              if (id) {
                refetch();
              } else {
                resetForm();
              }
            }
          } catch (error: any) {
            // console.error("Product submission error:", error);
            if (error.response.data) {
              makeToastError(error.response.data.message);
            }
          }
        }}
      >
        {({ values, setFieldValue, errors, isSubmitting }) => (
          <Form>
            <ProductHeader className="flex-col w-full items-start gap-5">
              <AddProductsNavbar />
              <div className="text-lg font-bold capitalize px-4 w-full">
                {currentStep === 1 && (
                  <div className="flex justify-between w-full">
                    <h3>Product Information</h3>
                    {import.meta.env.MODE === "development" && (
                      <button
                        onClick={() => handleSetDummyData(setFieldValue)}
                        type="button"
                        className="text-xs underline underline-offset-4"
                      >
                        Add Dummy Product
                      </button>
                    )}
                  </div>
                )}
                {currentStep === 2 && "Product Files & Media"}
                {currentStep === 3 && "Product Price & Stock"}
                {currentStep === 4 && "Shipping Configuration"}
              </div>
            </ProductHeader>

            <ProductContent className="h-full px-4">
              {renderPageComponent(setFieldValue, values, errors)}
            </ProductContent>

            <ProductFooter>
              {/* <Button
                className={cn("bg-gray-300 hover:bg-gray-400 text-black", {
                  "opacity-50 cursor-not-allowed": currentStep === 1,
                })}
                type="button"
                disabled={currentStep === 1}
                onClick={handlePrevStep}
              >
                Prev
              </Button>
              <Button
                type="submit"
                variant={"b2bStyle"}
                className={cn(" text-white w-40", {
                  " ": currentStep === 4,
                })}
              >
                {currentStep === 4 ? "save Product" : " Next"}
              </Button> */}

              <AyButton
                type="button"
                disabled={currentStep === 1}
                onClick={handlePrevStep}
                title=""
                variant="cancel"
              >
                Prev
              </AyButton>
              {/* ------ */}
              <AyButton type="submit" title="" disabled={isSubmitting}>
                <Loader state={isSubmitting}>
                  {currentStep === 4
                    ? id
                      ? "Edit Product"
                      : "Save Product"
                    : "Next"}
                </Loader>
              </AyButton>
            </ProductFooter>
          </Form>
        )}
      </Formik>
    </ProductLayout>
  );
}
