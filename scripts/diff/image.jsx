// @flow

import * as React from 'react';

type ImageProps = { // canvas: HTMLElement,
                    src: string };

type ImageState = {};

const defaultImageState = {};


class Image extends React.Component<ImageProps, ImageState> {
  state = defaultImageState

  constructor(props: ImageProps) {
    super(props);
    this.canvasRef = React.createRef();
  }

  onLoadHandler = (e: any) => {
    const img = e.currentTarget;
    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    window.ctx = context;
    window.cnv = canvas;
    // window.ctx.getImageData(1, 1, 1, 1);
    console.log('image loaded: ', context);
  }

  onErrorHandler = () => {}

  canvasRef: any // React.Ref<any>

  render() {
    const { src } = this.props;
    return [
      <canvas
        ref={this.canvasRef}
        className="hide"
        key="canvas"
      />,
      <img
        className="responsive-img"
        crossOrigin="anonymous"
        alt="image1"
        src={src}
        onLoad={this.onLoadHandler}
        onError={this.onErrorHandler}
        key="img"
      />];
  }
}

export { Image };
