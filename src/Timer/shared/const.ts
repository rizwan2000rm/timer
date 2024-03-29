export const CIRCLE_DEGREES = 360;
export const WHEEL_ITEM_SIZE = 30;
export const WHEEL_ITEM_COUNT = 18;
export const WHEEL_ITEMS_IN_VIEW = 4;

export const WHEEL_ITEM_RADIUS = CIRCLE_DEGREES / WHEEL_ITEM_COUNT;
export const IN_VIEW_DEGREES = WHEEL_ITEM_RADIUS * WHEEL_ITEMS_IN_VIEW;
export const WHEEL_RADIUS = Math.round(
  WHEEL_ITEM_SIZE / 2 / Math.tan(Math.PI / WHEEL_ITEM_COUNT)
);

export const INTERVAL_IN_MILLISECONDS = 100;

export const LS_TIMER = "timer";
export const LS_START_TIME = "time_start_time";
export const LS_LEFT_TIME = "time_left_time";
export const LS_RECENT_TIMERS = "recent_timers";
