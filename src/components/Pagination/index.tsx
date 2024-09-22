import React, { memo, useCallback } from "react"
import "./index.scss"

import Arrow from "../../assets/arrow.svg"
import { cn } from "../../utils/cn";
import { CircleButtonTemplate } from "../CircleButtonTemplate";

interface IPagination {
  toNext?: () => void;
  toPrev?: () => void;
  maxCount?: number;
  currentNumber?: number;
}
const MemoArrow = memo(({ className }: { className: string }) => <Arrow className={className} />)

export const Pagination = ({ toNext, toPrev, maxCount, currentNumber }: IPagination) => {

  const showProgress = maxCount && currentNumber

  return (
    <div className="pagination">
      {showProgress && <div className="pagination__mobile-progress">
        {Array(maxCount).fill(' ').map((_, idx) => {
          const className = cn([
            "pagination__mobile-progress-marker",
            currentNumber === idx + 1 && "pagination__mobile-progress-marker_active"
          ])
          return <div key={idx} className={className}></div>
        })}
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
          <CircleButtonTemplate onClick={toPrev} disabled={currentNumber < 2} className="pagination__button">
            <MemoArrow className="pagination__arrow" />
          </CircleButtonTemplate>

          <CircleButtonTemplate onClick={toNext} disabled={currentNumber === maxCount} className="pagination__button">
            <MemoArrow className="pagination__arrow pagination__arrow_to-right" />
          </CircleButtonTemplate>
        </div>

      </div >
    </div >

  )
}
