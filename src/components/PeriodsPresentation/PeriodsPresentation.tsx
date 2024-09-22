import React, { useCallback, useState } from "react"
import "./PeriodsPresentation.scss"

import { timePeriodsData } from "../../fakeData/fakeTimePeriodsData"
import { CircleSelector } from "../CircleSelector"
import { Pagination } from "../Pagination"

import { useMediaQuery } from "react-responsive"
import { EventsSwiper } from "./EventsSwiper"
import { CircleSelectorItem } from "../CircleISelectorItem"
import { YearsCounter } from "./YearsCounter"
import { IHistoricalPeriod } from "./types"

interface IPeriodsPresentationProps {
  periodList: IHistoricalPeriod[]
}

export const PeriodsPresentation = ({ periodList }: IPeriodsPresentationProps) => {

  const [currentPeriod, setCurrentPeriod] = useState<IHistoricalPeriod>(timePeriodsData[0])

  const getCurrentPeriodIndex = () => {
    return periodList.findIndex((item) => item.id === currentPeriod.id)
  }

  const setPeriodByIndex = (index: number) => {
    if (index === periodList.length || index < 0) return
    setCurrentPeriod(() => periodList[index])
  }

  const incCurrent = useCallback(() => {
    const newPeriodIndex = getCurrentPeriodIndex() + 1
    setPeriodByIndex(newPeriodIndex)
  }, [currentPeriod])

  const decCurrent = useCallback(() => {
    const newPeriodIndex = getCurrentPeriodIndex() - 1
    setPeriodByIndex(newPeriodIndex)
  }, [currentPeriod])

  const setPeriodById = useCallback((newId: number) => {
    const newPeriod = periodList.find(({ id }) => id === newId)
    setCurrentPeriod(newPeriod)
  }, [periodList])

  const showCrossAndSelector = useMediaQuery({ query: "(min-width: 576px)" })
  const currentPeriodIdx = getCurrentPeriodIndex() + 1 || undefined

  return (
    <div className="presentation">
      <div className="presentation__content">

        <div className="presentation__top">
          <h2 className="presentation__title">
            Исторические даты
          </h2>
        </div>

        <div className="presentation__bottom">
          <Pagination toNext={incCurrent} toPrev={decCurrent} maxCount={periodList.length} currentNumber={currentPeriodIdx} />
          <EventsSwiper eventList={currentPeriod.events} periodTitle={!showCrossAndSelector ? currentPeriod.title : undefined} />
        </div>

      </div>

      <div className="presentation__center-content">

        {showCrossAndSelector && (
          <div className="presentation__circle-wrapper">

            <CircleSelector currentSelectId={currentPeriod.id}
              options={periodList.map((item, idx) => ({ id: item.id, title: item.title, index: idx + 1 }))}
              renderFunction={({ id, title, index }) => {
                const isActive = currentPeriod.id === id
                return <CircleSelectorItem id={id} positionNumber={String(index)} label={title} onClick={setPeriodById} isActive={isActive} />
              }} />

          </div>
        )}

        <div className="presentation__years-wrapper">
          <YearsCounter startYear={currentPeriod.startDate} endYear={currentPeriod.endDate} />
        </div>

      </div>
    </div >
  )
}