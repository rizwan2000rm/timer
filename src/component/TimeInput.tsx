import { useState } from "react";
import { PickerItem } from "./PickerItem";
import "../assets/css/embla.css";

const TimeInput = () => {
  const [hourValue, setHourValue] = useState("0");
  const [minuteValue, setMinuteValue] = useState("00");
  const [secondValue, setSecondValue] = useState("00");

  const hourItems = Array.from({ length: 24 }, (_, index) => ({
    value: `${index}`,
    label: `${index}`,
  }));

  const minuteItems = Array.from({ length: 60 }, (_, index) => ({
    value: `${index.toString().padStart(2, "0")}`,
    label: `${index.toString().padStart(2, "0")}`,
  }));

  return (
    <div className="embla">
      <div className="embla-highlight"></div>
      <PickerItem
        value={hourValue}
        items={hourItems}
        onValueChange={setHourValue}
      />

      <PickerItem
        value={minuteValue}
        items={minuteItems}
        onValueChange={setMinuteValue}
      />

      <PickerItem
        value={secondValue}
        items={minuteItems}
        onValueChange={setSecondValue}
      />
    </div>
  );
};

export default TimeInput;
