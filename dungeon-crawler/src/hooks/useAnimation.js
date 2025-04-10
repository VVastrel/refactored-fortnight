import { useState, useEffect } from 'react';

export const useAnimation = (totalFrames, frameRate) => {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % totalFrames);
    }, frameRate);

    return () => clearInterval(interval);
  }, [totalFrames, frameRate]);

  return frameIndex;
};