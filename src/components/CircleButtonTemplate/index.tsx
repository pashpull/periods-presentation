import React, { memo } from "react";
import "./index.scss"

import { cn } from "../../utils/cn";

interface ICircleSelectorItem {
  children: JSX.Element | JSX.Element[];
  disabled?: boolean;
  className?: string;
  disabledClassName?: string;
  onClick?: () => void;
}

export const CircleButtonTemplate = memo(({ children, disabled, className, disabledClassName, onClick }: ICircleSelectorItem) => {

  const buttonClassName = cn(["circle-button", disabled && (disabledClassName || "circle-button_disabled"), className])
  const clickHandler = !disabled ? onClick : undefined

  return (
    <button onClick={clickHandler} className={buttonClassName}>
      {children}
    </button>
  )
})