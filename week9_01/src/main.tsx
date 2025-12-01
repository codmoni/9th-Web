import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import { cartStore } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={cartStore}>
    <App />
  </Provider>
)
