import React from "react"
import { PeriodsPresentation } from "./components/PeriodsPresentation"
import "normalize.css"
import "./theme/theme.scss"
import { timePeriodsData } from "./fakeData/fakeTimePeriodsData"
export const App = () => {

  return (<div className="App">
    <PeriodsPresentation periodList={timePeriodsData} />
    {/* <PeriodsPresentation /> */}
  </div>
  )
}
