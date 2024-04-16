import './index.css';
import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { NavigationProvider } from './contexts/navigation';

const el = document.getElementById('root');
const root = createRoot(el);

root.render(
  <NavigationProvider>
    <App />
  </NavigationProvider>
)