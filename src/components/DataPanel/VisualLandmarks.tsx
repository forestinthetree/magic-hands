import { Component, onMount, createEffect } from "solid-js";
import { createHandsDrawer } from "../../utils/create-hands-drawer";
import type { HandData } from "../../utils/mediapipe-tasks-vision";

interface VisualLandmarksProps {
  handData?: HandData;
  width: number;
  height: number;
}

let canvasElement: HTMLCanvasElement;
export const VisualLandmarks: Component<VisualLandmarksProps> = (props) => {
  onMount(() => {
    const canvasCtx = canvasElement.getContext("2d");
    if (!canvasCtx) {
      return;
    }

    const handsDrawer = createHandsDrawer({
      canvasElement,
      canvasCtx,
    });

    createEffect(() => {
      if (!canvasCtx) {
        return;
      }
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, props.width, props.height);

      handsDrawer.drawHands({ handData: props.handData });
    });
  });

  return (
    <canvas
      ref={canvasElement}
      width={props.width}
      height={props.height}
    ></canvas>
  );
};
