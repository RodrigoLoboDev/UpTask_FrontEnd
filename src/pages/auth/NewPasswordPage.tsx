import NewPasswordForm from "@/components/auth/NewPasswordForm"
import NewPasswordToken from "@/components/auth/NewPasswordToken"
import { useState } from "react"

const NewPasswordPage = () => {

    const [isValidToken, setIsValidToken] = useState(false)
    const [token, setToken] = useState('')

    return (
        <>
            <h1 className="text-5xl font-black text-white">Reestablecer Password</h1>
            {isValidToken ? (
                <p className="text-2xl font-light text-white mt-5">
                    Completa el formulario {''}
                    <span className=" text-fuchsia-500 font-bold"> y reestablece tu password</span>
                </p>
            ) : (
                <p className="text-2xl font-light text-white mt-5">
                    Ingresa el código que recibiste {''}
                    <span className=" text-fuchsia-500 font-bold"> por email</span>
                </p>
            )}

            {isValidToken ? 
            <NewPasswordForm token={token} /> : 
            <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} />}
        </>
    )
}

export default NewPasswordPage