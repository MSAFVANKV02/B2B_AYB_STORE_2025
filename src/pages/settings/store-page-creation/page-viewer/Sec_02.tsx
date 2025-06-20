import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import {
  TodaysDealArrowNext,
  TodaysDealArrowPrev,
} from "@/components/global/react-slick/todays-deal-arrows";
import { useWindowWidth } from "@react-hook/window-size";

const Sec_02 = () => {
  const slider = useRef<Slider>(null);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const onlyWidth =  useWindowWidth()

  const data = [
    {
      id: 1,
      youTube: "https://www.youtube.com/embed/a3ICNMQW7Ok?modestbranding=1&rel=0&controls=1&fs=0&disablekb=1",
      title: "How to Create Your Brand Store on Ayaboo",
    },
    {
      id: 2,
      youTube: "https://www.youtube.com/embed/xrRDlOWR1OU?si=635GKFz1yQMPsNhd",
      title: "How to Add Featured Products to Your Store Page",
    },
    {
      id: 3,
      youTube: "https://www.youtube.com/embed/K4TOrB7at0Y?si=8o7ErOO3tztJlKvb",
      title: "How to Create Your Brand Store on Ayaboo",
    },
    {
      id: 4,
      youTube: "https://www.youtube.com/embed/5hPtU8Jbpg0?si=ClBPOI_cjFtcoHiR",
      title: "How Can Add Sections",
    },
  ];

  const settings = {
    dots: false,
    infinite: data.length > 3,
    speed: 200,
    slidesToShow: onlyWidth > 1270 ?  3 :1,
    slidesToScroll: 1,
    autoplay: data.length > 3,
    arrows: undefined,
    beforeChange: (_: number, nextIndex: number) => setCurrentSlide(nextIndex),
    responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
  };

  useEffect(() => {
    setDisablePrev(currentSlide === 0);
    setDisableNext(currentSlide + settings.slidesToShow >= data.length);
  }, [currentSlide, settings.slidesToShow, data.length]);

  return (
    <section className="flex flex-col justify-center items-center md:gap-7 gap-5 bg-white sm:py-10 py-5  ">
         <h2 className="font-bold capitalize">Helpful resources</h2>
        <p className="">
          Start building your Brand Store on Ayaboo with these helpful guides
        </p>
        
     <div className="w-3/4 relative">
     <div className="absolute -left-10 -translate-y-1/2 top-1/2 xl:block hidden z-10">
        <TodaysDealArrowPrev slider={slider} disabled={disablePrev} />
      </div>
      <Slider {...settings} ref={slider} className="w-full h-auto">
        {data.map((card,index) => (
          <div className="lg:pr-3 ">
            <Card className="rounded-none p-0 border-none shadow-none h-fit flex flex-col">
              <CardContent className="p-0" >
              <iframe
               className="w-full h-[220px] " 
                    // width="100%"
                    // height="250"
                    src={card.youTube}
                    title={card.title || `Video ${index + 1}`}
                    style={{ border: "none" }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
              </CardContent>
              <CardFooter className="py-2 px-1 text-xs" >
                <p>{card.title}</p>
              </CardFooter>
            </Card>
          </div>
        ))}
      </Slider>
      <div className="absolute -right-10 -translate-y-1/2 top-1/2 xl:block hidden  z-10">
        <TodaysDealArrowNext slider={slider} disabled={disableNext} />
      </div>
     </div>
    </section>
  );
};

export default Sec_02;
