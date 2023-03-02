// `node_modules/@mediapipe/tasks-vision/wasm` copied to `public` folder
export const WASM_FILES = "/@mediapipe/tasks-vision/wasm";
export const GESTURE_RECOGNIZER_TASK =
  "/mediapipe/tasks-vision/gesture_recognizer.task";

export const HAND_LABEL_INDEX = {
  WRIST: 0,
  THUMB_CMC: 1,
  THUMB_MCP: 2,
  THUMB_IP: 3,
  THUMB_TIP: 4,
  INDEX_FINGER_MCP: 5,
  INDEX_FINGER_PIP: 6,
  INDEX_FINGER_DIP: 7,
  INDEX_FINGER_TIP: 8,
  MIDDLE_FINGER_MCP: 9,
  MIDDLE_FINGER_PIP: 10,
  MIDDLE_FINGER_DIP: 11,
  MIDDLE_FINGER_TIP: 12,
  RING_FINGER_MCP: 13,
  RING_FINGER_PIP: 14,
  RING_FINGER_DIP: 15,
  RING_FINGER_TIP: 16,
  PINKY_FINGER_MCP: 17,
  PINKY_FINGER_PIP: 18,
  PINKY_FINGER_DIP: 19,
  PINKY_FINGER_TIP: 20,
};

export type HandLabels = keyof typeof HAND_LABEL_INDEX;

export type LandmarkConnectionArray = Array<[number, number]>;
export const HAND_CONNECTIONS: LandmarkConnectionArray = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [5, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [9, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  [13, 17],
  [0, 17],
  [17, 18],
  [18, 19],
  [19, 20],
];
