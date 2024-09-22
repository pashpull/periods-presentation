import React, { memo } from "react";
import "./index.scss"

import { cn } from "../../utils/cn";

interface ICircleSelectorItem {
  id?: number;
  positionNumber?: string;
  label?: string;
  isActive?: boolean
  onClick?: (id: number) => void
}

export const CircleSelectorItem = memo(({ id, positionNumber, label, isActive, onClick }: ICircleSelectorItem) => {

  const className = cn(["circle-selector-item", isActive && "circle-selector-item_active"])

  return (
    <div className={className} onClick={() => onClick(id)}>
      <div className="circle-selector-item__body">
        <span>
          {positionNumber}
        </span>
      </div>

      {label && <span className="circle-selector-item__label">{label}</span>}

    </div >
  )
})