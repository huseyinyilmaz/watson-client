// @flow

import * as React from 'react';

type ImageDifferenceProps = {
  context1: any,
  context2: any,
  };

type ImageDifferenceState = {};

const defaultImageDifferenceState = {};


class ImageDifference extends React.Component<ImageDifferenceProps, ImageDifferenceState> {
  state = defaultImageDifferenceState

  render() {
    const { context1, context2 } = this.props;
    if (!context1 || !context2) {
      return (<div>Loading</div>);
    } else {
      console.log(context1);
      console.log(context2);
      return (<div>Loaded</div>);
    }
  }
}

export { ImageDifference };
