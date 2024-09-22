import React from "react";

import { cn } from "../../../utils/cn";

import Arrow from "../../../assets/arrow.svg"
import { CircleButtonTemplate } from "../../CircleButtonTemplate";

interface ISwiperNavButton {
  type: "next" | "prev";
  onClick: () => void;
  isDisabled: boolean
}

export const SwiperNavButton = ({ type, onClick, isDisabled }: ISwiperNavButton) => {

  const buttonClassName = cn(["events-swiper__nav-btn", "events-swiper__nav-btn_" + type])

  return (
    <CircleButtonTemplate className={buttonClassName} disabledClassName="events-swiper__nav-btn_disabled" onClick={onClick} disabled={isDisabled}>
      <Arrow className="events-swiper__nav-btn-arrow" />
    </CircleButtonTemplate>
  )
}

