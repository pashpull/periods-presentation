import React, { useCallback, useMemo, useState } from "react"
import { useMediaQuery } from "react-responsive"
import "./PeriodsPresentation.scss"

import { IHistoricalPeriod, IPeriodForCircle } from "./types"

import { CircleSelector } from "../CircleSelector"
import { Pagination } from "../Pagination"
import { EventsSwiper } from "./EventsSwiper"
import { CircleSelectorItem } from "../CircleISelectorItem"
import { YearsCounter } from "./YearsCounter"
import { useRateLimit } from "../../hooks/useRateLimit"

interface IPeriodsPresentationProps {
  periodList: IHistoricalPeriod[]
}

export const PeriodsPresentation = ({ periodList }: IPeriodsPresentationProps) => {

  const [currentPeriod, setCurrentPeriod] = useState<IHistoricalPeriod>(periodList[0])

  const limitedSetCurrentPeriod = useRateLimit(setCurrentPeriod, 1000)

  const getCurrentPeriodIndex = () => {
    return periodList.findIndex((item) => item.id === currentPeriod.id)
  }

  const setPeriodByIndex = (index: number) => {
    if (index === periodList.length || index < 0) return
    limitedSetCurrentPeriod(() => periodList[index])
  }
  const setPeriodById = useCallback((newId: number) => {
    const newPeriod = periodList.find(({ id }) => id === newId)
    limitedSetCurrentPeriod(newPeriod)
  }, [periodList])

  const setNextPeriod = useCallback(() => {
    const newPeriodIndex = getCurrentPeriodIndex() + 1
    setPeriodByIndex(newPeriodIndex)
  }, [currentPeriod])

  const setPrevPeriod = useCallback(() => {
    const newPeriodIndex = getCurrentPeriodIndex() - 1
    setPeriodByIndex(newPeriodIndex)
  }, [currentPeriod])

  const preparedPeriodList: IPeriodForCircle[] = useMemo(() => {
    return periodList.map((item, idx) => ({ id: item.id, title: item.title, index: idx + 1 }))
  }, [periodList])

  const renderCircleItem = ({ id, title, index }: IPeriodForCircle) => {
    const isActive = currentPeriod.id === id
    return <CircleSelectorItem id={id} positionNumber={String(index)} label={title} onClick={setPeriodById} isActive={isActive} />
  }

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
          <Pagination toNext={setNextPeriod} toPrev={setPrevPeriod} maxCount={periodList.length} currentNumber={currentPeriodIdx} />
          <EventsSwiper eventList={currentPeriod.events} swiperTitle={!showCrossAndSelector ? currentPeriod.title : undefined} />
        </div>
      </div>

      <div className="presentation__center-content">

        {showCrossAndSelector && (
          <div className="presentation__circle-wrapper">
            <CircleSelector selectedId={currentPeriod.id} options={preparedPeriodList} renderFunction={renderCircleItem} />
          </div>
        )}

        <div className="presentation__years-wrapper">
          <YearsCounter startYear={currentPeriod.startDate} endYear={currentPeriod.endDate} />
        </div>
      </div>

    </div >
  )
}