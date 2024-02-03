import { Toaster } from "react-hot-toast";
import Timer from "./Timer/components";

const App = () => (
  <div className="bg-black h-screen w-screen text-white">
    <div className="max-w-[1200px] mx-auto p-4 h-full">
      <h1 className="text-center text-2xl">Timers</h1>
      <Timer />
    </div>
    <Toaster
      position="top-right"
      toastOptions={{
        success: {
          duration: 3000,
          style: {
            background: "#0B2912",
            color: "#27D351",
          },
        },
      }}
    />
  </div>
);

export default App;
