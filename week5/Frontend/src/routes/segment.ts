export const SEG = {
    ROOT: "/",
    
    LOGIN: "/login",
    SIGNUP: "/signup",

    PROFILE: {
        VIEW: "/profile",
        EDIT: "/profile/edit",
        DELETE: "/profile/delete",
    }
} as const;

export const join = (...segs: string[]) => segs.filter(Boolean).join('/');