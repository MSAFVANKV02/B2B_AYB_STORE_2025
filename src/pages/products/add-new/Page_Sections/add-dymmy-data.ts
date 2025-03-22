import { IProdAddRoot } from "@/types/add_Prod_Types";

const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandomString = (length: number) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
};

export const handleSetDummyData = (setFieldValue: any) => {
  const randomProductName = `Product-${getRandomNumber(1000, 9999)}`;
  const randomSku = generateRandomString(8);
  const randomBarcode = `BAR-${getRandomNumber(100000, 999999)}`;

  const randomImages = [
    "https://res.cloudinary.com/ddzwv1pc9/image/upload/v1740808968/media_uploads/fy2fbpvbt59f9awcgsdo.jpg",
    "https://res.cloudinary.com/ddzwv1pc9/image/upload/v1740808959/media_uploads/fmxezufhuwdfu5wpcpy0.jpg",
    "https://res.cloudinary.com/ddzwv1pc9/image/upload/v1740808968/media_uploads/fy2fbpvbt59f9awcgsdo.jpg",
    "https://res.cloudinary.com/ddzwv1pc9/image/upload/v1740808963/media_uploads/ffuaqqdczbsxlupqrxl0.jpg"
  ]

  const getRandomImages = (count: number) => {
    return [...randomImages].sort(() => 0.5 - Math.random()).slice(0, count);
  };

  const dummyData:Partial<IProdAddRoot> = {
    product_name: `AYABOO-${randomProductName}`,
    product_weight:43,
    mrp:getRandomNumber(100, 500),
    basePrice:getRandomNumber(100, 500),
    discount: getRandomNumber(1, 10),
    minimum_quantity:2,
    samplePrice:getRandomNumber(100, 500),
    product_sku: randomSku,
    barcode: randomBarcode,
    brand: "67bd4f75863c41729f912958",
    categoryId: "67bd3f8e82893b7ed5cba1f1",
    keywords: ["ayaboo", "dummy"],
    product_owner: "inhouse",
    product_dimensions: {
      product_height: 333,
      product_length: 33,
      product_width: 123,
    },
    tax_details: {
      hsn_sac_number: 1242,
      non_gst_goods: "no",
      calculation_types: "on_value",
      igst: "23",
      central_tax: 11.5,
      state_tax: 11.5,
      on_items_rate_details: [
        {
          greaterThan: 0,
          upto: 0,
          igst: 0,
          cgst: 0,
          sgst: 0,
          cess: 0,
        },
      ],
      isCess: false,
    },
    is_published: false,
    status: "",
    is_todays_deal: false,
    is_featured_product: false,
    description: "Sample description for testing",
    // gallery_image: [
    //   "https://res.cloudinary.com/ddzwv1pc9/image/upload/v1740809302/media_uploads/geawazyb6o5rb25w0fwl.jpg",
    // ],
    // thumbnails: [
    //   "https://res.cloudinary.com/ddzwv1pc9/image/upload/v1740809302/media_uploads/jqnhsgp6myddjsacmvnr.jpg",
    // ],
    gallery_image: getRandomImages(5), // Selects 5 random images
    thumbnails: getRandomImages(2),
    size_chart:
      "https://res.cloudinary.com/ddzwv1pc9/image/upload/v1740810293/media_uploads/o4gnpiz14btphelqnfuh.png",
    discount_type: "percentage",
    price_per_pieces: [
      {
        minPiece: 10,
        discount: 10,
        maxPiece: 100,
      },
    ],
    selectWise: "size",
    variations: [
      {
        image: getRandomImages(1)[0],
        colorCode: "#FF5733",
        colorName: "Red",
        details: [
          {
            size: "S",
            stock: getRandomNumber(1, 500),
            discount: getRandomNumber(1, 10),
            selling_price: getRandomNumber(100, 500),
            skuId: `Red-${generateRandomString(4)}`,
            bundleQuantity: 0,
          },
          {
            size: "M",
            stock: getRandomNumber(1, 500),
            discount: getRandomNumber(1, 10),
            selling_price: getRandomNumber(100, 500),
            skuId: `Red-${generateRandomString(4)}`,
            bundleQuantity: 0,
          },
        ],
        sample: false,
      },
      {
        image: getRandomImages(1)[0],
        colorCode: "#3357FF",
        colorName: "Blue",
        details: [
          {
            size: "S",
            stock: getRandomNumber(1, 500),
            discount: getRandomNumber(1, 10),
            selling_price: getRandomNumber(100, 500),
            skuId: `BLUE-${generateRandomString(4)}`,
            bundleQuantity: 0,
          },
          {
            size: "M",
            stock: getRandomNumber(1, 500),
            discount: getRandomNumber(1, 10),
            selling_price: getRandomNumber(100, 500),
            skuId: `BLUE-${generateRandomString(4)}`,
            bundleQuantity: 0,
          },
        ],
        sample: false,
      },
    ],
    is_cod: false,
    is_free_shipping: false,
  };

  // Loop through the dummy data and update form values
  // Object.keys(dummyData).forEach((key) => {
  //   setFieldValue(key, dummyData[key]);
  // });
  Object.keys(dummyData).forEach((key) => {
    setFieldValue(key as keyof IProdAddRoot, dummyData[key as keyof IProdAddRoot]);
  });

  // Object.entries(dummyData).forEach(([key, value]) => {
  //   setFieldValue(key as keyof IProdAddRoot, value);
  // });
  
  
};
