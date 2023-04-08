import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router';
import routes from './routes/page.routes';
import './lib/dayjs_locale.ts';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
)
