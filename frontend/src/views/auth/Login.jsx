import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Toast from "../../plugin/Toast"
import { json, Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/auth"
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeOpen, faCompass } from '@fortawesome/free-regular-svg-icons';

function Login(){

    const [loginData, setloginData] = useState({
        'email': '',
        'password': ''
    })

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const handleloginDataChange = (event) => {
        setloginData({
            ...loginData,
            [event.target.name]: event.target.value,
        });

    }

    const resetForm = () => (
        setloginData({
            email: "",
            password: "",

        })
    )

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const {error} = await login(loginData.email, loginData.password);

        if (error){
            Toast('error', error['data']['detail'])
        }else{
            navigate("/home");
        }
        setIsLoading(false);

    }

    
    return (
        <>
            <Header />

                <div className="bg-gray-100 h-screen">
                     
                    <div className="p-8 container mx-auto flex justify-center item">
                        <form action="" className="bg-white px-8 py-10 rounded-lg lg:w-1/2" onSubmit={handleLogin}>
                            
                            <div className="form-title">
                                <h1 className="font-bold text-3xl text-center">Welcome Back</h1>
                                <p className="text-center pb-6">Please enter your login details.</p>
                            </div>
                            <hr className="text-gray-300" />
                            <div className="form-body py-6 gap-x-8">
                                <div className="flex flex-col space-y-2 pb-2">
                                    <label htmlFor="">Email:</label>
                                    <input type="text" id="email" name="email" value={loginData.email} onChange={handleloginDataChange} placeholder="zubairuabduljelil@gmail.com"  className="p-2 border-gray-300 border-[1px] rounded-sm"/>
                                </div>
                                <div className="flex flex-col space-y-2 pb-2">
                                    <label htmlFor="">Password:</label>
                                    <input type="password" id="password" name="password" value={loginData.password} onChange={handleloginDataChange} placeholder=""  className="p-2 border-gray-300 border-[1px] rounded-sm"/>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row justify-center space-x-4 pb-2">
                                <div>
                                    <input type="checkbox" /> Remember me
                                </div>
                                <div>
                                    <a href="" className="text-blue-700">Forgot Password?</a>
                                </div>
                            </div>
                            <div className="py-2">
                                <button className="w-full bg-primary text-white p-2" type="submit">Login</button>
                            </div>

                            <div className="text-center flex flex-col md:flex-row space-x-4 justify-center">
                                <span>Dont have an account? </span><a href="" className="text-blue-700">Sign Up</a>
                            </div>

                        </form>
                    </div>
                </div>
        </>
    );
}

export default Login;

