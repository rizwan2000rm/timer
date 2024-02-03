import { EmblaCarouselType } from "embla-carousel-react";
import {
  CIRCLE_DEGREES,
  IN_VIEW_DEGREES,
  WHEEL_ITEM_RADIUS,
  WHEEL_RADIUS,
} from "./const";

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
