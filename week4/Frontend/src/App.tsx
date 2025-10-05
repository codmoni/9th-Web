import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home</div>,
  },
  {
    path: "/login",
    element: <div>Login</div>,
  },
  {
    path: "/signup",
    element: <div>SignUp</div>,
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
