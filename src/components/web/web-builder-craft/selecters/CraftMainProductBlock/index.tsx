import { Element, useNode } from "@craftjs/core";
import React, { useRef } from "react";
import Slider from "react-slick";
import { Text } from "..";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CraftMainProductBlockSettings from "./CraftMainProductBlockSettings";
import { IFinalProductTypes } from "@/types/final-product-types";

export type CraftMainProductBlockProps = {
  selectedProducts?: IFinalProductTypes[];
};

const CraftMainProductBlock = ({
  selectedProducts = [],
}: CraftMainProductBlockProps) => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: selectedProducts.length > 2,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const {
    connectors: { connect },
  } = useNode();

  return (
    <div ref={(ref) => ref && connect(ref)} className="flex gap-2 w-full">
      {/* Left Block */}
      <div className="w-[150px] h-[150px] rounded-full overflow-hidden flex justify-center items-center">
        <div className="w-[70%] relative rounded-md h-full ml-3 flex justify-center mt-[70px] bg-gradient-to-b from-[#D4A7FF] to-[#5F08B1]">
          <div className="mt-[40%] h-6 text-xs text-white w-full text-center capitalize">
            <Element
              id="main-product-text"
              is={Text}
              canvas
              text="Main Products"
              fontSize="12"
              fontWeight="400"
              textAlign="center"
              color={{ r: 255, g: 255, b: 255, a: 1 }}
            />
          </div>
          <div className="bg-[#5F08B1] w-24 h-24 absolute -bottom-7 rounded-full -right-7" />
        </div>
      </div>

      {/* Right Block - Product Slider */}
      {/* Right Block - Product Slider */}
      <div className="flex-1 pt-8 min-h-[180px] overflow-auto">
        <Slider {...settings} ref={sliderRef} className="w-full h-auto ">
          {selectedProducts.map((item, idx) => (
            <div key={idx} className="p-2">
              <div className="bg-white border rounded-md h-full p-1 flex gap-2 ">
                <div className="h-[150px] rounded overflow-hidden">
                  <img
                    src={item.product?.thumbnails?.[0] || "/placeholder.png"}
                    alt={item.product?.product_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-sm font-medium truncate">
                      {item.product?.product_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      ₹{item.product?.basePrice?.toFixed(2)} - ₹
                      {item.product?.mrp?.toFixed(2)} / piece
                    </p>
                    <p className="text-xs text-gray-500">
                      Min order: {item.product?.minimum_quantity || 0} pcs
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {item.product.gallery_image.slice(0,3).map((img)=>(
                      <img src={img} alt="" className="w-10 h-10 rounded-sm shadow-sm" />
                    ))}
                  </div>
                  <button className="mt-2 w-full text-xs border py-1 rounded hover:bg-gray-100">
                    Make order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CraftMainProductBlock;

CraftMainProductBlock.craft = {
  displayName: "Product Selection",
  props: {
    selectedProducts: [],
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: CraftMainProductBlockSettings,
  },
  // ✅ Important: mark as canvas (required if you want to nest or make it editable)
  canvas: true,
};
