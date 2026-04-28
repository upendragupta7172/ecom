import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'

// import axios from 'axios';
// axios.defaults.baseURL = "https://ecommerce-backend-wdhq.onrender.com";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster/>
    </Provider>,
  </StrictMode>,
)
