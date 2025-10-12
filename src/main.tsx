import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { I18nextProvider } from 'react-i18next'
import i18n from './locales/i18n.ts'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'

import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './contexts/app.context.tsx'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <AppProvider>
            <App />
          </AppProvider>
        </I18nextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
