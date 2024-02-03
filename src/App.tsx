import TimeInput from "./component/TimeInput";

const App = () => {
  const CancelButton = (
    <button className="bg-zinc-900 text-zinc-600 rounded-full w-24 h-24 hover:opacity-80 outline-none focus-within:ring-2 ring-zinc-600">
      Cancel
    </button>
  );

  const StartButton = (
    <button className="bg-green-950 text-green-500 rounded-full w-24 h-24 hover:opacity-80 outline-none focus-within:ring-2 ring-green-500">
      Start
    </button>
  );

  return (
    <div className="bg-black h-screen w-screen text-white p-4">
      <h1 className="text-center">Timers</h1>
      <div className="grid place-items-center h-full">
        <div className="flex justify-between items-center w-full">
          {CancelButton}
          <TimeInput />
          {StartButton}
        </div>
      </div>
    </div>
  );
};

export default App;
