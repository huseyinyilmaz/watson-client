// @flow

import * as React from 'react';
import { Link } from 'react-router-dom';
import type { SignupUser } from '../core/types';

type ResultProps =
  {|
   user: SignupUser,
   |};

const Result = ({ user }: ResultProps) => (
  <div className="container">
    <div className="section">
      <div className="row">
        <div className="col offset-m2 m8 s12">
          <div className="card">
            <div className="card-content">
              <div>Registration is completed</div>
              <table>
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{user.full_name}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{user.email}</td>
                  </tr>
                </tbody>
              </table>
              <div>
                Registration is completed successfully. Please go to login screen to continue.
              </div>
              <div>
                <Link
                  to="/login"
                  className="waves-effect waves-light btn"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export { Result };
