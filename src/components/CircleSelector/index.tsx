import React, { useRef } from "react"
import "./index.scss"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { getRotationParams } from "./helpers";

gsap.registerPlugin(useGSAP);

type IEntryOption<T> = T & {
  id: number;
}

interface ICircleSelector<T> {
  currentSelectId?: number;
  options?: (IEntryOption<T>)[]
  renderFunction?: (option: IEntryOption<T> & T, index: number) => JSX.Element | JSX.Element[]
}

export const CircleSelector = <T,>({ options, currentSelectId, renderFunction }: ICircleSelector<T>) => {

  const oldItemIndexRef = useRef(null)

  const circle = useRef<HTMLDivElement>(null)

  useGSAP(
    (_, contextSafe) => {

      if (!options) return

      const newItemIdx = options.findIndex(({ id }) => id === currentSelectId)

      const { direction, angle } = getRotationParams(newItemIdx, oldItemIndexRef.current, options.length)

      gsap.to(".item", { rotation: `${direction === "forward" ? "-" : "+"}=${angle}`, duration: 1, ease: "power1.inOut", transformOrigin: `0px ${circle.current.clientWidth / 2}px` })
      gsap.to(".inner", { rotation: `${direction === "forward" ? "+" : "-"}=${angle}`, duration: 1, ease: "power1.inOut", onComplete: () => oldItemIndexRef.current = newItemIdx })

      const resizeHandler = contextSafe(() => {
        gsap.to(".item", { transformOrigin: `0px ${circle.current.clientWidth / 2}px` })
      })

      window.addEventListener("resize", resizeHandler)

      return () => {
        window.removeEventListener('resize', resizeHandler);
      };
    },
    { dependencies: [currentSelectId], scope: circle }
  )

  return (
    <div className="container">
      <div ref={circle} className="circle">
        {
          renderFunction && options.map(renderFunction).map((jsx, idx, array) => {
            const initialAngle = ((360 / array.length) * idx) + 30

            return (
              <div key={idx} className="item" style={{ transform: `rotate(${initialAngle}deg)` }}>
                <div className="inner" style={{ transform: `rotate(-${initialAngle}deg)` }}>
                  {jsx}
                </div>
              </div>)
          })
        }
      </div>
    </div>
  )
}