// @flow

import * as React from 'react';

import '../../styles/screenshots-new.scss';

import { AppContext } from '../core/context';

declare var M: any;

type NewScreenshotPageProps = any

type NewScreenshotPageState =
  {|
   url: string,
   delay: number,
   dimension: string,
   browser: string,
   |}

const defaultNewScreenshotState: NewScreenshotPageState = {
  url: '',
  delay: 3,
  dimension: '',
  browser: '',
};

class NewScreenshotPage extends React.Component<NewScreenshotPageProps, NewScreenshotPageState> {
  state = defaultNewScreenshotState

  componentDidMount() {
    M.updateTextFields();
  }

  handleUrlOnChange = (e: any) => {
    this.setState({ url: e.target.value });
  }

  handleDelayOnChange = (e: any) => {
    const value = parseFloat(e.target.value);
    this.setState({ delay: value });
  }

  handleDimensionOnChange = (e: any) => {
    this.setState({ dimension: e.target.value });
  }

  handleBrowserOnChange = (e: any) => {
    this.setState({ browser: e.target.value });
  }

  render() {
    return (
      <AppContext.Consumer>
        {
          (context) => {
            let dims = [(
              <option
                value=""
                key="default"
                disabled
              >
                Choose your screen dimension
              </option>)];
            dims = dims.concat(context.state.constants.dimensions.map(d => (
              <option value={d.code} key={d.code}>{ d.name } ({d.width}X{d.height})</option>
            )));

            let browsers = [(
              <option
                value=""
                key="default"
                disabled
              >
                Choose your browser
              </option>
            )];
            browsers = browsers.concat(context.state.constants.browsers.map(b => (
              <option value={b} key={b}>{b}</option>
            )));

            const {
              url,
              delay,
              dimension,
              browser,
            } = this.state;
            console.log(dimension, browser);
            return (
              <div className="container new-screenshot-container">
                <div className="section">
                  <div className="row">
                    <div className="col s12 m6 l4">
                      Create a new screenshot.
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="url"
                        type="url"
                        className="validate"
                        onChange={this.handleUrlOnChange}
                        value={url}
                      />
                      <label htmlFor="url">
                        Url
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="delay"
                        type="number"
                        className="validate"
                        onChange={this.handleDelayOnChange}
                        value={Number.isNaN(delay) ? '' : delay}

                      />
                      <label htmlFor="delay">
                        Delay
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <select
                        id="dimension"
                        className="browser-default"
                        value={dimension}
                        onChange={this.handleDimensionOnChange}
                      >
                        { dims }
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <select
                        id="browser"
                        className="browser-default"
                        value={browser}
                        onChange={this.handleBrowserOnChange}
                      >
                        { browsers }
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <button type="button" className="submit-button waves-effect waves-light btn">
                        Create a Screenshot
                        <i className="fas fa-chevron-right" />
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
