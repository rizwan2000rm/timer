import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { format } from "date-fns";
import "react-circular-progressbar/dist/styles.css";
import { TimerState } from "../shared/type";
import useCountdown from "../shared/hooks/useCountdown";
import { getLabelText } from "../shared/utils";

interface Props {
  timeInMilliseconds: number;
  handleComplete: () => void;
  timerState: TimerState;
  setTimerState: (state: TimerState) => void;
}

const Countdown = ({
  timeInMilliseconds,
  timerState,
  setTimerState,
  handleComplete,
}: Props) => {
  const { timeLeft, endTime } = useCountdown(
    timerState,
    setTimerState,
    timeInMilliseconds,
    handleComplete
  );

  const EndTime = (
    <div
      className={`flex items-center gap-1 text-sm pb-2 ${
        timerState === "paused" ? "text-[#252527]" : "text-zinc-300"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
      </svg>
      {format(new Date(endTime), "H:mm")}
    </div>
  );

  return (
    <div className="w-2/3 md:w-1/2 max-w-[500px] mx-auto">
      <CircularProgressbarWithChildren
        value={timeLeft}
        minValue={0}
        maxValue={timeInMilliseconds}
        strokeWidth={2}
        styles={buildStyles({
          textColor: "#FFF",
          pathColor: "#FB9F0D",
          trailColor: "#26252A",
        })}
      >
        <div className="w-full h-full flex flex-col items-center pt-[25%] md:pt-[30%]">
          {EndTime}
          <div className="text-5xl lg:text-8xl font-thin">
            {getLabelText(timeLeft)}
          </div>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default Countdown;
