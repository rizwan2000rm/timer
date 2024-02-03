import { useEffect, useState, useCallback, useRef } from "react";
import { flushSync } from "react-dom";
import useEmblaCarousel from "embla-carousel-react";
import { WHEEL_ITEM_RADIUS, WHEEL_ITEM_SIZE } from "../shared/const";
import { getContainerStyles, getItemValuesStyles } from "../shared/utils";

type Props = {
  loop?: boolean;
  value: string;
  onValueChange: (value: string) => void;
  items: { label: string; value: string }[];
};

export const PickerItem = ({
  value,
  items,
  loop = false,
  onValueChange,
}: Props) => {
  const slideCount = items.length ?? 0;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    axis: "y",
    dragFree: true,
  });
  const [wheelReady, setWheelReady] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const rootNodeRef = useRef<HTMLDivElement>(null);
  const rootNodeSize = useRef(0);
  const totalRadius = slideCount * WHEEL_ITEM_RADIUS;
  const rotationOffset = loop ? 0 : WHEEL_ITEM_RADIUS;
  const containerStyles = getContainerStyles(wheelRotation);
  const itemValues = getItemValuesStyles(
    emblaApi,
    loop,
    items || [],
    totalRadius
  );

  const inactivateEmblaTransform = useCallback(() => {
    if (!emblaApi) return;
    const { translate, slideLooper } = emblaApi.internalEngine();
    translate.clear();
    translate.toggleActive(false);
    slideLooper.loopPoints.forEach(({ translate }) => {
      translate.clear();
      translate.toggleActive(false);
    });
  }, [emblaApi]);

  const readRootNodeSize = useCallback(() => {
    if (!emblaApi) return 0;
    return emblaApi.rootNode().getBoundingClientRect().height;
  }, [emblaApi]);

  const rotateWheel = useCallback(() => {
    if (!emblaApi) return;
    const rotation = slideCount * WHEEL_ITEM_RADIUS - rotationOffset;
    setWheelRotation(rotation * emblaApi.scrollProgress());
  }, [emblaApi, slideCount, rotationOffset, setWheelRotation]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.scrollTo(
      items.findIndex((v) => v.value === value),
      false
    );

    emblaApi.on("select", () => {
      if (emblaApi.selectedScrollSnap() < itemValues?.length) {
        onValueChange(itemValues[emblaApi.selectedScrollSnap()].value);
      }
    });

    rootNodeSize.current = readRootNodeSize();

    emblaApi.on("pointerUp", () => {
      const { scrollTo, target, location } = emblaApi.internalEngine();
      const diffToTarget = target.get() - location.get();
      const factor = Math.abs(diffToTarget) < WHEEL_ITEM_SIZE / 3 ? 20 : 0.1;
      const distance = diffToTarget * factor;
      scrollTo.distance(distance, true);
    });

    emblaApi.on("scroll", () => {
      flushSync(() => rotateWheel());
    });

    emblaApi.on("resize", () => {
      const newRootNodeSize = readRootNodeSize();
      if (rootNodeSize.current === newRootNodeSize) return;

      rootNodeSize.current = newRootNodeSize;
      flushSync(() => setWheelReady(false));

      setWheelReady(() => {
        emblaApi.reInit();
        inactivateEmblaTransform();
        rotateWheel();
        return true;
      });
    });

    setWheelReady(true);
    inactivateEmblaTransform();
    rotateWheel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emblaApi, inactivateEmblaTransform, readRootNodeSize, rotateWheel]);

  const handleClick = (index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  };

  return (
    <div className="embla__ios-picker">
      <div className="embla__ios-picker__scene" ref={rootNodeRef}>
        <div className={`embla__ios-picker__viewport`} ref={emblaRef}>
          <div
            className="embla__ios-picker__container"
            style={wheelReady ? containerStyles : { transform: "none" }}
          >
            {itemValues.map((item, index) => (
              <div
                className="embla__ios-picker__slide"
                key={item.value}
                onClick={() => handleClick(index)}
                style={
                  wheelReady
                    ? {
                        opacity: item?.opacity,
                        transform: item?.transform,
                        textAlign: "right",
                      }
                    : {
                        position: "static",
                        transform: "none",
                        textAlign: "left",
                      }
                }
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
