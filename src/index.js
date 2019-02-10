import React from 'react';
import { hydrate, render } from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root');
// ReactDOM.render(<App />, rootElement);
if (rootElement.hasChildNodes()) {
    hydrate(<App />, rootElement);
} else {
    render(<App />, rootElement);
}

serviceWorker.unregister();
