import { onMount, createSignal } from "solid-js";
import { startCamera } from "../../utils/camera-utils";
import {
  createVideoGestureRecognizer,
  getHandData,
} from "../../utils/mediapipe-tasks-vision";
import type {
  GestureRecognizerResult,
  NormalizedLandmark,
} from "@mediapipe/tasks-vision";
import { Coords2D, triangleCentroid } from "../../utils/math-utils";
import { HAND_LABEL_INDEX } from "../../utils/mediapipe-hands-constants";
import { DataPanel } from "../DataPanel/DataPanel";
import { initFluidSimulation } from "./webgl-fluid-simulation";

import styles from "./MagicHands.module.scss";
import { createTouchEvent } from "../../utils/touch-utils";
import { Dialog } from "../Dialog/Dialog";
import classnames from "classnames";
import { MadeBy } from "../Branding/MadeBy";

// Gesture `categoryName`s: ["None", "Closed_Fist", "Open_Palm", "Pointing_Up", "Thumb_Down", "Thumb_Up", "Victory", "ILoveYou"]
const GESTURE_MATCH = "Open_Palm";

const LEFT_HAND_EVENT_ID = -10;
const RIGHT_HAND_EVENT_ID = -11;

let mainElement: HTMLDivElement;
let videoElement: HTMLVideoElement;
let fluidCanvasElement: HTMLCanvasElement;

let previousTouches: TouchEvent[];

function getHandCentroid(landmarks?: NormalizedLandmark[]) {
  if (!landmarks) {
    return;
  }

  const wristCoords = landmarks[HAND_LABEL_INDEX.WRIST];
  const indexMCPCoords = landmarks[HAND_LABEL_INDEX.INDEX_FINGER_MCP];
  const pinkyMCPCoords = landmarks[HAND_LABEL_INDEX.PINKY_FINGER_MCP];
  return triangleCentroid(wristCoords, indexMCPCoords, pinkyMCPCoords);
}

function getTouch({
  pageX,
  pageY,
  identifier,
}: {
  pageX: number;
  pageY: number;
  identifier: number;
}) {
  return {
    identifier,
    pageX,
    pageY,
    screenX: pageX,
    screenY: pageY,
    clientX: pageX,
    clientY: pageY,
  };
}

function getPageCoords(normalizedCoord?: Coords2D) {
  if (!normalizedCoord) {
    return;
  }
  const pixelRatio = window.devicePixelRatio || 1;
  const screenWidth = fluidCanvasElement.width;
  const screenHeight = fluidCanvasElement.height;

  // Convert to screen cooordinates
  const pageX = (normalizedCoord.x * screenWidth) / pixelRatio;
  const pageY = (normalizedCoord.y * screenHeight) / pixelRatio;

  return {
    pageX,
    pageY,
  };
}

function getEvent(touches: TouchEvent[]) {
  if (!previousTouches) {
    previousTouches = [];
  }

  if (previousTouches.length && previousTouches.length >= touches.length) {
    return createTouchEvent({
      type: "touchmove",
      touches,
    });
  } else {
    return createTouchEvent({
      type: "touchstart",
      touches,
    });
  }
}

function processResults({
  results,
  fluidSimulation,
  isFlipped,
}: {
  results: GestureRecognizerResult;
  fluidSimulation: ReturnType<typeof initFluidSimulation>;
  isFlipped?: boolean;
}) {
  const currentHandData = getHandData({ results, isFlipped });

  const touches: TouchEvent[] = [];

  if (currentHandData?.left?.gesture?.categoryName === GESTURE_MATCH) {
    const handMiddleCoords = getHandCentroid(currentHandData?.left?.landmarks);
    const pageCoords = getPageCoords(handMiddleCoords);

    if (pageCoords?.pageX && pageCoords?.pageY) {
      const touch = getTouch({
        pageX: pageCoords.pageX,
        pageY: pageCoords.pageY,
        identifier: LEFT_HAND_EVENT_ID,
      });
      touches.push(touch as any);
    }
  }
  if (currentHandData?.right?.gesture?.categoryName === GESTURE_MATCH) {
    const handMiddleCoords = getHandCentroid(currentHandData?.right?.landmarks);
    const pageCoords = getPageCoords(handMiddleCoords);

    if (pageCoords?.pageX && pageCoords?.pageY) {
      const touch = getTouch({
        pageX: pageCoords.pageX,
        pageY: pageCoords.pageY,
        identifier: RIGHT_HAND_EVENT_ID,
      });
      touches.push(touch as any);
    }
  }

  const event = getEvent(touches);
  if (event.type === "touchstart") {
    fluidSimulation.sendTouchStart(event as TouchEvent);
  } else if (event.type === "touchmove") {
    fluidSimulation.sendTouchMove(event as TouchEvent);
  } else if (event.type === "touchend") {
    fluidSimulation.sendTouchEnd(event as TouchEvent);
  }

  previousTouches = touches;
}

export const MagicHands = () => {
  const isDebug =
    new URLSearchParams(window.location.search).get("debug") === "true";
  const [gestureResults, setGestureResults] =
    createSignal<GestureRecognizerResult>();
  const [showDialog, setShowDialog] = createSignal(false);

  onMount(async () => {
    const fluidSimulation = initFluidSimulation({
      canvasEl: fluidCanvasElement,
    });

    const gestureRecognizer = await createVideoGestureRecognizer();
    const processWebcam = async () => {
      let nowInMs = Date.now();
      const results = await gestureRecognizer.recognizeForVideo(
        videoElement,
        nowInMs
      );

      processResults({ results, fluidSimulation, isFlipped: true });
      setGestureResults(results);

      // Continue processing webcam
      requestAnimationFrame(processWebcam);
    };

    startCamera({
      videoElement,
      onLoad: processWebcam,
    });
  });

  return (
    <main ref={mainElement}>
      {isDebug && <DataPanel results={gestureResults()} />}

      <video
        ref={videoElement}
        id={styles.inputVideo}
        autoplay
        playsinline
      ></video>
      <canvas ref={fluidCanvasElement} id={styles.fluidCanvas}></canvas>

      <button
        class={classnames("unstyledButton", styles.infoButton, {
          [styles.hide]: showDialog(),
        })}
        onClick={() => setShowDialog(true)}
      >
        <i class="ph ph-info"></i>
      </button>

      <Dialog
        class={styles.dialog}
        showDialog={showDialog()}
        setShowDialog={setShowDialog}
      >
        <h1>Magic Hands 🙌🏼</h1>
        <p>
          Magic Hands is a digital toy to play with hand movement and computer
          graphics.
        </p>
        <p>
          <em>
            Turn on your camera, and move your hands to create some magical
            visuals
          </em>
          &nbsp;🎆
        </p>
        <p>
          It is a remix of human crafted{" "}
          <a href="https://github.com/PavelDoGreat/WebGL-Fluid-Simulation">
            fluid simulation
          </a>{" "}
          and machine crafted{" "}
          <a href="https://mediapipe-studio.webapps.google.com/demo/gesture_recognizer">
            hand and gesture recognition
          </a>
          .
        </p>
      </Dialog>

      <footer class={classnames(styles.footer)}>
        <MadeBy />
      </footer>
    </main>
  );
};
