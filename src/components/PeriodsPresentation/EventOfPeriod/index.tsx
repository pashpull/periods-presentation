import React, { memo } from "react"
import "./index.scss"
import { IHistoricalEvent } from "../types"

interface IEventOfPeriod {
  event: IHistoricalEvent
}

export const EventOfPeriod = memo(({ event }: IEventOfPeriod) => {
  return (
    <div className="event">
      <h3 className="event__title">{event.year}</h3>
      <p className="event__description">
        {event.description}
      </p>
    </div>
  )
})