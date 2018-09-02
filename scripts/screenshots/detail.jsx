// @flow

import * as React from 'react';

import '../../styles/screenshots-detail.scss';

import { apis } from '../core/api';

// import { Link } from 'react-router-dom';

import { AppContext } from '../core/context';


type ScreenshotDetailPageProps = {match: { params: { id: any } } };
type ScreenshotDetailPageState = { screenshot: any };

const defaultScreenshotDetailPageState = { screenshot: {} };

const ScreenshotAttributes = ({ screenshot }: {screenshot: any}) => (
  <ul className="collection with-header">
    <li className="collection-header"><h4>Screenshot Attributes</h4></li>
    <li className="collection-item">url: { screenshot.address }</li>
    <li className="collection-item">delay: { screenshot.delay }</li>
    <li className="collection-item">dimension: { screenshot.dimension }</li>
    <li className="collection-item"> browser: {screenshot.browser} </li>
    <li className="collection-item"> Created at: {screenshot.created} </li>
    <li className="collection-item"> Modified at: {screenshot.modified} </li>
    <li className="collection-item"> Status: {screenshot.status} </li>
    <li className="collection-item"> Result: {screenshot.result} </li>
  </ul>
);

class ScreenshotDetailPage
  extends React.Component<ScreenshotDetailPageProps, ScreenshotDetailPageState> {
    state = defaultScreenshotDetailPageState

    componentDidMount = () => {
      const { match: { params: { id } } } = this.props;
      apis.screenshots.screenshotGet(id).then((data) => {
        this.setState({ screenshot: data });
      });
    }

    render() {
      const { screenshot } = this.state;
      if (!screenshot) {
        return (
          <div className="container">
            <div className="section">
              <div className="row">
                <div className="col s12 m6 l4">
                  Loading screenshot
                </div>
              </div>
            </div>
          </div>);
      }

      let image;
      if (screenshot.image) {
        image = (<img src={screenshot.image} alt="screenshot.address" className="responsive-img" />);
      } else {
        image = null;
      }

      return (
        <AppContext.Consumer>
          {
            (context) => {
              console.log(context);
              return (
                <div className="container">
                  <div className="section">
                    <div className="row">
                      <div className="col s12">
                        Screenshot for { screenshot.address }
                      </div>
                    </div>

                    <div className="row">
                      <div className="col s12">
                        { image }
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s12">
                        <ScreenshotAttributes screenshot={screenshot} />
                      </div>
                    </div>
                  </div>
                </div>);
            }
          }
        </AppContext.Consumer>);
    }
}

export { ScreenshotDetailPage };
