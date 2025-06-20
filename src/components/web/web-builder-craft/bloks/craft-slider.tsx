import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import Slider from 'react-slick';
import { useNode, useEditor } from '@craftjs/core';
import { CraftSliderBannerSettings } from './settings/slider-settings';

type Slide = {
  image: string;
  link: string;
};

type SliderBannerProps = {
  slides: Slide[];
  autoplay?: boolean;
  showDots?: boolean;
  infinite?: boolean;
  speed?: number;
  width?: string;
  height?: string;
  margin?: [string, string, string, string];
  objectFit?: 'cover' | 'contain';
};

export const CraftSliderBannerBlock = (props: Partial<SliderBannerProps>) => {
  const {
    slides = [],
    autoplay = true,
    showDots = true,
    infinite = true,
    speed = 500,
    width = '100%',
    height = '250px',
    margin = ['0px', '0px', '0px', '0px'],
    objectFit = 'cover',
  } = props;

  const {
    connectors: { connect },
  } = useNode();

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const settings = {
    dots: showDots,
    infinite: slides.length > 1 ? infinite : false,
    speed,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay,
    arrows: slides.length > 1,
  };

  return (
    <div
      ref={(ref) => {
        if (ref) connect(ref);
      }}
      className="w-full overflow-hidden border"
      style={{
        width,
        height,
        margin: margin.join(' '),
      }}
    >
      {/* {objectFit} */}
      <Slider {...settings} className='w-full'>
        {slides.map((slide, index) =>
          enabled ? (
            <div key={index}>
              <img
                src={slide.image}
                alt={`Slide ${index}`}
                className={`w-full h-full  pointer-events-none`}
                style={{
                  objectFit:objectFit
                }}
              />
            </div>
          ) : (
            <a
              key={index}
              href={slide.link}
              target="_blank"
              rel="noreferrer"
              className="block h-full w-full"
            >
              <img
               style={{
                objectFit:objectFit
              }}
                src={slide.image}
                alt={`Slide ${index}`}
                className={`w-full h-full object-contain`}
              />
            </a>
          )
        )}
      </Slider>
    </div>
  );
};

CraftSliderBannerBlock.craft = {
  displayName: 'CraftSliderBannerBlock',
  props: {
    slides: [
      { image: 'https://via.placeholder.com/800x200?text=Slide+1', link: '#' },
      { image: 'https://via.placeholder.com/800x200?text=Slide+2', link: '#' },
    ],
    autoplay: true,
    showDots: true,
    infinite: true,
    speed: 500,
    width: '100%',
    height: '200px',
    margin: ['0px', '0px', '0px', '0px'],
    objectFit: 'cover',
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: CraftSliderBannerSettings,
  },
};
