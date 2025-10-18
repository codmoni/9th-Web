// 경로 상수 정의
export const PATH = {
    home: () => '/',

    login: () => '/login',
    signup: () => '/signup',

    profile: {
        view: () => '/profile',
        edit: () => '/profile/edit',
        delete: () => '/profile/delete',
    }
} as const;