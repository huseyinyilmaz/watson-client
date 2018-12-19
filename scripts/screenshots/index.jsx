// @flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import '../../styles/screenshots.scss';

import { apis } from '../core/api';
import { AppContext } from '../core/context';
import { getNewScreenshotPath, getScreenshotDetailPath } from '../core/urlutils';

type ScreenshotsPageProps = { project: number };
type ScreenshotPageState = { screenshots: any };

const defaultScreenshotPageState = {
  screenshots: undefined,
};

const Image = ({ session, screenshot }: {session: *, screenshot: *}) => {
  console.log('screenshot: ', screenshot);
  const link = getScreenshotDetailPath(session, screenshot.id);
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
    const { project } = this.props;
    apis.screenshots.screenshotSnapshotsGet(project).then((data) => {
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
                <Image session={session} screenshot={s} key={s.id} />
              ));
            }
            return (
              <div className="container">
                <div className="section">
                  <div className="row">
                    <div className="col s12">
                      <Link to={newScreenshotPath}>
                        Take a new screenshot
                      </Link>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s12">
                      Screenshots:
                    </div>
                  </div>
                  <div className="row">
                    { screenshotDivs }
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
        let currentProject;
        if (session) {
          const { project } = session;
          currentProject = project.id;
        } else {
          currentProject = -1;
        }
        return (<ScreenshotsPageInternal project={currentProject} />);
      }
    }
  </AppContext.Consumer>);

export { ScreenshotsPage };
