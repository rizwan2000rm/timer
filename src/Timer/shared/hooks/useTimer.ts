import toast from "react-hot-toast";
import { useState } from "react";
import { TimerState } from "../type";
import { convertTimeToMilliseconds } from "../utils";
import radar from "../assets/radar.mp3";
// @ts-expect-error Lib has no ts definitions
import useSound from "use-sound";

const useTimer = (
  hourValue: string,
  minuteValue: string,
  secondValue: string
) => {
  // keeping a state for the total time in seconds for countdown
  const [timeInMilliseconds, setTimeInMilliseconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerState, setTimerState] = useState<TimerState>("default");

  // timer finish notification sound
  const [play] = useSound(radar);

  const handleCancel = () => {
    setIsTimerRunning(false);
    setTimerState("default");
    setTimeInMilliseconds(0);
    localStorage.removeItem("timer");
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
  };

  const handlePause = () => {
    setTimerState(timerState === "default" ? "paused" : "resumed");
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
  };
};

export default useTimer;
