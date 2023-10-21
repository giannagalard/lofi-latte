import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import { Navbar } from './components';
import { Login } from "./Admin"
import NotFound from "./NotFound"
import './index.css'

const NavbarWrapper = () => {

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      {
        path: "/giannagalard",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
