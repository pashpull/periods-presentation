export interface IHistoricalEvent {
  id: number,
  year: number;
  description: string;
}

export interface IHistoricalPeriod {
  id: number;
  title: string;
  startDate: number;
  endDate: number;
  events: IHistoricalEvent[];
}

export interface IPeriodForCircle {
  id: number;
  title: string;
  index: number;
} 