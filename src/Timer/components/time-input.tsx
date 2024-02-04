import { PickerItem } from "./picker-item";
import "../shared/css/embla.css";

type Props = {
  hourValue: string;
  setHourValue: (value: string) => void;
  minuteValue: string;
  setMinuteValue: (value: string) => void;
  secondValue: string;
  setSecondValue: (value: string) => void;
};

const TimeInput = ({
  hourValue,
  setHourValue,
  minuteValue,
  setMinuteValue,
  secondValue,
  setSecondValue,
}: Props) => {
  const hourItems = Array.from({ length: 24 }, (_, index) => ({
    value: `${index}`,
    label: `${index}`,
  }));

  const minuteItems = Array.from({ length: 60 }, (_, index) => ({
    value: `${index}`,
    label: `${index}`,
  }));

  return (
    <div className="embla w-full max-w-96">
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
