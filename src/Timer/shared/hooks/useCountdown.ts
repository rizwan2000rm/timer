import { useEffect, useState } from "react";
import { TimerState } from "../type";
import { INTERVAL_IN_MILLISECONDS } from "../const";

const useCountdown = (
  timerState: TimerState,
  setTimerState: (state: TimerState) => void,
  timeInMilliseconds: number,
  handleComplete: () => void
) => {
  const [timeLeft, setTimeLeft] = useState(timeInMilliseconds);
  const [referenceTime, setReferenceTime] = useState(Date.now());

  const [endTime, setEndTime] = useState(
    new Date(Date.now() + timeInMilliseconds)
  );

  const secondsLeft = +(timeLeft / 1000).toFixed(1);

  useEffect(() => {
    // If Timer is paused - stop the decrements
    if (timerState === "paused") {
      return;
    }

    // If Timer is resumed - update end time, reference time and state of timer
    if (timerState === "resumed") {
      setEndTime(new Date(Date.now() + secondsLeft * 1000));
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

    // to stop the timer and unmount the component
    if (timeLeft <= 0) return handleComplete();

    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, timerState]);

  return {
    timeLeft,
    endTime,
    secondsLeft,
  };
};

export default useCountdown;
