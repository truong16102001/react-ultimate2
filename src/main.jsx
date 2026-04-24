import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import Login from './routes/login.jsx';
import Register from './routes/register.jsx';
import User from './routes/users.jsx';
import './styles/global.css'
import TodoApp from './components/todo/TodoApp.jsx';
import Book from './routes/book.jsx';
import Error from './routes/error.jsx';
import { AuthProvider } from './components/context/auth.context.jsx';
import PrivateRoute from './routes/private.jsx';
import { ROUTES } from './constants/router.constant.js';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    children: [
      { index: true, element: <TodoApp /> }, // default render in homepage
      {
        path: "users",
        element: (
          <PrivateRoute>
            <User />
          </PrivateRoute>
        ),
      },
      {
        path: "books",
        element: (
          <PrivateRoute>
            <Book />
          </PrivateRoute>
        ),
      },
    ],
    errorElement: <Error />,
  },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
  // </React.StrictMode>,
);
