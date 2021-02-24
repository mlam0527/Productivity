//webpack bundles CSS
import '../public/style.css';
// import "core-js/stable";
import "regenerator-runtime/runtime";

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Root from './components/Root'

//React and redux Dom rendering with #app defined in html
render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('app')
)