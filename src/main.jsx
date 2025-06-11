import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router'; 
import { Provider } from 'react-redux';
import {store } from './store/store.js'
import { GoogleOAuthProvider } from '@react-oauth/google';


const GOOGLE_CLIENT_ID ='886984064531-bgc4qit8ehvvp1i545c5ojdnfeh6av0k.apps.googleusercontent.com';


if (!GOOGLE_CLIENT_ID) {
  console.error("ERROR: Google Client ID is not defined. Please set VITE_GOOGLE_CLIENT_ID in your .env file.");
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}  redirectUri="http://localhost:5173/">
      <Provider store={store}> 
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);