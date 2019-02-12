// @flow

import * as React from 'react';

import '../../styles/screenshots.scss';

// import { Link } from 'react-router-dom';
import * as queryString from 'query-string';
import { AppContext } from '../core/context';

import { apis } from '../core/api';
import { Image } from './image';
import { ImageDifference } from './difference';

// ==================== Main page props and state ====================
type DiffPageProps = { image1: string, image2: string };

type DiffPageState = {image1: any,
                      image2: any,
                      canvas1: any,
                      canvas2: any,
                     };

const defaultDiffPageState = {
  image1: undefined,
  image2: undefined,
  canvas1: undefined,
  canvas2: undefined,
};


// ====================== Side by side tab props =====================
type SideBySideProps = {
  image1: any,
  image2: any,
  onLoadHandler1: any,
  onLoadHandler2: any,
}
const SideBySide = ({
  image1, image2,
  onLoadHandler1, onLoadHandler2,
}: SideBySideProps) => {
  console.log(image1, image2);
  let img1;
  let img2;
  if (image1 && image1.image) {
    img1 = (
      <Image
        className="responsive-img"
        alt="image1"
        src={image1.image}
        onLoadHandler={onLoadHandler1}
      />);
  }
  if (image2 && image2.image) {
    img2 = (
      <Image
        className="responsive-img"
        alt="image2"
        src={image2.image}
        onLoadHandler={onLoadHandler2}
      />);
  }

  return (
    <div>
      <div className="row">
        <div className="col s6">
          { img1 }
        </div>
        <div className="col s6">
          { img2 }
        </div>
      </div>
    </div>);
};

class DiffPageInternal extends React.Component<DiffPageProps, DiffPageState> {
  constructor(props) {
    super(props);
    this.tabRef = React.createRef();
    // this.img1Ref = React.createRef();
    // this.img2Ref = React.createRef();
    // this.canvasRef1 = React.createRef();
    // this.canvasRef2 = React.createRef();
    // this.canvasdiff = document.createElement('canvas');
  }

  state = defaultDiffPageState

  componentDidMount = () => {
    const { image1, image2 } = this.props;

    this.getImage(image1, img => this.setState({ image1: img }));
    this.getImage(image2, img => this.setState({ image2: img }));
    // apis.screenshots.screenshotsGet(organization).then((data) => {
    //   this.setState({ screenshots: data });
    // });
    // var instance = M.Tabs.init(el, options);
    window.M.Tabs.init(this.tabRef.current, { responsiveThreshold: true });
  }

  getImage = (id: string, callback: (any) => void) => {
    apis.screenshots.screenshotSnapshotGet(id).then((data) => {
      console.log('getImage', id);
      callback(data);
      // this.setState({ screenshot: data });
      if (!data.image) {
        setTimeout(
          () => this.getImage(id, callback),
          2000,
        );
      }
    });
  }

  onLoadHandler1 = (canvas1) => {
    this.setState({ canvas1 });
  }

  onLoadHandler2 = (canvas2) => {
    this.setState({ canvas2 });
  }

  tabRef: any

  render() {
    return (
      <AppContext.Consumer>
        {
          (context) => {
            const {
              image1, image2,
              canvas1, canvas2,
            } = this.state;
            console.log(context);
            return (
              <div>
                <div className="row">
                  <div className="col s12">
                    <ul className="tabs" ref={this.tabRef}>
                      <li className="tab col s3"><a href="#side_by_side">Side by Side</a></li>
                      <li className="tab col s3"><a href="#image_difference">Image difference</a></li>
                      <li className="tab col s3 disabled"><a href="#test3">Disabled Tab</a></li>
                      <li className="tab col s3"><a href="#test4">Test 4</a></li>
                    </ul>
                  </div>
                  <div id="side_by_side" className="col s12">
                    <SideBySide
                      image1={image1}
                      image2={image2}
                      onLoadHandler1={this.onLoadHandler1}
                      onLoadHandler2={this.onLoadHandler2}
                    />
                  </div>
                  <div id="image_difference" className="col s12">
                    <ImageDifference canvas1={canvas1} canvas2={canvas2} />
                  </div>
                  <div id="test3" className="col s12">Test 3</div>
                  <div id="test4" className="col s12">Test 4</div>
                </div>
                <div className="row">
                  <div className="col s12">
                    Diff:
                    { image1 && image1.image }
                    { image2 && image2.image }
                  </div>
                </div>
              </div>);
          }
        }
      </AppContext.Consumer>);
  }
}

const DiffPage = () => {
  const { img1: rawImage1, img2: rawImage2 } = queryString.parse(window.location.search);
  let image1;
  if (Array.isArray(rawImage1)) {
    [image1] = rawImage1;
  } else {
    image1 = rawImage1;
  }
  let image2;
  if (Array.isArray(rawImage2)) {
    [image2] = rawImage2;
  } else {
    image2 = rawImage2;
  }
  return (
    <AppContext.Consumer>
      {
        (context) => {
          const { state: { session } } = context;
          let currentOrganization;
          if (session) {
            const { organization } = session;
            currentOrganization = organization;
          } else {
            currentOrganization = -1;
          }

          if (image1 && image2) {
            return (
              <DiffPageInternal
                organization={currentOrganization}
                image1={image1}
                image2={image2}
              />);
          } else {
            return (<div>img1 and img2 url parameters has to be provided.</div>);
          }
        }
      }
    </AppContext.Consumer>);
};

export { DiffPage };
