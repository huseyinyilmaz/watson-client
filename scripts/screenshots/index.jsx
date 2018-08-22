// @flow

import * as React from 'react';

import '../../styles/screenshots.scss';

import { AppContext } from '../core/context';


type ScreenshotsPageProps = any

class ScreenshotsPage extends React.Component<ScreenshotsPageProps> {
  mock() {
    return this;
  }

  render() {
    return (
      <AppContext.Consumer>
        {
          (context) => {
            console.log(context);
            return (
              <div className="container">
                <div className="section">
                  <div className="row">
                    <div className="col s12 m6 l4">
                      Screenshots
                    </div>
                  </div>
                </div>
              </div>);
          }
        }
      </AppContext.Consumer>);
  }
}

export { ScreenshotsPage };
