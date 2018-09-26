// @flow
import { Canvas, Pixel } from '../canvas';

const strictDiff = (canvas1: Canvas, canvas2: Canvas) => {
  const emptyPixel = new Pixel(255, 0, 0, 255);
  const diffCanvas = new Canvas();
  const diffCanvasWidth = Math.max(canvas1.width, canvas2.width);
  const diffCanvasHeight = Math.max(canvas1.height, canvas2.height);
  diffCanvas.reset(diffCanvasWidth, diffCanvasHeight);
  for (let x = 0; x < diffCanvas.width; x += 1) {
    for (let y = 0; y < diffCanvas.height; y += 1) {
      const p1 = canvas1.getPixel(x, y);
      const p2 = canvas2.getPixel(x, y);
      if (p1 && p2 && p1.equals(p2)) {
        diffCanvas.putPixel(x, y, p1);
      } else {
        diffCanvas.putPixel(x, y, emptyPixel);
      }
    }
  }
  diffCanvas.context.putImageData(
    diffCanvas.imageData,
    0, 0,
  );
  return diffCanvas.toDataURL();
};

export { strictDiff };
