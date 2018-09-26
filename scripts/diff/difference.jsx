// @flow

import * as React from 'react';
import { strictDiff } from './differs/strict';

type ImageDifferenceProps = {
  canvas1: any,
  canvas2: any,
  };

type ImageDifferenceState = {};

const defaultImageDifferenceState = {};


class ImageDifference extends React.Component<ImageDifferenceProps, ImageDifferenceState> {
  state = defaultImageDifferenceState

  render() {
    const { canvas1, canvas2 } = this.props;
    if (!canvas1 || !canvas2) {
      return (<div>Loading</div>);
    } else {
      const dataURL = strictDiff(canvas1, canvas2);
      console.log(canvas1);
      console.log(canvas2);
      return (<img src={dataURL} alt="difference" />);
    }
  }
}

export { ImageDifference };
