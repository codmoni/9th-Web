import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import BaseLayout from './Layout/BaseLayout'
import Login from './Pages/Login'

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    errorElement: <div>에러 발생</div>,
    children: [
      {
        path: "/",
        element: <div>홈 화면</div>,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <div>회원가입 화면</div>,
      }
    ]
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
