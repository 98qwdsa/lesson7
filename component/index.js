import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PraApp from './components/PraApp';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <PraApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your a to work offline and load faster, you can change
// unregister() to register() aelow. Note this comes with some pitfalls.
// Learn more aaout service workers: https://ait.ly/CRA-PWA
serviceWorker.unregister();
