import {  useNode } from "@craftjs/core";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import BlockWrapper from "../../tools/BlockWrapper";
import CraftCategorySettings from "./CraftCategorySettings";
import { ICategory } from "@/types/categorytypes";

export type CraftMainProductBlockProps = {
  selectedCategory?: ICategory[];
};

const CraftCategorySelection = ({
  selectedCategory = [],
}: CraftMainProductBlockProps) => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: selectedCategory.length > 10,
    speed: 300,
    slidesToShow: 10,
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
    <div ref={(ref) => ref && connect(ref)} className="w-full">
      {/* Left Block */}

      {/* Right Block - Product Slider */}
      {/* Right Block - Product Slider */}
      <BlockWrapper className="w-full min-h-[100px] overflow-visible relative">
        <div className="absolute -top-7 text-sm px-2 py-1  rounded-tl-2xl rounded-tr-2xl 
        bg-[linear-gradient(90deg,rgba(95,8,177,0.5)_0%,rgba(123,27,213,0.5)_100%)]
        text-white ">
        <span className="">
        Featured Products
        </span>
        </div>
        <Slider {...settings} ref={sliderRef} className="w-full h-auto ">
          {selectedCategory.map((item, idx) => (
            <div key={idx} className="p-2 ">
              <a href={`/page/category/${item.name}`} className="text-center">
                  <div className="aspect-square rounded-full overflow-hidden border border-[#B6B6B6] ">
                  <img
                    src={item.coverImage || "/placeholder.png"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                 
                </div>
                 <p className="text-[#272727]">
                    {item.name}
                  </p>
              </a>
            
            </div>
          ))}
        </Slider>
      </BlockWrapper>
    </div>
  );
};

export default CraftCategorySelection;

CraftCategorySelection.craft = {
  displayName: "Category Selection",
  props: {
    selectedCategory: [],
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: CraftCategorySettings,
  },
  // ✅ Important: mark as canvas (required if you want to nest or make it editable)
  canvas: true,
};
