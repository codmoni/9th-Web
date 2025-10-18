import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { SEG } from "../segment";

const HomePage = lazy(() => import("../../Pages/Home"));
const LoginPage = lazy(() => import("../../Pages/Login"));
const SignupPage = lazy(() => import("../../Pages/Signup"));

// 공개 라우트 정의
export const publicRoutes: RouteObject[] = [
    {
        index: true,
        element: <HomePage />,
    },
    {
        path: SEG.LOGIN,
        element: <LoginPage />,
    },
    {
        path: SEG.SIGNUP,
        element: <SignupPage />,
    },
]
