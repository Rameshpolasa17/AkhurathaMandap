export interface ScheduleItem {
  time: string;
  title: string;
  location: string;
  description: string;
  /** Font Awesome class, e.g. 'fa-solid fa-fire'. */
  icon: string;
}

export interface ScheduleDay {
  dayId: number;
  /** e.g. "Day 1". */
  label: string;
  /** ISO date. */
  date: string;
  /** e.g. "Ganesh Sthapana". */
  title: string;
  summary: string;
  highlight: boolean;
  items: ScheduleItem[];
}
