
import { NextArrowSvgIcon, PrevArrowSvgIcon } from "@/components/icons/react-slick-icons";
import React from "react";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

type Props = {
  slider: any;
  disabled: boolean;
};

export function TodaysDealArrowPrev({ slider, disabled }: Props) {
  return (
    <button
      onClick={() => slider?.current?.slickPrev()}
      disabled={disabled}
      className={`btn p-2 rounded-full transition-all duration-300 ${
        disabled ? "text-gray-300 cursor-not-allowed" : "text-black hover:bg-slate-50"
      }`}
    >
      <PrevArrowSvgIcon disabled={disabled} />
    </button>
  );
}

export function TodaysDealArrowNext({ slider, disabled }: Props) {
  return (
    <button
      onClick={() => slider?.current?.slickNext()}
      disabled={disabled}
      className={`btn p-2 rounded-full transition-all duration-300 ${
        disabled ? "text-gray-300 cursor-not-allowed" : "text-black hover:bg-slate-50"
      }`}
    >
     <NextArrowSvgIcon disabled={disabled} />
    </button>
  );
}
