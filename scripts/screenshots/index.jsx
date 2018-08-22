// @flow

import * as React from 'react';

import '../../styles/screenshots.scss';

import { Link } from 'react-router-dom';

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
                      Screenshots:
                      <Link to="/screenshots/new">
                        Take a new screenshot
                      </Link>
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
