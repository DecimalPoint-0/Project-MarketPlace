import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Toast from "../../plugin/Toast"
import { json, Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth"
import { register } from "../../utils/auth"

function SignUp(){

    const [bioData, setBioData] = useState({
        'email': '',
        'name': '',
        'password': '',
        'password2': '',
        'contact': ''
    })

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const handleBioDataChange = (event) => {
        setBioData({
            ...bioData,
            [event.target.name]: event.target.value,
        });

    }

    const resetForm = () => (
        setBioData({
            email: "",
            name: "",
            password: "",
            password2: "",
            contact: "",

        })
    )

    const handleBioDataRegister= async (event) =>{
        event.preventDefault();
        setIsLoading(true);
        
        const {error} = await register(bioData.email, bioData.name, bioData.password, bioData.password2, bioData.contact);

        if (error){
            alert(JSON.stringify(error));
        }else{
            navigate("/home");
        }
        setIsLoading(false);

    }

    
    return (
        <>
            <Header />

                <div className="bg-gray-100 h-full">
                     
                    <div className="p-8 container mx-auto flex justify-center item">
                        <form action="" className="bg-white p-8 rounded-lg md:w-[70%]" onSubmit={handleBioDataRegister}>
                            
                            <div className="form-title">
                                <h1 className="font-bold text-3xl text-center">Welcome</h1>
                                <p className="text-center pb-6">Lorem ipsum dolor sit amet.</p>
                            </div>
                            <hr className="text-gray-300" />
                            <div className="form-body py-6 grid md:grid-cols-2 gap-x-8">
                                <div className="flex flex-col space-y-2 pb-2">
                                    <label htmlFor="">Name:</label>
                                    <input type="text" id="name" name="name" value={bioData.name} onChange={handleBioDataChange} placeholder="zubairuabduljelil@gmail.com"  className="p-2 border-gray-300 border-[1px] rounded-sm"/>
                                </div>
                                <div className="flex flex-col space-y-2 pb-2">
                                    <label htmlFor="">Email Address:</label>
                                    <input type="email" id="email" name="email" value={bioData.email} onChange={handleBioDataChange} placeholder="John Doe"  className="w-full p-2 border-gray-300 border-[1px] rounded-sm"/>
                                </div>
                                <div className="flex flex-col space-y-2 pb-2">
                                    <label htmlFor="">Phone Number:</label>
                                    <input type="number" id="contact" name="contact" value={bioData.contact} onChange={handleBioDataChange} placeholder="09012024759"  className="p-2 border-gray-300 border-[1px] rounded-sm"/>
                                </div>
                                <div className="flex flex-col space-y-2 pb-2">
                                    <label htmlFor="">Password:</label>
                                    <input type="password" id="password" name="password" value={bioData.password} onChange={handleBioDataChange} placeholder=""  className="p-2 border-gray-300 border-[1px] rounded-sm"/>
                                </div>
                                <div className="flex flex-col space-y-2 pb-2">
                                    <label htmlFor="">Confirm Password:</label>
                                    <input type="password" id="password2" name="password2" value={bioData.password2} onChange={handleBioDataChange} placeholder=""  className="p-2 border-gray-300 border-[1px] rounded-sm"/>
                                </div>
                            </div>
                            <div className="py-2">
                                <button className="w-full bg-primary text-white p-2" type="submit">Sign Up</button>
                            </div>

                            <div className="text-center">
                                <span>Already have an account </span><a href="" className="text-blue-700">Click here</a>
                            </div>

                        </form>
                    </div>

                </div>


        </>
    );
}

export default SignUp;

