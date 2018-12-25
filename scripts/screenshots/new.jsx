// @flow strict

import * as React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Redirect } from 'react-router';

import '../../styles/screenshots-new.scss';
import { apis } from '../core/api';
import { getScreenshotDetailPath } from '../core/urlutils';
import { TextField } from '../core/components/textfield';
import { SelectField } from '../core/components/selectfield';
import { TextArea } from '../core/components/textarea';

import { AppContext } from '../core/context';

declare var M: any;

type NewScreenshotPageProps = { project: number };

type NewScreenshotPageState =
  {|
   generalError: string,
   screenshot: any,
   |}

const defaultNewScreenshotState: NewScreenshotPageState = {
  generalError: '',
  screenshot: undefined,
};

const initialValues = {
  url: '',
  delay: 3,
  device: '',
  script: '',
};

class NewScreenshotPageInternal
  extends React.Component<NewScreenshotPageProps, NewScreenshotPageState> {
  state = defaultNewScreenshotState

  schema = yup.object().shape({
    url: yup.string().url().required('Required'),
    delay: yup.number().required('Required'),
    device: yup.string().required('Required'),
    script: yup.string().required('Required'),
  });

  componentDidMount() {
    M.updateTextFields();
  }

  onSubmitHandler = (values: *, state: *) => {
    this.setState({ generalError: undefined });

    const {
      setSubmitting,
      setErrors,
    } = state;

    const {
      url,
      delay,
      device,
      script,
    } = values;

    const { project } = this.props;

    apis.screenshots.screenshotSnapshotCreate(
      url,
      delay,
      device,
      script,
      project,
    ).then((data) => {
      this.setState({ screenshot: data });
    })
      .catch((e) => {
        if (e && e.response && e.response.status === 400) {
          const {
            url: urlErrors,
            delay: delayErrors,
            device: deviceErrors,
            script: scriptErrors,
            project: projectErrors,
          } = e.response.data;
          const errors = {};

          if (urlErrors && urlErrors.length > 0) {
            const [error] = urlErrors;
            errors.url = error;
          }

          if (delayErrors && delayErrors.length > 0) {
            const [error] = delayErrors;
            errors.delay = error;
          }

          if (deviceErrors && deviceErrors.length > 0) {
            const [error] = deviceErrors;
            errors.device = error;
          }

          if (scriptErrors && scriptErrors.length > 0) {
            const [error] = scriptErrors;
            errors.script = error;
          }

          if (projectErrors && projectErrors.length > 0) {
            this.setState({ generalError: 'Cannot find project of this screenshot. Please refresh your page and take screenshot again.' });
          }

          if (e.response.data.non_field_errors) {
            this.setState({ generalError: e.response.data.non_field_errors });
          }
          setErrors(errors);
        } else {
          this.setState({ generalError: 'There were a problem with the server response. Please try again in a few seconds.' });
        }
      }).finally(() => setSubmitting(false));
  }

  render() {
    const {
      screenshot,
      generalError,
    } = this.state;
    return (
      <AppContext.Consumer>
        {
          (context) => {
            const { session, constants } = context.state;
            const { devices } = constants;
            if (session && screenshot) {
              const fullUrl = getScreenshotDetailPath(session, screenshot.id);
              return (<Redirect to={fullUrl} />);
            }

            const deviceOptions = devices.map(d => (
              {
                key: d.code,
                value: d.code,
                display: `${d.name} (${d.width}X${d.height})`,
              }));

            return (
              <div className="container new-screenshot-container">
                <div className="section">
                  <div className="row">
                    <div className="col s12">
                      Create a new screenshot.
                    </div>
                  </div>

                  <div className="row">
                    <div className="col offset-s1 s10">
                      <Formik
                        initialValues={initialValues}
                        validationSchema={this.schema}
                        onSubmit={this.onSubmitHandler}
                      >
                        {(props) => {
                          const {
                            values,
                            touched,
                            errors,
                            // dirty,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            // handleReset,
                            isValid,
                          } = props;
                          console.log('Formik props', props);
                          return (
                            <div className="card">
                              <div className="card-content">
                                <div className="card-title">
                                  Create Organization
                                </div>
                                <form>
                                  <TextField
                                    id="url"
                                    type="text"
                                    display="URL"
                                    value={values.url}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={errors.url}
                                    touched={touched.url}
                                  />

                                  <TextField
                                    id="delay"
                                    type="number"
                                    display="Delay"
                                    value={values.delay}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={errors.delay}
                                    touched={touched.delay}
                                  />

                                  <SelectField
                                    id="device"
                                    value={values.device}
                                    options={deviceOptions}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={errors.device}
                                    touched={touched.device}
                                  />

                                  <TextArea
                                    id="script"
                                    display="Script"
                                    value={values.script}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={errors.script}
                                    touched={touched.script}
                                  />

                                </form>
                                {generalError && (<div id="general_error_message">{generalError}</div>)}
                              </div>
                              <div className="card-action">
                                <button
                                  type="button"
                                  className="btn waves-effect waves-green"
                                  disabled={(!isValid) || isSubmitting}
                                  onClick={handleSubmit}
                                >
                                  Create
                                </button>
                              </div>
                            </div>);
                        }}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>);
          }
        }
      </AppContext.Consumer>);
  }
}

const NewScreenshotPage = () => (
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
        return (<NewScreenshotPageInternal project={currentProject} />);
      }
    }
  </AppContext.Consumer>);

export { NewScreenshotPage };
