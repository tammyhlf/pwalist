import React from 'react'
import './App.css'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'about',
    element: <About />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
