import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeOpen, faCompass } from '@fortawesome/free-regular-svg-icons';
import logo from '../../assets/images/logo.png';

function Footer() {
    return (
        <footer className="bg-primary text-light">
            <div className="container mx-auto p-8 grid md:grid-cols-3 gap-x-8">
                <div className=" hidden col-md-5 mb-3 mb-md-0 md:flex flex-col space-y-8 align-middle items-center px-8">
                    <div className="flex flex-col items-center">
                        <img src={logo} className="h-10 w-10" alt="" /> 
                        <span>CodeGraphics</span>
                    </div>
                    <small className="text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo odio deleniti ipsa, aspernatur illum porro..</small>
                    <div className="social-links flex space-x-2">
                        <FontAwesomeIcon icon={faFacebook} className="p-2 bg-light text-secondary rounded-full" />
                        <FontAwesomeIcon icon={faTwitter} className="p-2 bg-light text-secondary rounded-full"  />
                        <FontAwesomeIcon icon={faInstagram} className="p-2 bg-light text-secondary rounded-full" />
                    </div>
                </div>
                <div className="contact flex flex-col space-y-4">
                    <div className="flex space-x-4 border-b-secondary">
                        <FontAwesomeIcon icon={faEnvelopeOpen} className="text-light rounded-full text-3xl" />
                        <div>
                            <h5 className="font-bold font-robot text-secondary">Email</h5>
                            <p>support@codegraphics.com</p>
                        </div>
                    </div>
                    <hr className="text-light" />
                    <div className="flex space-x-4">
                        <FontAwesomeIcon icon={faEnvelopeOpen} className="text-light rounded-full text-3xl" />
                        <div>
                            <h5 className="font-bold font-robot text-secondary">Phone</h5>
                            <p>09012024759</p>
                        </div>
                    </div>
                    <hr className="text-light" />
                    <div className="flex space-x-4">
                        <FontAwesomeIcon icon={faCompass} className="text-light rounded-full text-3xl" />
                        <div>
                            <h5 className="font-bold font-robot text-secondary">Address</h5>
                            <p>Felele, Lokoja Kogi State</p>
                        </div>
                    </div>
                   
                </div>
                <div className="col-md-4 flex flex-col space-y-4">
                    <h1 className="text-secondary text-2xl font-bold">Quick links</h1>
                    <div className=" flex space-x-8 pl-4">
                        <div>
                            <ul className="flex flex-col space-y-4">
                                <li>About Us</li>
                                <li>Cookie Policy</li>
                                <li>Booking Policy</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                        <div>
                            <ul className="flex flex-col space-y-4">
                                <li>Privacy Policy</li>
                                <li>Terms and Condition</li>
                                <li>Sign Up</li>
                                <li>Sign In</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
