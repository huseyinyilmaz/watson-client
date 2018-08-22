// @flow

import * as React from 'react';

import '../../styles/screenshots-new.scss';

import { AppContext } from '../core/context';


type NewScreenshotPageProps = any

class NewScreenshotPage extends React.Component<NewScreenshotPageProps> {
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
                      New Screenshot
                    </div>
                  </div>
                </div>
              </div>);
          }
        }
      </AppContext.Consumer>);
  }
}

export { NewScreenshotPage };
