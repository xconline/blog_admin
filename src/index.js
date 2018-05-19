import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from 'react-keeper';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(
    reducer,
    applyMiddleware(thunk)
  );
ReactDOM.render(<Provider store={store}>
                    <HashRouter>
                        <App />
                    </HashRouter>
                </Provider>, document.getElementById('root'));
registerServiceWorker();
