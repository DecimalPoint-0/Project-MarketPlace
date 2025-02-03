import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import AdminNavBar from "./AdminNavBar";
import LeftNavBar from "./LeftNavBar";
import useUserData from "../../plugin/useUserData";
import Cookies from 'js-cookie';
import Moment from "../../plugin/Moment";
import Toast from "../../plugin/Toast";
import useAxios from "../../utils/useAxios";


function Home(){

    const accessToken = Cookies.get('access_token');
    const [profile, setProfile] = useState({
        name: "",
        contact: "",
        specialization: "",
        password: "",
        projects: "",
        likes: ""
    })

    const [isLoading, setIsLoading] = useState(false);

    const fetchProfile = async () => {
        try {
            const response = await useAxios.axiosInstance.get('user/me', 
            )
            setProfile(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        fetchProfile()
    }, [])

    return (
        <>
            <AdminNavBar />

            <main className="flex">
                    
            <LeftNavBar />
                <div className="p-8 flex-1 ml-[200px] min-h-screen bg-slate-100 h-full">
                    <div className="flex flex-col mb-8">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="p-4 bg-white rounded-3xl shadow-lg flex space-x-4 items-center">
                                <div>
                                    <i className="fas fa-project-diagram rounded-full p-4 bg-slate-200 text-primary"></i>
                                </div>
                                <div className="text-slate-400">
                                    <h5 className="text-sm font-robot font-bold">Projects</h5>
                                    <h1 className="text-2xl text-primary">{profile.projects}</h1>
                                </div>
                            </div>

                            <div className="p-4 bg-white rounded-3xl shadow-lg flex space-x-4 items-center">
                                <div>
                                    <i className="fa-solid fa-naira-sign rounded-full p-4 bg-slate-200 text-primary"></i>
                                </div>
                                <div className="text-slate-400">
                                    <h5 className="text-sm font-robot font-bold">Wallet</h5>
                                    <h1 className="text-2xl text-primary">&#8358;5</h1>
                                </div>
                            </div>

                            <div className="p-4 bg-white rounded-3xl shadow-lg flex space-x-4 items-center">
                                <div>
                                    <i className="fas fa-asterisk rounded-full p-4 bg-slate-200 text-primary"></i>
                                </div>
                                <div className="text-slate-400">
                                    <h5 className="text-sm font-robot font-bold">Referals</h5>
                                    <h1 className="text-2xl text-primary">0</h1>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div>
                        <div className="bg-primary flex space-x-2 text-white items-center p-4">
                            <h1 className="text-5xl">🤩</h1>
                            <h1>Upgrade to freelance account and earn each time your project is purchased</h1>
                            <a href="">Update Now!</a>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 my-8">
                        <div className="bg-primary p-4 rounded-lg shadow-lg flex space-x-4">
                            <div>
                                <i className="fas fa-add p-4 text-xl text-primary bg-slate-200 rounded-full"></i>
                            </div>
                            <div className="text-white">
                                <h5>Add</h5>
                                <h4 className="font-bold">Projects</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

</>
    );
}


export default Home