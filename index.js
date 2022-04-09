// 3rd Party //
import React from 'react';
import reactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './src/components/store';

// Components //
import App from './src/components/App';

// Render //
reactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
