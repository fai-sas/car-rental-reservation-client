import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { store, persistor } from './redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import router from './routes/routes.tsx'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      <Toaster />
    </Provider>
  </StrictMode>
)
