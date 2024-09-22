import React, { useRef } from "react";
import "./index.scss"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

interface IYearsCounter {
  startYear?: number;
  endYear?: number;
}

export const YearsCounter = ({ startYear, endYear }: IYearsCounter) => {

  const counterRef = useRef(null)

  useGSAP(() => {
    gsap.to(".years-counter__years-value_start", {
      textContent: startYear,
      duration: 1.5,
      ease: "power4.out",
      snap: { textContent: 1 },
    });
    gsap.to(".years-counter__years-value_end", {
      textContent: endYear,
      duration: 1.5,
      ease: "power4.out",
      snap: { textContent: 1 },
    });
  }, { dependencies: [startYear, endYear], scope: counterRef })

  return (
    <div className="years-counter" ref={counterRef}>
      <span className="years-counter__years-value years-counter__years-value_start"></span>
      <span className="years-counter__years-value years-counter__years-value_end"></span>
    </div>

  )
}