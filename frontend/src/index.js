import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SearchContextProvider } from './SearchContext';
import { AuthContextProvider } from './AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <SearchContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </SearchContextProvider>
  </AuthContextProvider>
);
