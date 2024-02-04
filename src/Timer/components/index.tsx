import { useState } from "react";
import TimeInput from "./time-input";
import Countdown from "./countdown";
import useTimer from "../shared/hooks/useTimer";

const Timer = () => {
  // values of individual inputs
  const [hourValue, setHourValue] = useState("0");
  const [minuteValue, setMinuteValue] = useState("0");
  const [secondValue, setSecondValue] = useState("0");

  const {
    handleStart,
    handlePause,
    handleCancel,
    handleComplete,
    timerState,
    setTimerState,
    timeInMilliseconds,
    isTimerRunning,
  } = useTimer(hourValue, minuteValue, secondValue);

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
    <div className="flex justify-center items-center w-full h-[calc(100%-32px)]">
      <div className="flex flex-col md:flex-row justify-between items-center w-full h-full">
        <div className="hidden md:block">{CancelButton}</div>
        <div className="w-full h-full grid place-items-center">
          {TimerDisplay}
        </div>
        <div className="flex justify-between w-full md:w-auto">
          <div className="block md:hidden">{CancelButton}</div>
          {isTimerRunning ? PauseButton : StartButton}
        </div>
      </div>
    </div>
  );
};

export default Timer;
