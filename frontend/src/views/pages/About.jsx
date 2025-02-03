import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";
import { login } from "../../utils/auth"
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeOpen, faCompass } from '@fortawesome/free-regular-svg-icons';
import banner from "../../assets/images/banner.jpg";
import mission from "../../assets/images/mission.png";
import team1 from "../../assets/images/team1.jpg";
import chat1 from "../../assets/images/chat1.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function About() {

    return (
        <>
            <Header />

            <section className="bg-gray-200 p-8">
                <div className="container mx-auto flex space-x-20 h-1/2 justify-center items-center px-10">
                    <div className="flex-1 space-y-4 text-center">
                        <h1 className="text-3xl font-robot font-bold text-primary">About <span className="text-secondary">Us</span></h1>
                        <p className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                            Suscipit excepturi mollitia quidem nobis quos, explicabo 
                            veniam incidunt quas cum qui ipsam nostrum saepe, vitae temporibus. 
                            Ratione nisi cupiditate obcaecati a.</p>
                    </div>

                    <div>
                        <img src={team1} alt="" className="h-80 w-80 object-cover rounded-lg" />
                    </div>
                </div>
            </section>

            <section className="p-8">
                <div className="container mx-auto flex space-x-10 justify-center p-10">
                    <div>
                        <img src={mission} alt="" className="h-60 w-60 object-cover rounded-lg" />
                    </div>
                    <div className="flex-1 space-y-4 py-6">
                        <h1 className="text-3xl font-robot font-bold text-primary">Our Mission</h1>
                        <small className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit..</small>
                        <ul className="flex flex-col space-y-2">
                            <li className="list-disc ml-10">Lorem, ipsum dolor.</li>
                            <li className="list-disc ml-10">Lorem, ipsum dolor.</li>
                            <li className="list-disc ml-10">Lorem, ipsum dolor.</li>
                        </ul>

                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente officiis 
                            rem nesciunt? Harum, recusandae incidunt.</p>

                    </div>
                    <div className="flex-1 space-y-4 py-6">
                        <h1 className="text-3xl font-robot font-bold text-primary">Our Vission</h1>
                        <small className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit..</small>
                        <ul className="flex flex-col space-y-2">
                            <li className="list-disc ml-10">Lorem, ipsum dolor.</li>
                            <li className="list-disc ml-10">Lorem, ipsum dolor.</li>
                            <li className="list-disc ml-10">Lorem, ipsum dolor.</li>
                        </ul>

                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente officiis 
                            rem nesciunt? Harum, recusandae incidunt.</p>

                    </div>
                </div>
            </section>

            <section className="p-8">
                <h1 className="p-8 text-center text-primary font-robot text-3xl font-extrabold">Meet Our Inspiring Executives</h1>
                <div className="container mx-auto p-8 flex space-x-8">
                    <div className="flex space-x-8 border-gray-200 border-2 p-4">
                        <img src={team1} alt="" className="h-60 w-60 object-cover shadow-lg rounded-e-full" />
                        <div className="flex flex-col space-y-2">
                            <div>
                                <h1 className="font-bold font-robot">Zubairu Abduljelil</h1>
                                <small>Software Engineer</small>
                            </div>
                            <div className="social-links flex space-x-2">
                                <FontAwesomeIcon icon={faFacebook} className="p-2 bg-primary text-white rounded-md" />
                                <FontAwesomeIcon icon={faTwitter} className="p-2 bg-primary text-white rounded-md"  />
                                <FontAwesomeIcon icon={faInstagram} className="p-2 bg-primary text-white rounded-md" />
                            </div>
                            <div>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil sit consequuntur aspernatur
                                     alias possimus odio quasi delectus consequatur similique ab?</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row-reverse space-x-8 border-gray-200 border-2 p-4">
                        <img src={team1} alt="" className="pl-4 h-60 w-60 object-cover rounded-s-full" />
                        <div className="flex flex-col space-y-2">
                            <div>
                                <h1 className="font-bold font-robot">Yusuf Abdulmalik</h1>
                                <small>Software Engineer</small>
                            </div>
                            <div className="social-links flex space-x-2">
                                <FontAwesomeIcon icon={faFacebook} className="p-2 bg-primary text-white rounded-md" />
                                <FontAwesomeIcon icon={faTwitter} className="p-2 bg-primary text-white rounded-md"  />
                                <FontAwesomeIcon icon={faInstagram} className="p-2 bg-primary text-white rounded-md" />
                            </div>
                            <div>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil sit consequuntur aspernatur
                                     alias possimus odio quasi delectus consequatur similique ab?</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="p-8">
                <div className="container mx-auto p-8">
                    <div className="grid gap-4 grid-cols-2">
        
                        <form action="" className="bg-white px-8 py-10 border-gray-300 border-[1px] rounded-lg">
                            
                            <div className="form-title">
                                <h1 className="font-bold text-3xl text-center">Send us a mail today!</h1>
                            </div>

                            <div className="form-body py-6 gap-x-8">
                                <div className="flex flex-col space-y-2 pb-2">
                                    <label htmlFor="">Your email:</label>
                                    <input type="text" id="email" name="email" placeholder="zubairuabduljelil@gmail.com"  className="p-2 border-gray-300 border-[1px] rounded-sm"/>
                                </div>
                                <div className="flex flex-col space-y-2 pb-2">
                                    <label htmlFor="">Title</label>
                                    <input type="password" id="password" name="password" placeholder=""  className="p-2 border-gray-300 border-[1px] rounded-sm"/>
                                </div>
                                <div className="flex flex-col space-y-2 pb-2">
                                    <label htmlFor="">Message</label>
                                    <textarea name="" id="" className="p-2 border-gray-300 border-[1px] rounded-sm"></textarea>
                                </div>
                            </div>
                            
                            <div className="py-2">
                                <button className="w-full bg-primary text-white p-2" type="submit">Send Message</button>
                            </div>
                        </form>
                        <div>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d31619.37071191007!2d6.7386954999999995!3d7.8508947000000004!
                            // 2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1735208443731!5m2!1sen!2sng" width='100%' height='100%' style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default About;
