import type { NormalizedLandmark } from "@mediapipe/tasks-vision";
import { CanvasStyles, drawCircle, drawLine } from "./canvas";
import { HAND_CONNECTIONS } from "./mediapipe-hands-constants";
import type { HandData } from "./mediapipe-tasks-vision";

const DEFAULT_LANDMARK_RADIUS = 2;

// An array of index tuples, for how the landmarks are connected
type LandmarkConnectionArray = Array<[number, number]>;

type LandmarkStyles = CanvasStyles & {
  radius?: number;
};

export function createHandsDrawer({
  canvasElement,
  canvasCtx,
}: {
  canvasElement: HTMLCanvasElement;
  canvasCtx: CanvasRenderingContext2D;
}) {
  function drawConnectors({
    landmarks,
    connections,
    styles,
  }: {
    landmarks?: NormalizedLandmark[];
    connections?: LandmarkConnectionArray;
    styles?: CanvasStyles;
  }) {
    if (!landmarks) {
      return;
    }
    connections?.forEach(([index1, index2]) => {
      const landmark1 = landmarks[index1];
      const landmark2 = landmarks[index2];
      const point1 = {
        x: landmark1.x * canvasElement.width,
        y: landmark1.y * canvasElement.height,
      };
      const point2 = {
        x: landmark2.x * canvasElement.width,
        y: landmark2.y * canvasElement.height,
      };

      drawLine({
        canvasCtx,
        point1,
        point2,
        styles,
      });
    });
  }

  function drawLandmarks({
    landmarks,
    styles,
  }: {
    landmarks?: NormalizedLandmark[];
    styles?: LandmarkStyles;
  }) {
    if (!landmarks) {
      return;
    }

    const radius = styles?.radius ?? DEFAULT_LANDMARK_RADIUS;

    landmarks.forEach(({ x, y }) => {
      const midpoint = {
        x: x * canvasElement.width,
        y: y * canvasElement.height,
      };
      drawCircle({ canvasCtx, midpoint, radius, styles });
    });
  }

  function drawHand({
    landmarks,
    connectorStyles = {
      strokeStyle: "#00FF00",
      lineWidth: 2,
    },
    landmarkStyles = {
      fillStyle: "#FF0000",
    },
  }: {
    landmarks: NormalizedLandmark[];
    connectorStyles?: CanvasStyles;
    landmarkStyles?: LandmarkStyles;
  }) {
    drawConnectors({
      landmarks,
      connections: HAND_CONNECTIONS,
      styles: connectorStyles,
    });
    drawLandmarks({ landmarks, styles: landmarkStyles });
  }

  function drawHands({
    handData,
    connectorStyles,
    landmarkStyles,
  }: {
    handData?: HandData;
    connectorStyles?: CanvasStyles;
    landmarkStyles?: LandmarkStyles;
  }) {
    if (!handData || !canvasElement) {
      return;
    }

    const leftLandmarks = handData?.left?.landmarks;
    if (leftLandmarks) {
      drawHand({
        landmarks: leftLandmarks,
        connectorStyles,
        landmarkStyles,
      });
    }
    const rightLandmarks = handData?.right?.landmarks;
    if (rightLandmarks) {
      drawHand({
        landmarks: rightLandmarks,
        connectorStyles,
        landmarkStyles,
      });
    }
  }

  return {
    drawHands,
  };
}
