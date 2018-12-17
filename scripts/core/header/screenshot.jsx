// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context';
import { getScreenshotsPath } from '../urlutils';

type ScreenshotButtonProps = {};

class ScreenshotButton extends React.Component<ScreenshotButtonProps> {
  state = undefined

  render() {
    return (
      <AppContext.Consumer>
        {
          (context) => {
            const { session } = context.state;
            if (session) {
              const fullPath = getScreenshotsPath(session);
              return (
                <Link to={fullPath}>
                  <span className="screenshot-button btn">
                    Screenshots
                  </span>
                </Link>);
            } else {
              return null;
            }
          }
        }
      </AppContext.Consumer>);
  }
}

export { ScreenshotButton };
