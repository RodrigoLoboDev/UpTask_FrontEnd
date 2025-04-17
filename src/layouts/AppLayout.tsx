import { Link, Navigate, Outlet } from "react-router-dom"
import Logo from "@/components/Logo"
import Footer from "@/components/Footer"
import NavMenu from "@/components/NavMenu"
import { ToastContainer } from 'react-toastify'
// La hoja de stylos css
import "react-toastify/dist/ReactToastify.css"
import { useAuth } from "@/hooks/useAuth"

export default function AppLayout() {

    const { data, isError, isLoading } = useAuth()

    if (isLoading) return 'cargando...'
    if (isError) return <Navigate to={'/auth/login'} />
    
    
    if (data) return (
        <>
            <header className=" bg-gray-800 py-5">
                <div className=" container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <Link to={'/'} >
                        <div className=" w-64">
                            <Logo />
                        </div>
                    </Link>
                    <NavMenu data={data}/>
                </div>
            </header>
            <main className=" container mx-auto my-5 md:my-10 p-5 md:flex md:justify-center">
                <div className=" md:w-2/3">
                    <Outlet />
                </div>
            </main>
            <Footer />
            <ToastContainer 
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}