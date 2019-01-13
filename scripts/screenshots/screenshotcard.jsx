// @flow strict

import * as React from 'react';
import { apis } from '../core/api';
import { DeleteScreenshotModal } from './screenshotcarddeletemodal';

//import type { Screenshot } from '../core/types';

type ScreenshotCardProps =
  {|
   isSelected: boolean,
   screenshot: *,
   updateSessionByScreenshot: (number) => void,
   updateScreenshotList: () => void,
|};

type ScreenshotCardState =
  {|
   deleteModalOpen: boolean,
   |};

const defaultScreenshotCardState: ScreenshotCardState = {
  deleteModalOpen: false,
};


class ScreenshotCard extends React.Component<ScreenshotCardProps, ScreenshotCardState> {

}
