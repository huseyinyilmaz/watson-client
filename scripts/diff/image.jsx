// @flow

import * as React from 'react';
import { Caman } from 'caman';

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
    console.log('image loaded: ', e, canvas, img);
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
        alt="image1"
        src={src}
        onLoad={this.onLoadHandler}
        onError={this.onErrorHandler}
        key="img"
      />];
  }
}

export { Image };
