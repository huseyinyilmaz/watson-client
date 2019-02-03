// @flow strict

import * as React from 'react';
import { apis } from '../core/api';
import { DeleteScreenshotModal } from './screenshotcarddeletemodal';
import { getNewScreenshotPath, getScreenshotDetailPath } from '../core/urlutils';

//import type { Screenshot } from '../core/types';

type ScreenshotCardProps =
  {|
   isSelected: boolean,
   screenshot: *,
   updateSessionByScreenshot: (number) => void,
   updateScreenshotList: () => void,
   screenshotDetailLink: string,
|};

type ScreenshotCardState =
  {|
   deleteModalOpen: boolean,
   |};


const defaultScreenshotCardState: ScreenshotCardState = {
  deleteModalOpen: false,
};


class ScreenshotCard extends React.Component<ScreenshotCardProps, ScreenshotCardState> {
  state = defaultScreenshotCardState

  render() {
    const { screenshot } = this.props;
    console.log('screenshot: ', screenshot);
    const link = getScreenshotDetailPath(session, screenshot.id);
    return (
      <div className="col s12 m4 l3" key={screenshot.id}>
        <div className="card small">
          <div className="card-image">
            <img src={screenshot.image} alt={screenshot.url} />
          </div>
          <div className="card-content">
            <p>{screenshot.address}</p>
          </div>
          <div className="card-action">
            <Link to={link}>Details</Link>
          </div>
        </div>
      </div>
    );
  }
}


export { ScreenshotCard }
