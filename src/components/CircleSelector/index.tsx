import React, { useRef } from "react"
import "./index.scss"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { getRotationParams } from "./helpers";

gsap.registerPlugin(useGSAP);

type IOption<T> = T & {
  id: number;
}

interface ICircleSelector<T> {
  selectedId?: number;
  options?: IOption<T>[]
  renderFunction?: (option: IOption<T>, index: number) => JSX.Element | JSX.Element[]
}

export const CircleSelector = <T,>({ options, selectedId, renderFunction }: ICircleSelector<T>) => {

  const currentItemIndexRef = useRef(null)
  const circle = useRef<HTMLDivElement>(null)

  useGSAP(
    (_, contextSafe) => {

      if (!options) return

      const newItemIdx = options.findIndex(({ id }) => id === selectedId)
      const { direction, angle } = getRotationParams(newItemIdx, currentItemIndexRef.current, options.length)

      gsap.to(".circle__item", { rotation: `${direction === "forward" ? "-" : "+"}=${angle}`, duration: 1, ease: "power1.inOut", transformOrigin: `0px ${circle.current.clientWidth / 2}px` })
      gsap.to(".circle__inner", { rotation: `${direction === "forward" ? "+" : "-"}=${angle}`, duration: 1, ease: "power1.inOut", onComplete: () => currentItemIndexRef.current = newItemIdx })

      const resizeHandler = contextSafe(() => {
        gsap.to(".circle__item", { transformOrigin: `0px ${circle.current.clientWidth / 2}px` })
      })

      window.addEventListener("resize", resizeHandler)

      return () => {
        window.removeEventListener('resize', resizeHandler);
      };
    },
    { dependencies: [selectedId], scope: circle }
  )

  return (
    <div className="circle-container">
      <div ref={circle} className="circle">
        {
          renderFunction && options.map((option, idx, array) => {

            const initialAngle = ((360 / array.length) * idx) + 30

            return (
              <div key={option.id} className="circle__item" style={{ transform: `rotate(${initialAngle}deg)` }}>
                <div className="circle__inner" style={{ transform: `rotate(-${initialAngle}deg)` }}>
                  {renderFunction(option, idx)}
                </div>
              </div>)
          })
        }
      </div>
    </div>
  )
}