import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.css';
import chat1 from "../../assets/images/chat1.png";
import logo from '../../assets/images/logo.png';


function LeftNavBar(){

    return (
        // className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        //     open ? "translate-x-0" : "-translate-x-96"
        //   }`}
        <nav className="w-[200px] min-h-full bg-white shadow-md linear fixed">
            <ul className="py-8 flex flex-col space-y-8 items-center justify-between mt-[16px]">
                <div className="flex space-x-2 items-center text-md">
                    <i className="fa fa-dashboard"></i>
                    <NavLink
                        to="/dashboard/"
                        className={({ isActive }) => isActive ? 'pr-2 bg-primary p-2 rounded-s-full text-white font-robot' : 'pr-4 font-robot' }
                    > Home
                    </NavLink>
                </div>
                <div className="flex space-x-2 items-center text-md">
                    <i class="fas fa-project-diagram"></i>
                    <NavLink
                        to="/dashboard/projects/"
                        className={({ isActive }) => isActive ? 'pr-2 bg-primary p-2 rounded-s-full text-white font-robot' : 'pr-4 font-robot' }
                    > Projects
                    </NavLink>
                </div>
                <div className="flex space-x-2 items-center text-md">
                    <i class="fas fa-wallet"></i>
                    <NavLink
                        to="/dashboard/wallet/"
                        className={({ isActive }) => isActive ? 'pr-2 bg-primary p-2 rounded-s-full text-white font-robot' : 'pr-4 font-robot' }
                    > Wallet
                    </NavLink>
                </div>
                <div className="flex space-x-2 items-center text-md">
                    <i class="fas fa-history"></i>
                    <NavLink
                        to="/dashboard/transactions/"
                        className={({ isActive }) => isActive ? 'pr-2 bg-primary p-2 rounded-s-full text-white font-robot' : 'pr-4 font-robot' }
                    > Transactions
                    </NavLink>
                </div>
                <div className="flex space-x-2 items-center text-md">
                    <i className="fa fa-user"></i>
                    <NavLink
                        to="/dashboard/profile/"
                        className={({ isActive }) => isActive ? 'pr-2 bg-primary p-2 rounded-s-full text-white font-robot' : 'pr-4 font-robot' }
                    > Profile
                    </NavLink>
                </div>
            </ul>
        </nav>
    );
}

export default LeftNavBar;


