import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingSpinner from './ui/LoadingSpinner';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={<div className='centered'><LoadingSpinner /></div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);