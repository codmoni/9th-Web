const GoogleLoginButton = () =>{
    return (
        <>
        <button
            type="button"
            className="w-full h-11 rounded-md border border-white/40 text-white flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 active:bg-white/10 transition"
        >
            <span className="text-base">G</span>
            <span className="text-sm">Google로 로그인</span>
        </button>
        </>
    )
}

export default GoogleLoginButton;