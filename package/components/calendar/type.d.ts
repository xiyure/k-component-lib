export interface CalendarProps {
  schedule?: any
  showLunar?: boolean
  adaptive?: boolean
}

export interface Schedule {
  date: string | Date
  content: string[]
}