import type {
  DrawingOptions,
  drawConnectors as DrawConnectors,
  drawLandmarks as DrawLandmarks,
} from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS, NormalizedLandmark } from "@mediapipe/hands";
import { Component, onMount, createEffect } from "solid-js";
import type { HandData } from "../../utils/mediapipe-tasks-vision";

declare const drawConnectors: typeof DrawConnectors;
declare const drawLandmarks: typeof DrawLandmarks;

interface VisualLandmarksProps {
  handData?: HandData;
  width: number;
  height: number;
}

function drawHand({
  canvasCtx,
  landmarks,
  connectorStyles = {
    color: "#00FF00",
    lineWidth: 2,
  },
  landmarkStyles = {
    color: "#FF0000",
    lineWidth: 0,
    radius: 2,
  },
}: {
  canvasCtx: CanvasRenderingContext2D;
  landmarks: NormalizedLandmark[];
  connectorStyles?: DrawingOptions;
  landmarkStyles?: DrawingOptions;
}) {
  drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, connectorStyles);
  drawLandmarks(canvasCtx, landmarks, landmarkStyles);
}

function drawHands({
  canvasCtx,
  handData,
  connectorStyles,
  landmarkStyles,
}: {
  canvasCtx: CanvasRenderingContext2D;
  handData?: HandData;
  connectorStyles?: DrawingOptions;
  landmarkStyles?: DrawingOptions;
}) {
  if (!handData) {
    return;
  }

  const leftLandmarks = handData?.left?.landmarks;
  if (leftLandmarks) {
    drawHand({
      canvasCtx,
      landmarks: leftLandmarks,
      connectorStyles,
      landmarkStyles,
    });
  }
  const rightLandmarks = handData?.right?.landmarks;
  if (rightLandmarks) {
    drawHand({
      canvasCtx,
      landmarks: rightLandmarks,
      connectorStyles,
      landmarkStyles,
    });
  }
}

let canvasElement: HTMLCanvasElement;
export const VisualLandmarks: Component<VisualLandmarksProps> = (props) => {
  onMount(() => {
    const canvasCtx = canvasElement.getContext("2d");

    createEffect(() => {
      if (!canvasCtx) {
        return;
      }
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, props.width, props.height);

      drawHands({ canvasCtx, handData: props.handData });
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
