import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { Element, useNode } from "@craftjs/core";
import { CraftSliderBannerSettings } from "./settings/slider-settings";
import { Text } from "../selecters";
import BlockWrapper from "../tools/BlockWrapper";
import { useWindowWidth } from "@react-hook/window-size";

type Slide = {
  image: string;
  link: string;
};

type SliderBannerProps = {
  slides: Slide[];
  enableLabel?: boolean;
  autoplay?: boolean;
  showDots?: boolean;
  infinite?: boolean;
  speed?: number;
  slidesToShow?: number;
  // width?: string;
  width?: [string, string, string];

  height?: string;
  labelText?: string;
  gap?: string;
  margin?: [string, string, string, string];
  objectFit?: "cover" | "contain";
};

export const CraftSliderBannerBlock = (props: Partial<SliderBannerProps>) => {
  const {
    slides = [],
    enableLabel = false,
    autoplay = true,
    showDots = true,
    infinite = true,
    speed = 500,
    slidesToShow = 1,
    // width = "100%",
    width = ["100%", "100%", "100%"],
    height = ["400px", "400px", "400px"],

    // height = "400px",
    // margin = ["0px", "0px", "0px", "0px"],
    margin = ["0", "0", "0", "0"],
    objectFit = "cover",
    labelText = "heading",
    gap,
  } = props;

  const {
    connectors: { connect },
  } = useNode();

  // const { enabled } = useEditor((state) => ({
  //   enabled: state.options.enabled,
  // }));

  // const settings = {
  //   dots: showDots,
  //   infinite: slides.length > 1 ? infinite : false,
  //   speed,
  //   slidesToShow: Number(slidesToShow) || 1,
  //   slidesToScroll: Number(slidesToShow) === 4 ? 2 : 1,

  //   autoplay,
  //   arrows: false,
  // };
  const settings = {
    dots: String(showDots) === "true",
    infinite: slides.length > 1 ? String(infinite) === "true" : false,
    speed,
    slidesToShow: Number(slidesToShow) || 1,
    slidesToScroll: Number(slidesToShow) === 4 ? 2 : 1,
    autoplay: String(autoplay) === "true",
    arrows: false,
  };

  const windowWidth = useWindowWidth();

  const formatResponsiveValue = (
    val: string | undefined,
    fallback: string
  ): string => {
    if (!val) return fallback;
    if (/^\d+$/.test(val)) return `${val}px`; // e.g. "200" → "200px"
    return val; // e.g. "100%" stays "100%"
  };

  const resolvedWidth = formatResponsiveValue(
    windowWidth <= 768
      ? width?.[2]
      : windowWidth <= 1024
      ? width?.[1]
      : width?.[0],
    "100%"
  );

  const resolvedHeight = formatResponsiveValue(
    windowWidth <= 768
      ? height?.[2]
      : windowWidth <= 1024
      ? height?.[1]
      : height?.[0],
    "400px"
  );

  const gapClass = {
    "0": "px-0",
    "1": "px-1",
    "2": "px-2",
    "3": "px-3",
    "4": "px-4",
    "5": "px-5",
    "6": "px-6",
    "7": "px-7",
    "8": "px-8",
    "9": "px-9",
    "10": "px-10",
  }[gap ?? "0"];
  

  return (
    <div
      ref={(ref) => {
        if (ref) connect(ref);
      }}
      className="w-full h-full overflow-visible relative bg-white"
    >
      {" "}
      <div className="">
        {enableLabel && (
          <Element
            id="label-text"
            is={Text}
            canvas
            text={labelText}
            fontSize="16"
            fontWeight="400"
            textAlign="left"
            color={{ r: 0, g: 0, b: 0, a: 1 }}
            margin={["5", "0", "0", "5"]}
            shadow={0}
          />
        )}
      </div>
      <BlockWrapper
        className="h-full overflow-visible relative"
        style={{
          width: resolvedWidth,
          height: resolvedHeight,
          margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
        }}
      >
        <Slider {...settings} className="w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`w-full px-[1px] sm:${gapClass}`}

              // style={{ height: resolvedHeight }}
              style={{
                height: resolvedHeight,
                // paddingLeft: windowWidth <= 768 ? `${gap}px` : "1px",
                // paddingRight:  windowWidth >= 768  ? `${gap}px` : "1px",
              }}
            >
              
              <a
                href={slide.link}
                className="block w-full h-full"
                style={{ height: resolvedHeight }}
              >
                <img
                  src={slide.image}
                  alt=""
                  className="w-full h-full"
                  style={{ objectFit, height: resolvedHeight }}
                />
              </a>
            </div>
          ))}
        </Slider>
      </BlockWrapper>
    </div>
  );
};

CraftSliderBannerBlock.craft = {
  displayName: "CraftSliderBannerBlock",
  props: {
    slides: [
      {
        image:
          "https://res.cloudinary.com/ddzwv1pc9/image/upload/v1750488122/media_uploads/vlbetakhsubyaylf3adl.png",
        link: "#",
      },
    ],
    autoplay: true,
    showDots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    // width: "100%",
    width: ["100%", "100%", "100%"],
    height: ["200px", "200px", "200px"], 
    // height: "200px",
    // margin: ["0px", "0px", "0px", "0px"],
    margin: ["0", "0", "25", "0"],
    objectFit: "cover",
    labelText: "heading",
    enableLabel: false,
    gap: "0",
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: CraftSliderBannerSettings,
  },
};
