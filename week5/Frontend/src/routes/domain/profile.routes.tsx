import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import { SEG } from "../segment";

const ProfilePage = lazy(() => import("../../Pages/Profile/Profile")); // 유저 정보
const EditProfilePage = lazy(() => import("../../Pages/Profile/EditProfile")); // 유저 정보 수정
const DeleteProfilePage = lazy(() => import("../../Pages/Profile/DeleteProfile")); // 회원 탈퇴

export const profileRoutes: RouteObject[] = [
    {
        path: SEG.PROFILE.VIEW,
        element: <ProfilePage />
    },
    {
        path: SEG.PROFILE.EDIT,
        element: <EditProfilePage />
    },
    {
        path: SEG.PROFILE.DELETE,
        element: <DeleteProfilePage />
    }
]