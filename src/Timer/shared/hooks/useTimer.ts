import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { RecentTimer, TimerLocalStorage, TimerState } from "../type";
import {
  appendTimerDataToLocalStorage,
  convertTimeToMilliseconds,
} from "../utils";
import radar from "../assets/radar.mp3";
// @ts-expect-error Lib has no ts definitions
import useSound from "use-sound";
import { LS_LEFT_TIME, LS_START_TIME, LS_TIMER } from "../const";

const useTimer = (
  hourValue: string,
  minuteValue: string,
  secondValue: string,
  addToRecent: (timer: RecentTimer) => void
) => {
  // keeping a state for the total time in seconds for countdown
  const [timeInMilliseconds, setTimeInMilliseconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerState, setTimerState] = useState<TimerState>("default");

  // timer finish notification sound
  const [play] = useSound(radar);

  useEffect(() => {
    const timerData = localStorage.getItem(LS_TIMER);
    if (timerData) {
      const { timeInMilliseconds, timerState } = JSON.parse(
        timerData
      ) as TimerLocalStorage;
      setIsTimerRunning(true);
      setTimerState(timerState);
      setTimeInMilliseconds(timeInMilliseconds);
    }
  }, []);

  const handleCancel = () => {
    setIsTimerRunning(false);
    setTimerState("default");
    setTimeInMilliseconds(0);
    localStorage.removeItem(LS_TIMER);
    localStorage.removeItem(LS_START_TIME);
    localStorage.removeItem(LS_LEFT_TIME);
  };

  const handleComplete = () => {
    handleCancel();
    toast.success("Time's up!");
    play();
  };

  const handleStart = () => {
    const timeInMilliseconds = convertTimeToMilliseconds(
      hourValue,
      minuteValue,
      secondValue
    );
    setTimeInMilliseconds(timeInMilliseconds);
    setIsTimerRunning(true);
    addToRecent({
      id: Date.now(),
      timeInMilliseconds,
    });
  };

  const handlePause = () => {
    const newTimerState = timerState === "default" ? "paused" : "resumed";
    setTimerState(newTimerState);
    appendTimerDataToLocalStorage(newTimerState, timeInMilliseconds);
  };

  return {
    handleStart,
    handlePause,
    handleComplete,
    handleCancel,
    timerState,
    setTimerState,
    timeInMilliseconds,
    isTimerRunning,
    setIsTimerRunning,
    setTimeInMilliseconds,
  };
};

export default useTimer;
