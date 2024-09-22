import React, { useCallback, useRef, useState } from "react"
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
  periodTitle?: string
  eventList: IHistoricalEvent[]
}

export const EventsSwiper = ({ eventList, periodTitle }: IEventListSwiperProps) => {

  const [currentData, setCurrentData] = useState<IEventListSwiperProps | null>(null)

  const swiperWrapperRef = useRef(null)
  const swiperRef = useRef<SwiperRef>(null)

  const [btnsDisabled, setBtnsDisabled] = useState({ prev: true, next: false })

  const updateBtnsStatus = () => {
    const prevState = swiperRef.current.swiper.isBeginning
    const nextState = swiperRef.current.swiper.isEnd
    const stateChanged = btnsDisabled.next !== nextState || btnsDisabled.prev !== prevState
    if (stateChanged) {
      setBtnsDisabled(() => ({ prev: prevState, next: nextState }))
    }
  }

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
      setCurrentData({ eventList, periodTitle })
      return
    }
    gsap.to(swiperWrapperRef.current, {
      opacity: 0, onComplete: () => {
        setCurrentData({ eventList, periodTitle })
        swiperRef.current.swiper.slideTo(0, 0)
      }
    })
  }, { dependencies: [eventList, periodTitle], scope: swiperWrapperRef })

  useGSAP(() => {
    gsap.fromTo(swiperWrapperRef.current, { opacity: 0, y: 10 }, {
      opacity: 1, y: 0, delay: .35
    })
  }, { dependencies: [currentData], scope: swiperWrapperRef })

  return (
    <div className="events-swiper" ref={swiperWrapperRef}>
      {currentData?.periodTitle && <p className="events-swiper__period-name">{currentData?.periodTitle}</p>}

      <SwiperNavButton onClick={handlePrevBtn} type="prev" isDisabled={btnsDisabled.prev} />
      <SwiperNavButton onClick={handleNextBtn} type="next" isDisabled={btnsDisabled.next} />

      <Swiper
        onSlideChange={updateBtnsStatus}
        ref={swiperRef}
        slidesPerView={"auto"}
        className={"mySwiper" + " events-swiper__swiper"}
      >
        {
          currentData?.eventList.map((event: IHistoricalEvent) => (
            <SwiperSlide key={event.id + event.description} className="events-swiper__slide">
              <EventOfPeriod event={event} />
            </SwiperSlide>
          )
          )
        }
      </Swiper>
    </div >
  )
}