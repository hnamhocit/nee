import {ReactNode} from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function DefaultLayout({children}: { children: ReactNode }) {
    return <div className='flex h-screen overflow-hidden'>
        <Sidebar/>

        <div className='flex-1 relative'>
            <Header/>

            <main className='p-4 space-y-16 h-[calc(100vh-64px)] overflow-y-scroll'>
                {children}
            </main>
        </div>
    </div>
}