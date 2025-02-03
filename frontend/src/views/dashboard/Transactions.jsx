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
import Swal from "sweetalert2";

function Transactions(){
    
    // instantiating variables 
    const [transactions, setTransactions] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // async function to get transactions
    const fetchTransactions = async () => {
        try{
            setIsLoading(true)
            const response = await apiInstance.get('user/transactions')
            setTransactions(response.data.results)
        }catch(error){
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTransactions()
    }, [])

    return (
        <>
            <AdminNavBar />

            <main className="flex">
                    
            <LeftNavBar />
                <div className="p-8 flex-1 ml-[200px] min-h-screen bg-slate-100 h-full text-center">
                    <h1 className="text-2xl font-bold text-center mb-4">Transactions</h1>
                    <h5 className="mb-4">Below are your transaction history(" cashout and purchases")</h5>

                    <table className="w-full p-4 bg-white">
                        <thead className="bg-primary text-white">
                            <td className="py-4">SN</td>
                            <td>Description</td>
                            <td>Date</td>
                            <td>Amount</td>
                        </thead>
                        <tbody>
                            {transactions?.map((t, i) => (
                                <tr >
                                    <td className="py-4">{i}</td>
                                    <td>{t?.description}</td>
                                    <td>{Moment(t?.date)}</td>
                                    <td className="text-green-500">{t?.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

        </>
    );
}


export default Transactions