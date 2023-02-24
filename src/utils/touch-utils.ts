type TouchType = "touchstart" | "touchmove" | "touchend";

export function createTouchEvent({
  type,
  touches,
}: {
  type: TouchType;
  touches: TouchEvent[];
}): TouchEvent {
  const event = document.createEvent("Event");
  event.initEvent(type, true, true);
  event.constructor.name; // Event (not TouchEvent)
  event.touches = touches;
  event.targetTouches = touches;
  event.changedTouches = touches;

  return event as TouchEvent;
}
