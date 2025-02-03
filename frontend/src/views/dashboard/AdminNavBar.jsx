import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import chat1 from "../../assets/images/chat1.png";
import logo from '../../assets/images/logo.png';
import Cookies from 'js-cookie';
import apiInstance from "../../utils/axios";


function AdminNavBar(){

    const accessToken = Cookies.get('access_token');
    
    const [notification, setNotification] = useState(false);

    const fetchNotification = async () => {
        try {
            const response = await apiInstance.get('user/notifications', 
                { headers: { Authorization: `Bearer ${accessToken}` } }
            )
            setNotification(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        fetchNotification();
    }, [])

    return (
        <>
            <div className="sticky top-2 z-40 flex flex-row flex-wrap items-center justify-between shadow-md rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
                <div className="flex justify-between items-center space-x-2">
                    <img className="logo h-10 w-10" src={logo} />
                    <div className="brandname font-robot font-semibold">Code <span className="text-secondary">Graphics</span></div>
                </div>
                <div className="flex border-gray-300 border-[1px] px-4 bg-white rounded-lg"> 
                    <form action="">
                        <div>
                            <input type="text" className="p-2 focus:outline-none" />
                            <button className="">
                                <i className='fas fa-search text-gray-300'></i>
                            </button>
                        </div>
                    </form> 
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <a href="">
                            <i className="fas fa-bell text-2xl"></i>
                            <span className="absolute top-0 right-0 w-full bg-secondary text-white text-[12px] rounded-full text-center font-bold">{notification.length}</span>
                        </a>
                    </div>
                    <div className="h-10 w-10"><img src={chat1} alt="" /></div>
                    <a href=""><i className="fa fa-sign-out"></i></a>
                </div>
            </div>
            
        </>
    );
}


export default AdminNavBar