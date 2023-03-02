import type { Coords2D } from "./math-utils";

export interface CanvasStyles {
  fillStyle?: string | CanvasGradient | CanvasPattern;
  strokeStyle?: string | CanvasGradient | CanvasPattern;
  lineWidth?: number;
}

export function getExistingStyles(
  canvasCtx: CanvasRenderingContext2D
): CanvasStyles {
  return {
    fillStyle: canvasCtx.fillStyle,
    lineWidth: canvasCtx.lineWidth,
    strokeStyle: canvasCtx.strokeStyle,
  };
}

export function setStyles(
  canvasCtx: CanvasRenderingContext2D,
  styles?: CanvasStyles
) {
  if (!styles) {
    return;
  }

  Object.keys(styles).forEach((key) => {
    const style = styles[key as keyof CanvasStyles];
    if (style) {
      // @ts-ignore
      canvasCtx[key] = style;
    }
  });
}

export function drawCircle({
  canvasCtx,
  midpoint,
  radius,
  styles,
}: {
  canvasCtx: CanvasRenderingContext2D;
  midpoint: Coords2D;
  radius: number;
  styles?: CanvasStyles;
}) {
  const existingStyles = getExistingStyles(canvasCtx);
  setStyles(canvasCtx, styles);

  const circle = new Path2D();
  circle.arc(midpoint.x, midpoint.y, radius, 0, 2 * Math.PI);
  canvasCtx.fill(circle);

  setStyles(canvasCtx, existingStyles);
}

export function drawLine({
  canvasCtx,
  point1,
  point2,
  styles,
}: {
  canvasCtx: CanvasRenderingContext2D;
  point1: Coords2D;
  point2: Coords2D;
  styles?: CanvasStyles;
}) {
  const existingStyles = getExistingStyles(canvasCtx);
  setStyles(canvasCtx, styles);

  canvasCtx.beginPath();
  canvasCtx.moveTo(point1.x, point1.y);
  canvasCtx.lineTo(point2.x, point2.y);
  canvasCtx.stroke();

  setStyles(canvasCtx, existingStyles);
}
