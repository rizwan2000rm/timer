import { useState } from "react";
import { convertTimeToMilliseconds } from "../shared/utils";
import TimeInput from "./time-input";
import Countdown from "./countdown";
import toast from "react-hot-toast";
// @ts-expect-error Lib has no ts definitions
import useSound from "use-sound";
import radar from "../shared/assets/radar.mp3";
import { TimerState } from "../shared/type";

const Timer = () => {
  // values of individual inputs
  const [hourValue, setHourValue] = useState("0");
  const [minuteValue, setMinuteValue] = useState("0");
  const [secondValue, setSecondValue] = useState("0");

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

  const CancelButton = (
    <button
      className="bg-zinc-900 text-zinc-200 rounded-full w-24 h-24 outline-none focus-within:ring-2 ring-zinc-600 disabled:cursor-not-allowed disabled:text-zinc-600"
      disabled={!isTimerRunning}
      onClick={handleCancel}
    >
      Cancel
    </button>
  );

  const StartButton = (
    <button
      className="bg-green-950 text-green-500 rounded-full w-24 h-24 outline-none focus-within:ring-2 ring-green-500 disabled:cursor-not-allowed disabled:text-zinc-600"
      disabled={hourValue === "0" && minuteValue === "0" && secondValue === "0"}
      onClick={handleStart}
    >
      Start
    </button>
  );

  const PauseButton = (
    <button
      className="bg-green-950 text-green-500 rounded-full w-24 h-24 outline-none focus-within:ring-2 ring-green-500 disabled:cursor-not-allowed disabled:text-zinc-600"
      onClick={handlePause}
    >
      {timerState === "paused" ? "Resume" : "Pause"}
    </button>
  );

  const TimerDisplay = isTimerRunning ? (
    <Countdown
      timeInMilliseconds={timeInMilliseconds}
      handleComplete={handleComplete}
      timerState={timerState}
      setTimerState={setTimerState}
    />
  ) : (
    <TimeInput
      hourValue={hourValue}
      setHourValue={setHourValue}
      minuteValue={minuteValue}
      setMinuteValue={setMinuteValue}
      secondValue={secondValue}
      setSecondValue={setSecondValue}
    />
  );

  return (
    <div className="grid place-items-center w-full h-full">
      <div className="flex justify-between items-center w-full h-full">
        {CancelButton}
        {TimerDisplay}
        {isTimerRunning ? PauseButton : StartButton}
      </div>
    </div>
  );
};

export default Timer;