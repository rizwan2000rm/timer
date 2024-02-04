export type TimerState = "default" | "paused" | "resumed";

export type TimerLocalStorage = {
  timeInMilliseconds: number;
  timerState: TimerState;
};

export type RecentTimer = {
  id: number;
  timeInMilliseconds: number;
};
