import { useEffect, useState } from "react";
import { INTERVAL_IN_MILLISECONDS } from "../shared/const";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { getLabelText } from "../shared/utils";
import { format } from "date-fns";
import "react-circular-progressbar/dist/styles.css";
import { TimerState } from "../shared/type";

interface Props {
  timeInMilliseconds: number;
  handleComplete: () => void;
  timerState: TimerState;
  setTimerState: (state: TimerState) => void;
}

const Countdown = ({
  timeInMilliseconds,
  handleComplete,
  timerState,
  setTimerState,
}: Props) => {
  const [currentTime, setCurrentTime] = useState(timeInMilliseconds);
  const [startTime] = useState(Date.now());
  const [referenceTime, setReferenceTime] = useState(Date.now());

  const secondsLeft = +(currentTime / 1000).toFixed(1);

  useEffect(() => {
    if (timerState === "paused") {
      return;
    }

    if (timerState === "resumed") {
      setReferenceTime(Date.now());
      setTimerState("default");
    }

    const countDownUntilZero = () => {
      setCurrentTime((prevTime) => {
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
    if (currentTime <= 0) return handleComplete();

    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime, timerState]);

  return (
    <div className="w-1/2 max-w-[500px]">
      <CircularProgressbarWithChildren
        value={secondsLeft}
        minValue={0}
        maxValue={timeInMilliseconds / 1000}
        strokeWidth={2}
        styles={buildStyles({
          textColor: "#FFF",
          pathColor: "#FB9F0D",
          trailColor: "#26252A",
        })}
      >
        <div className="w-full h-full flex flex-col items-center pt-[30%]">
          <div className="flex items-center gap-1 text-sm text-[#252527] pb-2">
            <img className="w-4 h-4" src="/bell.png" alt="bell" />
            {format(new Date(startTime + timeInMilliseconds), "H:mm")}
          </div>

          <div className="text-8xl font-thin">{getLabelText(secondsLeft)}</div>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default Countdown;
