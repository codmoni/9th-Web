import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import BaseLayout from './Layout/BaseLayout'

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
        element: <div>로그인 화면</div>,
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
