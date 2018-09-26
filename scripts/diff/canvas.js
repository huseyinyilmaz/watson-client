// @flow

// Canvas object that will used to create imageData;
class Pixel {
  red: number

  green: number

  blue: number

  alpha: number

  constructor(red: number, green: number, blue: number, alpha: number) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }

  equals = (other: Pixel) => (other.red === this.red
                              && other.green === this.green
                              && other.blue === this.blue
                              && other.alpha === this.alpha)
}

class Canvas {
  context: any

  data: any

  width: number

  height: number

  canvas: any

  imageData: any

  constructor() {
    const canvas = document.createElement('canvas');
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.width = this.context.width;
    this.height = this.context.height;
    this.data = {};
  }

  getPixel = (x: number, y: number): ?Pixel => {
    const { data, width, height } = this;
    if (x < width && y < height) {
      const red = y * (width * 4) + x * 4;
      return new Pixel(data[red], data[red + 1], data[red + 2], data[red + 3]);
    } else {
      return undefined;
    }
  }

  putPixel = (x: number, y: number, pixel: Pixel): void => {
    const { data } = this;
    const red = y * (this.width * 4) + x * 4;
    data[red] = pixel.red;
    data[red + 1] = pixel.green;
    data[red + 2] = pixel.blue;
    data[red + 3] = pixel.alpha;
  }

  loadImage = (img: any): void => {
    this.width = img.naturalWidth;
    this.height = img.naturalHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context.drawImage(img, 0, 0);
    this.imageData = this.context.getImageData(0, 0, this.width, this.height);
    this.data = this.imageData.data;
  }

  reset = (x: number, y: number): void => {
    this.width = x;
    this.height = y;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.imageData = this.context.getImageData(0, 0, this.width, this.height);
    this.data = this.imageData.data;
  }

  toDataURL = (): string => this.canvas.toDataURL();
}

export { Canvas, Pixel };
