import 'babel/polyfill';

import TopDeals from './components/TopDeals';
import AppHomeRoute from './routes/AppHomeRoute';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

ReactDOM.render(
  <Relay.RootContainer
    Component={TopDeals}
    route={new AppHomeRoute()}
  />,
  document.getElementById('root')
);
