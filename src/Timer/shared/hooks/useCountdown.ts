import { useEffect, useState } from "react";
import { TimerState } from "../type";
import {
  INTERVAL_IN_MILLISECONDS,
  LS_LEFT_TIME,
  LS_START_TIME,
} from "../const";
import { appendTimerDataToLocalStorage } from "../utils";

const useCountdown = (
  timerState: TimerState,
  setTimerState: (state: TimerState) => void,
  timeInMilliseconds: number,
  handleComplete: () => void
) => {
  const startTime = localStorage.getItem(LS_START_TIME);
  const timeLeftBeforeClosed = localStorage.getItem(LS_LEFT_TIME);
  const [timeLeft, setTimeLeft] = useState(timeInMilliseconds);
  const [referenceTime, setReferenceTime] = useState(Date.now());

  const [endTime, setEndTime] = useState(
    new Date(Date.now() + timeInMilliseconds)
  );

  useEffect(() => {
    if (startTime && timerState === "default") {
      runClockAheadIfRunning();
    } else if (timeLeftBeforeClosed && timerState === "paused") {
      setTimeLeft(+timeLeftBeforeClosed);
    } else {
      appendTimerDataToLocalStorage(timerState, timeInMilliseconds);
      localStorage.setItem(LS_START_TIME, String(Date.now()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // If Timer is paused - stop the decrements
    if (timerState === "paused") {
      return;
    }

    // If Timer is resumed - update end time, reference time and state of timer
    if (timerState === "resumed") {
      setEndTime(new Date(Date.now() + timeLeft));
      setReferenceTime(Date.now());
      setTimerState("default");
    }

    const countDownUntilZero = () => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          return 0;
        }

        const now = Date.now();
        const interval = now - referenceTime;
        setReferenceTime(now);
        return prevTime - interval;
      });
    };

    const timerId = setTimeout(countDownUntilZero, INTERVAL_IN_MILLISECONDS);
    localStorage.setItem(LS_LEFT_TIME, `${timeLeft}`);

    // to stop the timer and unmount the component
    if (timeLeft <= 0) return handleComplete();

    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, timerState]);

  const runClockAheadIfRunning = () => {
    const now = Date.now();
    const timeLeft = Number(startTime) + timeInMilliseconds - now;
    setTimeLeft(timeLeft);
    setReferenceTime(now);
    setTimerState("default");
    setEndTime(new Date(Date.now() + timeLeft));
  };

  return {
    timeLeft,
    endTime,
  };
};

export default useCountdown;
