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
            const dims = context.state.constants.dimensions.map(d => (
              <option value={d.code} key={d.code}>{ d.name }  ({d.width}X{d.height})</option>
            ));

            const browsers = context.state.constants.browsers.map(b => (
              <option value={b} key={b}>{b}</option>
            ));

            return (
              <div className="container">
                <div className="section">
                  <div className="row">
                    <div className="col s12 m6 l4">
                      Create a new screenshot.
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <input id="url" type="url" className="validate" />
                      <label htmlFor="url">
                        Url
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <input id="delay" type="number" className="validate" />
                      <label htmlFor="delay">
                        Delay
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <select id="dimension" className="browser-default">
                        <option value="" disabled selected>Choose your screen dimension</option>
                        { dims }
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <select id="browser" className="browser-default">
                        <option value="" disabled selected>Choose your browser</option>
                        { browsers }
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <button type="button" className="waves-effect waves-light btn">
                        Create a Screenshot
                      </button>
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
