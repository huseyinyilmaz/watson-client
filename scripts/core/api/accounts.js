// @flow

import axios from 'axios';


const sessionCreate = (username: string, password: string) => {
  const post = { username, password };
  return axios.post(
    'http://localhost:8000/api/v1/accounts/sessions/',
    post,
  ).then(data => data.data);
};

export { sessionCreate };
