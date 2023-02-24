export interface Dimensions {
  height: number;
  width: number;
}

export const getAspectRatioSize = ({
  screenHeight,
  screenWidth,
  windowInnerWidth,
  windowInnerHeight,
}: {
  screenHeight: number;
  screenWidth: number;
  windowInnerWidth: number;
  windowInnerHeight: number;
}): Dimensions => {
  const aspect = screenHeight / screenWidth;

  return windowInnerWidth > windowInnerHeight
    ? {
        height: windowInnerHeight,
        width: windowInnerHeight / aspect,
      }
    : {
        width: windowInnerWidth,
        height: windowInnerWidth * aspect,
      };
};
