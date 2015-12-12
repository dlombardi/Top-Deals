import 'babel/polyfill';

import TopNews from './components/TopNews';
import AppHomeRoute from './routes/AppHomeRoute';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

ReactDOM.render(
  <Relay.RootContainer
    Component={TopNews}
    route={new AppHomeRoute()}
  />,
  document.getElementById('root')
);
