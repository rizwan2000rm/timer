import { EmblaCarouselType } from "embla-carousel-react";
import {
  CIRCLE_DEGREES,
  IN_VIEW_DEGREES,
  LS_TIMER,
  WHEEL_ITEM_RADIUS,
  WHEEL_RADIUS,
} from "./const";
import { TimerState } from "./type";

export const isInView = (
  wheelLocation: number,
  slidePosition: number
): boolean => Math.abs(wheelLocation - slidePosition) < IN_VIEW_DEGREES;

export const getContainerStyles = (
  wheelRotation: number
): Pick<SlideStylesType, "transform"> => ({
  transform: `translateZ(${WHEEL_RADIUS}px) rotateX(${wheelRotation}deg)`,
});

type SlideStylesType = {
  opacity: number;
  transform: string;
};

const getSlideStyles = (
  emblaApi: EmblaCarouselType,
  index: number,
  loop: boolean,
  slideCount: number,
  totalRadius: number
): SlideStylesType => {
  const wheelLocation = emblaApi.scrollProgress() * totalRadius;
  const positionDefault = emblaApi.scrollSnapList()[index] * totalRadius;
  const positionLoopStart = positionDefault + totalRadius;
  const positionLoopEnd = positionDefault - totalRadius;

  let inView = false;
  let angle = index * -WHEEL_ITEM_RADIUS;

  if (isInView(wheelLocation, positionDefault)) {
    inView = true;
  }

  if (loop && isInView(wheelLocation, positionLoopEnd)) {
    inView = true;
    angle = -CIRCLE_DEGREES + (slideCount - index) * WHEEL_ITEM_RADIUS;
  }

  if (loop && isInView(wheelLocation, positionLoopStart)) {
    inView = true;
    angle = -(totalRadius % CIRCLE_DEGREES) - index * WHEEL_ITEM_RADIUS;
  }

  if (inView) {
    return {
      opacity: 1,
      transform: `rotateX(${angle}deg) translateZ(${WHEEL_RADIUS}px)`,
    };
  }
  return { opacity: 0, transform: "none" };
};

export const getItemValuesStyles = (
  emblaApi: EmblaCarouselType | undefined,
  loop: boolean,
  items: Array<{ label: string; value: string }>,
  totalRadius: number
): Array<{
  label: string;
  value: string;
  opacity: number;
  transform: string;
}> => {
  return items?.map((item, index) => {
    return emblaApi
      ? {
          ...item,
          ...getSlideStyles(emblaApi, index, loop, items.length, totalRadius),
        }
      : { ...item, opacity: 0, transform: "none" };
  });
};

export const convertTimeToMilliseconds = (
  hours: string,
  minutes: string,
  seconds: string
) => {
  const hoursAsInt = parseInt(hours);
  const minutesAsInt = parseInt(minutes);
  const secondsAsInt = parseInt(seconds);

  return (
    hoursAsInt * 60 * 60 * 1000 + minutesAsInt * 60 * 1000 + secondsAsInt * 1000
  );
};

export const getLabelText = (millisecondsLeft: number) => {
  const secondsLeft = millisecondsLeft / 1000;

  if (secondsLeft < 0) return "00:00:00";
  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft - hours * 3600) / 60);
  const seconds = Math.floor(secondsLeft - hours * 3600 - minutes * 60);

  if (hours === 0)
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

  return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const appendTimerDataToLocalStorage = (
  timerState: TimerState,
  timeInMilliseconds: number
) => {
  localStorage.setItem(
    LS_TIMER,
    JSON.stringify({
      timerState,
      timeInMilliseconds,
    })
  );
};
