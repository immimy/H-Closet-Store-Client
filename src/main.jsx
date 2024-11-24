import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// state management
import { Provider } from 'react-redux';
import { store } from './store';
// slider
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
