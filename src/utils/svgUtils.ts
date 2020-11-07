import { Point } from "../interfaces";

export function distanceBetweenPoints(pointA: Point, pointB: Point): number {
  return Math.sqrt(
    Math.pow(pointA.y - pointB.y, 2) + Math.pow(pointA.x - pointB.x, 2)
  );
}

export function midpoint(pointA: Point, pointB: Point): Point {
  return {
    x: (pointA.x + pointB.x) / 2,
    y: (pointA.y + pointB.y) / 2,
  };
}

export function pointFromEvent(e: MouseEvent | Touch): Point {
  return {
    x: e.clientX,
    y: e.clientY,
  };
}

export function SVGPointFromClientPoint(
  p: Point,
  svg: SVGSVGElement
): DOMPoint {
  const point = svg.createSVGPoint();
  point.x = p.x;
  point.y = p.y;
  return point.matrixTransform(svg.getScreenCTM()?.inverse());
}

export function SVGPointFromEvent(
  e: MouseEvent | Touch,
  svg: SVGSVGElement
): DOMPoint {
  const clientPoint = pointFromEvent(e);
  return SVGPointFromClientPoint(clientPoint, svg);
}
