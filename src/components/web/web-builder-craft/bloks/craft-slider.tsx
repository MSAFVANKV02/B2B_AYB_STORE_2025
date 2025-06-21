import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { Element, useNode } from "@craftjs/core";
import { CraftSliderBannerSettings } from "./settings/slider-settings";
import { Text } from "../selecters";
import BlockWrapper from "../tools/BlockWrapper";

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
  width?: string;
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
    width = "100%",
    height = "400px",
    // margin = ["0px", "0px", "0px", "0px"],
    margin = ["0", "0", "0", "0"],
    objectFit = "cover",
    labelText = "heading",
    gap
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
  

  return (
    <div
      ref={(ref) => {
        if (ref) connect(ref);
      }}
      className="w-full h-full overflow-visible relative bg-white"
      style={{
        width,
        height,
        // margin: margin.join(" "),
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
      }}
    >
      <BlockWrapper className="h-full overflow-visible relative">
      {enableLabel && (
        <div className="">
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
        </div>
      )}

      <Slider {...settings} className="w-full h-full ">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`w-full px-${gap}`}
            style={{ height }} // ✅ this sets height on slide wrapper
          >
            <a
              href={slide.link}
              className="block w-full h-full"
              style={{ height }} // ✅ ensure <a> has height
            >
              <img
                src={slide.image}
                alt=""
                className="w-full h-full object-cover"
                style={{ objectFit, height }} // ✅ ensure <img> fits as well
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
      { image: "https://res.cloudinary.com/ddzwv1pc9/image/upload/v1750488122/media_uploads/vlbetakhsubyaylf3adl.png", link: "#" },
    ],
    autoplay: true,
    showDots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    width: "100%",
    height: "200px",
    // margin: ["0px", "0px", "0px", "0px"],
    margin: ["0", "0", "0", "0"],
    objectFit: "cover",
    labelText: "heading",
    enableLabel: false,
    gap:"0"
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: CraftSliderBannerSettings,
  },
};
