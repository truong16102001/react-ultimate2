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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <TodoApp /> }, // default render in homepage
      { path: "manage/users", element: <User /> },
      { path: "manage/books", element: <Book /> },
    ],
    errorElement: <Error/>
  },
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
