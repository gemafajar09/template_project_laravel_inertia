import { router, usePage } from "@inertiajs/react"
import { useEffect } from "react";
import { useState } from "react"
import toastify from "toastify-js";
import "toastify-js/src/toastify.css"
import { LuEye, LuEyeOff } from "react-icons/lu";

export default function Login({errors}){
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [isloading, setIsloading] = useState(false)

    const [error, setError] = useState('');

    const {props} = usePage()

    useEffect(() => {
        if(props.errors.length > 0){
            handlerToast(props.errors[0])
        }
    },[])

    function handlerToast(pesan) {
        toastify({
            text: pesan,
            className: "info",
        }).showToast();
	}; 

    const HandlerLogin = async () => {
        setIsloading(true)
        if(!email.includes('@')){
            setIsloading(false)
            return handlerToast('Email Tidak Valid')
        }
        try {
            router.post(route('login.action'),{
                email: email, password: password
            })
        } catch (error) {
            console.log(error);
            
            setIsloading(false)
        } finally {
            setIsloading(false)
        }
    }

    return (
        <div className="bg-gray-50 h-screen">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex justify-center mb-6 text-2xl font-semibold text-gray-900">
                    <img className="w-1/3 mr-2" src="/mediatama.png" alt="logo"/>   
                </div>

                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Silahkan Masuk 
                        </h1>
                        <form className="space-y-4 md:space-y-6">
                        <div>
                            <label htmlFor="usernmae" className="block mb-2 text-sm font-medium text-gray-900">Masukan Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="text" className={`${errors.username ? 'border-red-700' : 'border-gray-300'} bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 `} placeholder="Email"/>
                            <span className="text-red-500">{errors.username ?? ""}</span>
                        </div>

                        <div className="relative">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Masukan Password</label>
                            <input type={show ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} className={`${errors.password ? 'border-red-700' : 'border-gray-300'} bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 `} placeholder="*********"/>
                            <div className="absolute inset-y-0 top-7 right-0 pr-3 flex items-center text-sm leading-5">
                                <div onClick={() => setShow(!show)}>
                                    {show ? <LuEye /> : <LuEyeOff /> }
                                </div>
                            </div>
                        </div>
                        <span className="text-red-500">{errors.password ?? ""}</span>
                        
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " required=""/>
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        
                        <div className="flex justify-end">
                            <button type="button" onClick={HandlerLogin} className="w-32 text-white bg-blue-200 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{isloading ? 'Loading ...' : 'Log In'}</button>

                        </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}