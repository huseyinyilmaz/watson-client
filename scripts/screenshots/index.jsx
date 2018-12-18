// @flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import '../../styles/screenshots.scss';

import { apis } from '../core/api';
import { AppContext } from '../core/context';
import { getNewScreenshotPath } from '../core/urlutils';


type ScreenshotsPageProps = { organization: number };
type ScreenshotPageState = { screenshots: any };

const defaultScreenshotPageState = {
  screenshots: undefined,
};

const Image = ({ screenshot }: {screenshot: any}) => {
  console.log('screenshot: ', screenshot);
  const link = `/screenshots/detail/${screenshot.id}`;
  return (
    <div className="col s12 m4 l3" key={screenshot.id}>
      <div className="card small">
        <div className="card-image">
          <img src={screenshot.image} alt={screenshot.url} />
        </div>
        <div className="card-content">
          <p>
            {screenshot.address}
          </p>
        </div>
        <div className="card-action">
          <Link to={link}>Details</Link>
        </div>
      </div>
    </div>
  );
};

class ScreenshotsPageInternal extends React.Component<ScreenshotsPageProps, ScreenshotPageState> {
  state = defaultScreenshotPageState

  componentDidMount = () => {
    const { organization } = this.props;
    apis.screenshots.screenshotSnapshotsGet(organization).then((data) => {
      this.setState({ screenshots: data });
    });
  }

  render() {
    return (
      <AppContext.Consumer>
        {
          (context) => {
            const { session } = context.state;
            if (!session) {
              return (<Redirect to="/" />);
            }
            // const fullUrl = getProjectsPath(session);
            const newScreenshotPath = getNewScreenshotPath(session);
            const { screenshots } = this.state;
            let screenshotDivs = [];
            if (screenshots) {
              screenshotDivs = screenshots.map(s => (
                <Image screenshot={s} />
              ));
            }
            return (
              <div className="container">
                <div className="section">
                  <div className="row">
                    <div className="col s12">
                      Screenshots:
                    </div>
                  </div>
                  <div className="row">
                    { screenshotDivs }
                  </div>

                  <div className="row">
                    <div className="col s12">
                      <Link to={newScreenshotPath}>
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

const ScreenshotsPage = () => (
  <AppContext.Consumer>
    {
      (context) => {
        const { state: { session } } = context;
        let currentOrganization;
        if (session) {
          const { organization } = session;
          currentOrganization = organization.id;
        } else {
          currentOrganization = -1;
        }
        return (<ScreenshotsPageInternal organization={currentOrganization} />);
      }
    }
  </AppContext.Consumer>);

export { ScreenshotsPage };
