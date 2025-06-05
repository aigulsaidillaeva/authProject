import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { stote } from './store/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={stote}>
    <BrowserRouter>
     <App />
    </BrowserRouter>
  </Provider>,
)
