import { ComponentConfig } from "@measured/puck";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const SliderBannerBlock: ComponentConfig = {
  label: "Slider Banner",
  fields: {
    items: {
      type: "array",
      label: "Slides",
      arrayFields: {
        image: {
          type: "text",
          label: "Image URL",
        },
        link: {
          type: "text",
          label: "Redirect Link",
        },
      },
      defaultItemProps: {
        image: "https://via.placeholder.com/800x300",
        link: "",
      },
    //   getItemSummary: (item: any, index?: number) =>
    //     item.link ? `Link: ${item.link}` : `Slide ${index ?? "?"}`,
    },
    autoplay: {
      type: "select",
      label: "Autoplay",
      options: [
        { label: "On", value: "true" },
        { label: "Off", value: "false" },
      ],
    },
    autoplaySpeed: {
      type: "text",
      label: "Autoplay Speed (ms)",
    },
    sliderHeight: {
      type: "number",
      label: "Slider Height (e.g., 300px, 50vh)",
    },
    marginTop: {
      type: "select",
      label: "Top Margin",
      options: Array.from({ length: 9 }, (_, i) => ({
        label: `mt-${i}`,
        value: `mt-${i}`,
      })),
    },
    marginBottom: {
      type: "select",
      label: "Bottom Margin",
      options: Array.from({ length: 9 }, (_, i) => ({
        label: `mb-${i}`,
        value: `mb-${i}`,
      })),
    },
    paddingX: {
      type: "select",
      label: "Horizontal Padding",
      options: Array.from({ length: 9 }, (_, i) => ({
        label: `px-${i}`,
        value: `px-${i}`,
      })),
    },
    imageFit: {
      type: "select",
      label: "Image Fit Mode",
      options: [
        { label: "Cover", value: "cover" },
        { label: "Contain", value: "contain" },
        { label: "Fill", value: "fill" },
        { label: "None", value: "none" },
        { label: "Scale Down", value: "scale-down" },
      ],
    },
    
  },
  defaultProps: {
    items: [
      {
        image: "https://via.placeholder.com/800x300",
        link: "",
      },
    ],
    autoplay: "true",
    autoplaySpeed: "3000",
    sliderHeight: 300,
    imageFit: "cover",
    marginTop: "mt-2",
    marginBottom: "mb-2",
    paddingX: "px-2",
  },
  render: ({ items, autoplay, autoplaySpeed, sliderHeight, imageFit , marginTop, marginBottom, paddingX,}) => {
    const settings = {
      dots: true,
      infinite: items.length > 1,
      speed: 500,
      autoplay: autoplay === "true",
      autoplaySpeed: Number(autoplaySpeed) || 3000,
    };

    const containerClass = `${marginTop || ""} ${marginBottom || ""} ${paddingX || ""}`;

    return (
      <div className={containerClass}>
      <Slider {...settings}>
        {items.map((slide: any, i: number) => {
          const img = (
            <img
              src={slide.image}
              alt={`Slide ${i + 1}`}
              style={{
                width: "100%",
                height: sliderHeight,
                objectFit: imageFit,
                display: "block",
              }}
            />
          );

          return slide.link ? (
            <a
              key={`slide-link-${i}`}
              href={slide.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {img}
            </a>
          ) : (
            <div
              key={`slide-${i}`}
              style={{
                width: "100%",
                height: sliderHeight,
              }}
            >
              {img}
            </div>
          );
        })}
      </Slider>
    </div>
    );
  },
};
