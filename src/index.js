import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import rootSaga from './sagas/root_saga';
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store, sagaMiddleware } from './store/spotify_store';

sagaMiddleware.run(rootSaga);;

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
