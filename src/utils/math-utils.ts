export interface Coords2D {
  x: number;
  y: number;
}

export function midpoint(
  { x: x1, y: y1 }: Coords2D,
  { x: x2, y: y2 }: Coords2D
): Coords2D {
  return {
    x: (x1 + x2) / 2,
    y: (y1 + y2) / 2,
  };
}

export function toRoundedPercentage(num?: number) {
  if (num === undefined) {
    return;
  }

  return Math.round(num * 100);
}

/**
 * Find the middle point of a triangle
 */
export function triangleCentroid(
  p1: Coords2D,
  p2: Coords2D,
  p3: Coords2D
): Coords2D {
  const midpointP1P2 = midpoint(p1, p2);
  // Formula of midpoint p1-p2 and p3 line: (a1 * x) + (b1 * y) + c1 = 0
  const a1 = (p3.y - midpointP1P2.y) / (p3.x - midpointP1P2.x);
  const b1 = -1;
  const c1 = midpointP1P2.y - midpointP1P2.x * a1;

  const midpointP1P3 = midpoint(p1, p3);
  // Formula of midpoint p1-p3 and p2 line: (a2 * x) + (b2 * y) + c2 = 0
  const a2 = (p2.y - midpointP1P3.y) / (p2.x - midpointP1P3.x);
  const b2 = -1;
  const c2 = midpointP1P3.y - midpointP1P3.x * a2;

  const centroidX = (b1 * c2 - b2 * c1) / (a1 * b2 - a2 * b1);
  const centroidY = (a2 * c1 - a1 * c2) / (a1 * b2 - a2 * b1);

  return {
    x: centroidX,
    y: centroidY,
  };
}
