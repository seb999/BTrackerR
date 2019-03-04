import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
// import {createStore} from 'redux';
// import {Provider} from 'react-redux';
// import rootReducer from './reducers/rootReducer'

// const store = createStore(rootReducer);

// ReactDOM.render(
//   <Provider store={store}>
//   <App />
//   </Provider>,
//   document.getElementById('root') as HTMLElement
// );

//Without Redux storage
ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
