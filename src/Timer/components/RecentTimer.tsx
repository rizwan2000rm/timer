import { RecentTimer } from "../shared/type";
import { getLabelText } from "../shared/utils";

interface Props {
  recentTimers: RecentTimer[];
  setRecentTimers: (timers: RecentTimer[]) => void;
  setDefaultTimeInMilliseconds: (defaultTimeInMilliseconds: number) => void;
  isTimerRunning: boolean;
}

const RecentTimers = ({
  recentTimers,
  setRecentTimers,
  setDefaultTimeInMilliseconds,
  isTimerRunning,
}: Props) => {
  const handleRun = (timeInMilliseconds: number) =>
    setDefaultTimeInMilliseconds(timeInMilliseconds);

  const handleDelete = (id: number) => {
    const newRecentTimers = recentTimers.filter((timer) => timer.id !== id);
    setRecentTimers(newRecentTimers);
  };

  if (recentTimers.length === 0) return <></>;

  return (
    <div className="w-full overflow-hidden">
      Recent
      <div className="flex gap-4 overflow-x-auto py-4">
        {recentTimers.map((timer, index) => (
          <div
            key={index}
            className="p-4 bg-zinc-900 text-zinc-400 rounded-lg w-[200px] h-[200px] grid place-items-center"
          >
            <span className="rounded-full border-4 border-zinc-700 w-32 h-32 flex items-center justify-center">
              {getLabelText(timer.timeInMilliseconds)}
            </span>
            <div className="flex justify-between w-full">
              <button
                onClick={() => handleDelete(timer.id)}
                className="bg-zinc-800 text-zinc-500 rounded-full p-2 outline-none focus-within:ring-2 ring-zinc-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                </svg>
              </button>
              <button
                onClick={() => handleRun(timer.timeInMilliseconds)}
                className="bg-green-900 text-green-500 rounded-full p-2 outline-none focus-within:ring-2 ring-green-500 disabled:cursor-not-allowed disabled:text-zinc-600"
                disabled={isTimerRunning}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTimers;
