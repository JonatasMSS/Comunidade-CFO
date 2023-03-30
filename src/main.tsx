import React from 'react'
import ReactDOM from 'react-dom/client'
import MainPage from './pages/MainPage';
import { RouterProvider } from 'react-router';
import routes from './routes/page.routes';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
)
