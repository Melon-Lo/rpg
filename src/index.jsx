import './index.css';
import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { NavigationProvider } from './contexts/navigation';
import { Provider } from 'react-redux';
import { store } from './store';
import ModalContextProvider from './contexts/modal';

const el = document.getElementById('root');
const root = createRoot(el);


root.render(
  <Provider store={store}>
    <ModalContextProvider>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </ModalContextProvider>
  </Provider>
)