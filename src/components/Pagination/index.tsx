import React from "react"
import "./index.scss"

import { cn } from "../../utils/cn";

import Arrow from "../../assets/arrow.svg"
import { CircleButtonTemplate } from "../CircleButtonTemplate";

interface IPagination {
  toNext?: () => void;
  toPrev?: () => void;
  maxCount?: number;
  currentNumber?: number;
}

export const Pagination = ({ toNext, toPrev, maxCount, currentNumber }: IPagination) => {

  const showProgress = maxCount && currentNumber

  const dis = currentNumber < 2
  return (
    <div className="pagination">
      {showProgress && <div className="pagination__mobile-progress">
        {
          Array(maxCount).fill(' ').map((_, idx) => {

            const baseClassName = "pagination__mobile-progress-marker"
            const className = cn([
              baseClassName,
              currentNumber === idx + 1 && baseClassName + "_active"
            ])

            return <div key={idx} className={className}></div>
          })
        }
      </div>}

      <div className="pagination__inner">

        {
          showProgress && (
            <span className="pagination__progress">
              {`0${currentNumber}/0${maxCount}`}
            </span>
          )
        }

        <div className="pagination__control">
          <CircleButtonTemplate onClick={toPrev} disabled={dis} className="pagination__button">
            <Arrow className="pagination__arrow" />
          </CircleButtonTemplate>

          <CircleButtonTemplate onClick={toNext} disabled={currentNumber === maxCount} className="pagination__button">
            <Arrow className="pagination__arrow pagination__arrow_to-right" />
          </CircleButtonTemplate>
        </div>
      </div >

    </div >
  )
}
