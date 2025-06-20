import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { PrimeReactProvider } from "primereact/api";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
    <App />
    </PrimeReactProvider>
  </React.StrictMode>
)
