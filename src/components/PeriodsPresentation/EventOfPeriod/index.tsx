import React, { memo } from "react"
import "./index.scss"

interface IEventOfPeriod {
  year: number;
  description: string;
}

export const EventOfPeriod = memo(({ year, description }: IEventOfPeriod) => {

  return (
    <div className="event">
      <h3 className="event__title">{year}</h3>
      <p className="event__description">
        {description}
      </p>
    </div>
  )
})