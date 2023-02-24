import {
  GestureRecognizer,
  FilesetResolver,
  GestureRecognizerResult,
  Category,
  NormalizedLandmark,
  Landmark,
} from "@mediapipe/tasks-vision";
import {
  GESTURE_RECOGNIZER_TASK,
  WASM_FILES,
} from "./mediapipe-hands-constants";

export type HandednessCategoryName = "Left" | "Right";

export const createVideoGestureRecognizer = async ({ numHands = 2 } = {}) => {
  const runningMode = "VIDEO";

  const vision = await FilesetResolver.forVisionTasks(WASM_FILES);
  const gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: GESTURE_RECOGNIZER_TASK,
    },
    runningMode,
    numHands,
  });

  return gestureRecognizer;
};

interface HandDataItem {
  index: number;
  handedness?: Category;
  gesture?: Category;
  landmarks: NormalizedLandmark[];
  worldLandmarks: Landmark[];
}

export interface HandData {
  left?: HandDataItem;
  left2?: HandDataItem;

  right?: HandDataItem;
  right2?: HandDataItem;
}

function flipHandDataItem(
  handDataItem?: HandDataItem
): HandDataItem | undefined {
  if (!handDataItem) {
    return;
  }

  return {
    ...handDataItem,
    landmarks: handDataItem.landmarks.map((landmark) => {
      return {
        ...landmark,
        x: 1 - landmark.x,
      };
    }),
  };
}

function flipHandData(handData: HandData): HandData {
  return {
    left: flipHandDataItem(handData.right),
    left2: flipHandDataItem(handData.right2),
    right: flipHandDataItem(handData.left),
    right2: flipHandDataItem(handData.left2),
  };
}

function getIndexHandData({
  index,
  results,
}: {
  index: number;
  results: GestureRecognizerResult;
}): HandDataItem {
  return {
    index,
    handedness: getIndexHandedness({ index, results }) as Category,
    gesture: getIndexGesture({ index, results }) as Category,
    landmarks: results.landmarks[index],
    worldLandmarks: results.worldLandmarks[index],
  };
}

/**
 * Get hand data from gesture recongizer results
 *
 * NOTE: Assuming there are maximum 2 people ie, there can only ever be
 * a maximum of 2 left hands or 2 right hands
 */
export function getHandData({
  results,
  isFlipped,
}: {
  results?: GestureRecognizerResult;
  // Whether the hands are flipped around
  isFlipped?: boolean;
}): HandData | undefined {
  if (!results) {
    return;
  }

  const firstData = getIndexHandData({ index: 0, results });
  const secondData = getIndexHandData({ index: 1, results });

  let left;
  let left2;
  let right;
  let right2;
  if (firstData?.handedness?.categoryName === "Left") {
    left = firstData;
  } else if (firstData?.handedness?.categoryName === "Right") {
    right = firstData;
  }

  if (secondData?.handedness?.categoryName === "Left") {
    if (left) {
      left2 = secondData;
    } else {
      left = secondData;
    }
  } else if (secondData?.handedness?.categoryName === "Right") {
    if (right) {
      right2 = secondData;
    } else {
      right = secondData;
    }
  }

  const handData = {
    left,
    left2,
    right,
    right2,
  };

  return isFlipped ? flipHandData(handData) : handData;
}

export function getIndexLandmarks({
  index,
  results,
}: {
  index: number;
  results: GestureRecognizerResult;
}) {
  if (!results) {
    return undefined;
  }

  const landmarks = results.landmarks[index];
  if (landmarks) {
    return landmarks;
  }
}

export function getIndexHandedness({
  index,
  results,
}: {
  index: number;
  results: GestureRecognizerResult;
}) {
  if (!results) {
    return undefined;
  }

  const handedness = results.handednesses[index];
  if (handedness) {
    const [value] = handedness;
    return value;
  }
}

export function getIndexGesture({
  index,
  results,
}: {
  index: number;
  results: GestureRecognizerResult;
}) {
  if (!results) {
    return undefined;
  }

  const gesture = results.gestures[index];
  if (gesture) {
    const [value] = gesture;
    return value;
  }
}
