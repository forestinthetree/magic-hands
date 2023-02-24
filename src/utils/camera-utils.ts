const hasGetUserMedia = () => {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
};

export function startCamera({
  videoElement,
  onLoad,
}: {
  videoElement: HTMLVideoElement;
  onLoad: () => void;
}) {
  if (!hasGetUserMedia()) {
    throw new Error("getUserMedia() is not supported by your browser");
  }

  const constraints = {
    video: true,
  };

  navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    videoElement.srcObject = stream;
    videoElement.addEventListener("loadeddata", onLoad);
  });
}
