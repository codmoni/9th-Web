// auth.ts
export const auth = {
    // 1. localStorage에서 accessToken 가져오기
    getAT: () => localStorage.getItem("accessToken"),
    // 2. localStorage에 accessToken 저장/삭제
    setAT: (t: string | null) => {
        if (t) localStorage.setItem("accessToken", t);
        else localStorage.removeItem("accessToken");
    },
    // 3. logout
    logout: () => {
        localStorage.removeItem("accessToken");
        window.location.href = "/login"; 
    }
}