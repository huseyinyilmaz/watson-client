// @flow strict

import * as React from 'react';

import '../../styles/screenshots-detail.scss';

import { apis } from '../core/api';
import { PreLoader } from '../core/loading';

// import { Link } from 'react-router-dom';
// import { AppContext } from '../core/context';


type ScreenshotDetailPageProps = {match: { params: { id: any } } };
type ScreenshotDetailPageState = { screenshot: any };

const defaultScreenshotDetailPageState = { screenshot: {} };

const ScreenshotAttributes = ({ screenshot }: {screenshot: any}) => (
  <ul className="collection with-header">
    <li className="collection-header"><h4>Screenshot Attributes</h4></li>
    <li className="collection-item">url: { screenshot.url }</li>
    <li className="collection-item">delay: { screenshot.delay }</li>
    <li className="collection-item">dimension: { screenshot.device }</li>
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
      this.getImage(id);
    }

    getImage = (id: string) => {
      apis.screenshots.screenshotSnapshotGet(id).then((data) => {
        console.log('getImage', id);
        this.setState({ screenshot: data });
        if (!data.image) {
          setTimeout(
            () => this.getImage(id),
            2000,
          );
        }
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
        image = (<img src={screenshot.image} alt={screenshot.url} className="responsive-img" />);
      } else {
        image = (<PreLoader />);
      }

      return (
        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col s12">
                Screenshot for { screenshot.url }
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

export { ScreenshotDetailPage };
