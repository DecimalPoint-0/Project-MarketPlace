import React, { useState, useEffect } from "react";
import Home from './Home'
import AdminNavBar from "./AdminNavBar";
import LeftNavBar from "./LeftNavBar";
import chat1 from "../../assets/images/chat1.png";
import navy_bg from "../../assets/images/navy_bg.jpg";
import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import Cookies from 'js-cookie';
import Moment from "../../plugin/Moment";
import Toast from "../../plugin/Toast";

function Profile(){

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
            const responseProfile = await apiInstance.get('user/me', 
                { headers: { Authorization: `Bearer ${accessToken}` } }
            )
            setProfile(responseProfile.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (event) => {
        setProfile({
            ...profile,
            [event.target.name]: event.target.value,
        });
    }

    const handleUpdateData = async (event) => {
        event.preventDefault();
        setIsLoading(true)

        const formData = new FormData()

        formData.append("name", profile.name)
        formData.append("specialization", profile.specialization)
        formData.append("contact", profile.contact)
        formData.append("password", profile.password)

        try {
            const response = await apiInstance.patch(`user/me`,  formData,
                { headers: { 
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${accessToken}`
                }}
            )
            Toast('success', "profile Updated Successfully")
            setIsLoading(false)
            window.location.reload()

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
            
            <div className="p-8 flex-1 ml-[200px] bg-slate-100"> 
                <div className="grid grid-cols-2 gap-8 w-full bg-cover">
                    <div>
                        <div  className="bg-white p-4 rounded-lg shadow-lg">
                            <div className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover" 
                                style={{ backgroundImage: `url(${navy_bg})` }}>
                                <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-blue-400 dark:!border-navy-700">
                                    <img className="h-full w-full rounded-full" src={chat1} alt="" />
                                </div>
                            </div>

                            <div className="mt-16 flex flex-col items-center">
                                <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                                    { profile?.name }
                                </h4>
                                <p className="text-base font-normal text-gray-600">{ profile?.specialization ?? null}</p>
                                <p className="text-base font-normal text-gray-600">{ profile?.email }</p>
                            </div>

                            <div className="mt-6 mb-3 flex gap-4 md:!gap-14 justify-center">
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-2xl font-bold text-navy-700 dark:text-white">{profile?.projects ?? 0}</p>
                                    <p className="text-sm font-normal text-gray-600">Projects</p>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-2xl font-bold text-navy-700 dark:text-white">
                                        {profile?.likes ?? 0}
                                    </p>
                                    <p className="text-sm font-normal text-gray-600">Likes</p>
                                </div>
                                    <div className="flex flex-col items-center justify-center">
                                    <p className="text-2xl font-bold text-navy-700 dark:text-white">
                                        434
                                    </p>
                                <p className="text-sm font-normal text-gray-600">Audience Reached</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-lg h-full">
                        <form action="" onSubmit={handleUpdateData} className="bg-white p-4 rounded-lg">
                            <div className="form-body py-6 gap-x-8">
                                <div className="flex flex-col space-y-2 pb-2 mb-2">
                                    <label htmlFor="">Full Name:</label>
                                    <input type="text" id="name" name="name" value={profile.name} onChange={handleChange} placeholder="zubairuabduljelil@gmail.com"  className="p-2 border-gray-300 border-[1px] rounded-lg w-full focus:outline-none"/>
                                </div>
                                <div className="flex flex-col space-y-2 pb-2 mb-2">
                                    <label htmlFor="">Speciality:</label>
                                    <input type="text" id="speciality" name="specialization" value={profile.specialization} onChange={handleChange} placeholder=""  className="p-2 border-gray-300 border-[1px] rounded-lg w-full focus:outline-none"/>
                                </div>
                                <div className="flex flex-col space-y-2 pb-2 mb-4">
                                    <label htmlFor="">Contact:</label>
                                    <input type="number" id="contact" name="contact" value={profile.contact} onChange={handleChange}  className="p-2 border-gray-300 border-[1px] rounded-lg w-full focus:outline-none"/>
                                </div>
                                <div className="flex flex-col space-y-2 pb-2">
                                    <label htmlFor="">Password:</label>
                                    <input type="password" id="password" name="password" value={profile.password} onChange={handleChange}  className="p-2 border-gray-300 border-[1px] rounded-lg w-full focus:outline-none"/>
                                </div>
                            </div>
                            
                            <div className="py-2">
                                <button className="bg-primary text-white py-2 px-4 rounded-md" type="submit">Save</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            </main>
        
        </>
    );
}

export default Profile;