import { Outlet, ScrollRestoration } from "react-router-dom";
import { Suspense } from "react";
import Header from "../Components/Header";

const BaseLayout = () => {
    return(
        <>
        <Suspense fallback={<div>Loading...</div>}>
            <ScrollRestoration />
            <div className="min-h-screen w-screen bg-layout-bg">
                <Header/>
                <main className="w-full px-4 pt-6 pb-16">
                    <Outlet />
                </main>
            </div>
        </Suspense>
        </>
    )
}

export default BaseLayout;