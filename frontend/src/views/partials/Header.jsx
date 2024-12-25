import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import hamburger from '../../assets/images/hamburger.png';
function Header() {

    const NavLinks = () => {
        return (
            <>
                <li className="navitem"><Link className="active">Category</Link></li>
                <li className="navitem"><Link>Projects</Link></li>
                <li className="navitem"><Link>About Us</Link></li>
                <li className="navitem"><Link>Contact Us</Link></li>
            </>
        )
    }

    const [ isOpen, setIsOpen ] = useState(false)

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }




    return (
        <>
            <header className="navbar">
                <div className=" flex justify-between p-6 container mx-auto ">
                    <div className="flex justify-between items-center space-x-2">
                        <img className="logo" src={logo} />
                        <div className="brandname">Code <span className="text-secondary">Graphics</span></div>
                    </div>

                    <ul className="desktop-nav">
                        <NavLinks />
                    </ul>

                    <button className="md:hidden" onClick={toggleNavbar}>
                        {isOpen ? 
                            <>
                                <div className="grid justify-center gap-2">
                                    <span className="h-1 w-8 bg-tertiary rotate-45 translate-y-3"></span>
                                    <span className="h-1 w-8 rounded-full bg-tertiary scale-x-0 transition"></span>
                                    <span className="h-1 w-8 rounded-full bg-tertiary -rotate-45 -translate-y-3"></span>
                                </div>
                            </> 
                            : 
                            <>
                                <div className="grid justify-center gap-2">
                                    <span className="h-1 w-8 bg-tertiary group-hover:rotate-45 group-hover:translate-y-3"></span>
                                    <span className="h-1 w-8 rounded-full bg-tertiary group-hover:scale-x-0 transition"></span>
                                    <span className="h-1 w-8 rounded-full bg-tertiary group-hover:-rotate-45 group-hover:-translate-y-3"></span>
                                </div>
                            </>}
                    </button>
                </div>

            </header>
            {isOpen && (
                <ul className="mobile-nav z-20">
                    <NavLinks />
                </ul>
            )}
        </>
    ); 
}

export default Header;
