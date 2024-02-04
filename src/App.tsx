import { Toaster } from "react-hot-toast";
import Timer from "./Timer/components";

const App = () => {
  return (
    <div className="bg-black h-screen w-screen text-white p-4">
      <Timer />
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
};

export default App;
