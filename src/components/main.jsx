import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../auth/auth-context.jsx'
import { SnackbarProvider } from 'notistack'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <SnackbarProvider>
    <App/>
    </SnackbarProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)




















