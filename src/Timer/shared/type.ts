export type TimerState = "default" | "paused" | "resumed";

export type TimerLocalStorage = {
  timeInMilliseconds: number;
  timerState: TimerState;
  timeLeft: number;
};
