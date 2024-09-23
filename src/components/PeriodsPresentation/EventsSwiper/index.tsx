import React, { forwardRef, memo, useCallback, useRef, useState } from "react"
import "./index.scss"
import 'swiper/css';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import { SwiperNavButton } from "./SwiperNavButton";
import { EventOfPeriod } from "../EventOfPeriod"
import { IHistoricalEvent } from "../types";

gsap.registerPlugin(useGSAP);

interface IEventListSwiperProps {
  swiperTitle?: string
  eventList: IHistoricalEvent[]
}

export const EventsSwiper = ({ eventList, swiperTitle }: IEventListSwiperProps) => {

  const [currentData, setCurrentData] = useState<IEventListSwiperProps | null>(null)
  const [btnsDisabled, setBtnsDisabled] = useState({ prev: true, next: false })

  const swiperWrapperRef = useRef(null)
  const swiperRef = useRef<SwiperRef>(null)

  const updateBtnsStatus = useCallback(() => {
    const prevState = swiperRef.current.swiper.isBeginning
    const nextState = swiperRef.current.swiper.isEnd
    const stateChanged = btnsDisabled.next !== nextState || btnsDisabled.prev !== prevState
    if (stateChanged) {
      setBtnsDisabled(() => ({ prev: prevState, next: nextState }))
    }
  }, [btnsDisabled])

  const handleNextBtn = useCallback(() => {
    if (!swiperRef.current) return
    swiperRef.current.swiper.slideNext()
    updateBtnsStatus()
  }, [btnsDisabled])

  const handlePrevBtn = useCallback(() => {
    if (!swiperRef.current) return
    swiperRef.current.swiper.slidePrev()
    updateBtnsStatus()
  }, [btnsDisabled])

  useGSAP(() => {
    if (currentData === null) {
      setCurrentData({ eventList, swiperTitle })
      return
    }
    gsap.to(swiperWrapperRef.current, {
      opacity: 0, onComplete: () => {
        setCurrentData({ eventList, swiperTitle })
        swiperRef.current.swiper.slideTo(0, 0)
      }
    })
  }, { dependencies: [eventList, swiperTitle], scope: swiperWrapperRef })

  useGSAP(() => {
    gsap.fromTo(swiperWrapperRef.current, { opacity: 0, y: 10 }, {
      opacity: 1, y: 0, delay: .35
    })
  }, { dependencies: [currentData], scope: swiperWrapperRef })

  return (
    <div className="events-swiper" ref={swiperWrapperRef}>
      {currentData?.swiperTitle && <p className="events-swiper__period-name">{currentData?.swiperTitle}</p>}

      <SwiperNavButton onClick={handlePrevBtn} type="prev" isDisabled={btnsDisabled.prev} />
      <SwiperNavButton onClick={handleNextBtn} type="next" isDisabled={btnsDisabled.next} />

      {currentData?.eventList && <MemoizedSwiper ref={swiperRef} onSlideChange={updateBtnsStatus} eventList={currentData.eventList} />}

    </div >
  )
}

interface IEventsSwiper {
  onSlideChange: () => void;
  eventList: IHistoricalEvent[]
}

const MemoizedSwiper = memo(forwardRef<SwiperRef, IEventsSwiper>(({ onSlideChange, eventList }: IEventsSwiper, ref) => (
  <Swiper
    onSlideChange={onSlideChange}
    ref={ref}
    slidesPerView={"auto"}
    className={"mySwiper" + " events-swiper__swiper"}
  >
    {
      eventList.map((event: IHistoricalEvent) => (
        <SwiperSlide key={event.id + event.description} className="events-swiper__slide">
          <EventOfPeriod year={event.year} description={event.description} />
        </SwiperSlide>
      )
      )
    }
  </Swiper>
)))
