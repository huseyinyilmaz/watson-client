// @flow

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
}

class ImageContext {
  context: any

  data: any

  width: number

  height: number

  canvas: any

  constructor(canvas: any) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.width = this.context.width;
    this.height = this.context.height;
  }

  getPixel = (x: number, y: number) => {
    const { data } = this;
    const red = y * (this.width * 4) + x * 4;
    return new Pixel(data[red], data[red + 1], data[red + 2], data[red + 3]);
  }

  putPixel = (x: number, y: number, pixel: Pixel) => {
    const { data } = this;
    const red = y * (this.width * 4) + x * 4;
    data[red] = pixel.red;
    data[red + 1] = pixel.green;
    data[red + 2] = pixel.blue;
    data[red + 3] = pixel.alpha;
  }

  loadImage = (img: any) => {
    this.width = img.naturalWidth;
    this.height = img.naturalHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context.drawImage(img, 0, 0);
    this.data = this.context.getImageData(0, 0, this.width, this.height).data;
  }
}

export { ImageContext };
