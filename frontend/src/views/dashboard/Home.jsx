import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import AdminNavBar from "./AdminNavBar";
import LeftNavBar from "./LeftNavBar";
import Cookies from 'js-cookie';
import Toast from "../../plugin/Toast";
import useAxios from "../../utils/useAxios";
import { Link } from "react-router-dom";


function Home(){

    const accessToken = Cookies.get('access_token');
    const [profile, setProfile] = useState({
        name: "",
        contact: "",
        specialization: "",
        projects: 0,
        likes: 0
    })

    const [isLoading, setIsLoading] = useState(false);

    const fetchProfile = async () => {
        try {
            const response = await useAxios.axiosInstance.get('user/me')
            setProfile(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    return (
        <>
            <AdminNavBar />

            <main className="flex">
                <LeftNavBar />
                
                {/* Main Content */}
                <div className="flex-1 md:ml-64 pt-6 px-4 md:px-8 pb-8 bg-slate-50 min-h-[calc(100vh-64px)]">
                    <div className="max-w-7xl mx-auto">
                        
                        {/* Welcome Section */}
                        <div className="mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                                Welcome back, {profile.name || 'User'} 👋
                            </h1>
                            <p className="text-slate-600">Here's what's happening with your marketplace today</p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {/* Total Projects */}
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-slate-600 text-sm font-medium">Total Projects</p>
                                        <h3 className="text-3xl font-bold text-primary mt-2">{profile.projects || 0}</h3>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                        <i className="fas fa-project-diagram text-xl"></i>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500">
                                    <i className="fas fa-arrow-up text-green-600 mr-1"></i> Active projects
                                </p>
                            </div>

                            {/* Wallet Balance */}
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-slate-600 text-sm font-medium">Wallet Balance</p>
                                        <h3 className="text-3xl font-bold text-secondary mt-2">₦0</h3>
                                    </div>
                                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                                        <i className="fa-solid fa-naira-sign text-xl"></i>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500">
                                    <i className="fas fa-arrow-up text-green-600 mr-1"></i> Ready for withdrawal
                                </p>
                            </div>

                            {/* Likes */}
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-slate-600 text-sm font-medium">Total Likes</p>
                                        <h3 className="text-3xl font-bold text-red-600 mt-2">{profile.likes || 0}</h3>
                                    </div>
                                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                                        <i className="fas fa-heart text-xl"></i>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500">
                                    <i className="fas fa-arrow-up text-green-600 mr-1"></i> User engagement
                                </p>
                            </div>

                            {/* Revenue */}
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-slate-600 text-sm font-medium">Month Revenue</p>
                                        <h3 className="text-3xl font-bold text-green-600 mt-2">₦0</h3>
                                    </div>
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                                        <i className="fas fa-chart-line text-xl"></i>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500">
                                    <i className="fas fa-arrow-up text-green-600 mr-1"></i> Trending up
                                </p>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="bg-gradient-primary text-white rounded-xl p-8 mb-8 overflow-hidden relative">
                            <div className="absolute -right-20 -top-20 w-40 h-40 bg-white opacity-5 rounded-full"></div>
                            <div className="relative z-10">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to Maximize Your Earnings?</h2>
                                        <p className="text-slate-200 mb-4">
                                            Upgrade to a premium account to unlock advanced features and reach more customers.
                                        </p>
                                    </div>
                                    <button className="btn px-8 py-3 whitespace-nowrap flex-shrink-0">
                                        Upgrade Now
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link 
                                to="/dashboard/projects/"
                                className="bg-white rounded-xl p-4 text-center hover:shadow-md transition-shadow group"
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform">
                                    <i className="fas fa-plus text-xl"></i>
                                </div>
                                <h3 className="font-semibold text-primary text-sm">Upload Project</h3>
                                <p className="text-xs text-slate-500 mt-1">Share new materials</p>
                            </Link>

                            <button className="bg-white rounded-xl p-4 text-center hover:shadow-md transition-shadow group">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform">
                                    <i className="fas fa-chart-bar text-xl"></i>
                                </div>
                                <h3 className="font-semibold text-primary text-sm">Analytics</h3>
                                <p className="text-xs text-slate-500 mt-1">View insights</p>
                            </button>

                            <Link 
                                to="/dashboard/wallet/"
                                className="bg-white rounded-xl p-4 text-center hover:shadow-md transition-shadow group"
                            >
                                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mx-auto mb-3 group-hover:scale-110 transition-transform">
                                    <i className="fas fa-wallet text-xl"></i>
                                </div>
                                <h3 className="font-semibold text-primary text-sm">Withdraw</h3>
                                <p className="text-xs text-slate-500 mt-1">Request payment</p>
                            </Link>

                            <Link 
                                to="/dashboard/profile/"
                                className="bg-white rounded-xl p-4 text-center hover:shadow-md transition-shadow group"
                            >
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mx-auto mb-3 group-hover:scale-110 transition-transform">
                                    <i className="fas fa-user text-xl"></i>
                                </div>
                                <h3 className="font-semibold text-primary text-sm">Profile</h3>
                                <p className="text-xs text-slate-500 mt-1">Edit details</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Home;