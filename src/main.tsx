import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import './index.css';
import 'a-flexbox/a-flexbox.css';
import '@picocss/pico';
import 'toastify-js/src/toastify.css';
import Index from './views/Index';
import Predictor from './views/Predictor';
import League from './views/League';
import Error from './views/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />
  },
  {
    path: '/home',
    element: <Index />,
    children: [
      {
        path: '',
        element: <Predictor />
      },
      {
        path: 'leagues',
        element: <League />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
