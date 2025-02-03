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
import { Button } from "@material-tailwind/react";

function Wallet(){

    const accessToken = Cookies.get('access_token');
    const [wallet, setWallet] = useState([])

    const [cashout, setCashout] = useState({
        'amount': parseFloat(''),
    })

    const handleAmountChange = (event) => {
        setCashout({
            ...cashout,
            [event.target.name]: event.target.value,
        });
    }
    
    const [account, setAccount] = useState({
        'account_name': '',
        'account_number': '',
        'bank': ''
    })


    const handlecashOut = async (event) => {
        event.preventDefault();

        const formData = new FormData()

        formData.append("amount", cashout.amount)

        try {
            setIsLoading(true)
            const response = await apiInstance.post(`user/cashout`,  formData,
                { headers: { 
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${accessToken}`
                }}
            )
            Toast('success', "Cashout Processed Successfully")
            setIsLoading(false)
            fetchWallet()

        } catch (error) {
            console.log(error)
            Toast('error', error.response?.data?.message || 'An error occured')
        }
    }

    const handleChange = (event) => {
        setAccount({
            ...account,
            [event.target.name]: event.target.value,
        });
    }

    const handleUpdateData = async (event) => {
        event.preventDefault();
        
        const formData = new FormData()
        
        formData.append("account_name", account.account_name)
        formData.append("account_number", account.account_number)
        formData.append("bank", account.bank)
        formData.append("balance", parseInt('20000'))
        
        try {
            setIsLoading(true)
            const response = await apiInstance.patch(`user/wallet`,  formData,
                { headers: { 
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${accessToken}`
                }}
            )
            Toast('success', "Account Details Updated Successfully")
            setIsLoading(false)
            fetchWallet()

        } catch (error) {
            console.log(error)
        }

    }

    const [isLoading, setIsLoading] = useState(false);

    const fetchWallet = async () => {
        try {
            const response = await apiInstance.get('user/wallet', 
                { headers: { Authorization: `Bearer ${accessToken}` } }
            )
            setWallet(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        fetchWallet()
    }, [])
    
    return (
        <>
            <AdminNavBar />

                <main className="flex">
                        
                    <LeftNavBar />

                    <div className="p-8 flex-1 min-h-screen ml-[200px] bg-slate-100 flex flex-col gap-6"> 
                        <h5 className="text-center font-bold text-3xl">Welcome to your account manager</h5>
                        <p className="text-sm text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus deserunt quo dignissimos quam, eos ea!</p>
                        <div className="grid grid-cols-2 gap-6">
                            {/* wallet details  */}
                            <div className="p-4 space-y-2 rounded-lg shadow-lg text-slate-700 bg-white">
                                <div className="flex space-x-4 items-center">
                                    <i className="fas fa-bar-chart"></i>
                                    <h5 className="text-lg">Earnings</h5>
                                </div>
                                <hr className="text-slate-50" />
                                <div className="flex flex-col space-y-4">
                                    <h5>Referal Earnings: <span className="font-bold text-xl">&#8358;0</span></h5>
                                    <h5>Project Earnings: <span className="font-bold text-xl">&#8358;{wallet?.balance ?? 0}</span> </h5>
                                </div>
                                <hr className="text-slate-50" />
                                <div className="flex justify-between">
                                    <h5>Total Earnings: <span className="font-bold text-xl">&#8358;{wallet?.balance ?? 0}</span></h5>
                                </div>
                                <hr className="text-slate-50" />
                                <div className="mt-4">
                                    <div className="flex space-x-4 items-center justify-center">
                                        <i className="fas fa-money-bill"></i>
                                        <h5 className="font-bold text-xl text-green-700">Cash Out</h5>
                                    </div>
                                    <form action="" onSubmit={handlecashOut} className="flex space-x-4 my-4">
                                        <input type="number" name="amount" value={cashout.amount} onChange={handleAmountChange} placeholder="0.00" className="px-4 p-2 border-slate-200 border rounded-md flex-1" />
                                        <Button type="submit" className="font-robot font-bold text-white bg-green-600 rounded-sm p-2">Cashout</Button>
                                    </form>
                                    <p className="text-red-500">Note: The cashout will be processed and the money will be sent to your account!</p>
                                </div>
                                
                            </div>

                            {/* referal link  */}
                            
                            <div className="p-4 space-y-2 rounded-lg shadow-lg flex flex-col text-slate-700 bg-white">
                                <div className="flex space-x-4 items-center">
                                    <i className="fas fa-share"></i>
                                    <h5 className="text-lg">Referal Link</h5>
                                </div>
                                <hr className="text-slate-50" />
                                <div className="flex flex-col space-y-4">

                                    <div className="w-full flex items-center">
                                        <input disabled type="text" placeholder="https/www.codegraphs/com/$334234" className="px-4 p-2 border-slate-200 border flex-1" />
                                        <a href="" className="bg-primary text-white h-full p-2">Copy Link <i className="fas fa-copy "></i></a>
                                    </div>
                                    <div className="flex space-x-4 items-center justify-center">
                                        <i className="fab fa-instagram text-2xl"></i>
                                        <i className="fab fa-whatsapp text-2xl"></i>
                                        <i className="fab fa-facebook text-2xl"></i>
                                        <i className="fab fa-twitter text-2xl"></i>
                                    </div>
                                </div>
                            </div>
                            

                            {/* bank details  */}
                            <div className="p-4 space-y-2 rounded-lg shadow-lg flex flex-col justify-evenly text-slate-700 bg-white">
                                <div className="flex space-x-4 items-center">
                                    <i className="fas fa-bank"></i>
                                    <h5 className="text-lg">Bank Details</h5>
                                </div>
                                <hr className="text-slate-50" />
                                <div className="flex flex-col space-y-4">
                                    <h5>Account Name: <span className="font-bold text-lg">{wallet?.account_name}</span></h5>
                                    <hr className="text-slate-50" />
                                    <h5>Account Number: <span className="font-bold text-lg">{wallet?.account_number} </span></h5>
                                    <hr className="text-slate-50" />
                                    <h5>Bank: <span className="font-bold text-lg">{wallet?.bank} </span></h5>
                                    
                                </div>
                                <hr className="text-slate-50" />
                            </div>

                            
                            {/* update bank details  */}
                            <div className="p-4 space-y-2 rounded-lg shadow-lg flex flex-col text-slate-700 bg-white">
                                <div className="flex space-x-4 items-center">
                                    <i className="fas fa-bank"></i>
                                    <h5 className="text-lg">Update Account Details</h5>
                                </div>
                                <hr className="text-slate-50" />
                                <form action="" onSubmit={handleUpdateData}>
                                    <div className="flex flex-col space-y-4">
                                        <input type="text" name="account_name" value={account.account_name} onChange={handleChange} placeholder="Enter Account Name" className="px-4 p-2 border-slate-200 border flex-1" />
                                        <input type="text" name="bank" value={account.bank} onChange={handleChange} placeholder="Enter Bank Name" className="px-4 p-2 border-slate-200 border flex-1" />
                                        <input type="number" name="account_number" value={account.account_number} onChange={handleChange} placeholder="Enter Account Number" className="px-4 p-2 border-slate-200 border flex-1" />
                                    </div>
                                    <hr className="text-slate-50" />
                                    <div className="pt-4">
                                        <Button type="submit" className="font-robot font-bold text-white bg-green-600 rounded-sm p-2">Update</Button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </main>
        </>
    );

}

export default Wallet;
