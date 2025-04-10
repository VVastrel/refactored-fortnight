const imageCache = {};

// esilataa ruudut
export const preloadImage = (src) => {
  if (!imageCache[src]) {
    const img = new Image();
    img.src = src;
    imageCache[src] = img;
  }
  return imageCache[src];
};

// Ruudun sijainti
export const getCurrentFrameX = (frameIndex, frameWidth) => {
  return frameIndex * frameWidth;
};