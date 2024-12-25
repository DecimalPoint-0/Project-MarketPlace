import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import img1 from "../../assets/images/img1.png"
import img2 from "../../assets/images/img2.png"
import banner from "../../assets/images/banner.jpg";
import vector1 from "../../assets/images/vector1.png";
import vector2 from "../../assets/images/vector2.png";
import vector3 from "../../assets/images/vector3.png";
import chat1 from "../../assets/images/chat1.png";
import chat2 from "../../assets/images/chat2.png";
import chat3 from "../../assets/images/chat3.png";


function Index(){
    return (
        <div className="bg-light">
            <Header />

            {/*hero-section starts*/}

            <main className="hero relative w-full h-screen">
                {/* Background Image */}
                <div className="absolute inset-0 bg-cover bg-center"></div>

                {/* Content */}
                <div className="hero-content-container sm:px-10 space-y-8 absolute inset-0 flex flex-col justify-center items-center text-center text-light z-10">
                    <div className="hero-title">
                        <h1 className="font-robot text-3xl md:text-7xl font-bold">
                            Welcome to <span className="text-tertiary">CodeGraphics</span> 
                        </h1>
                    </div>
                    <div className="hero-paragraph mt-4">
                        <p className="text-lg sm:text-xl">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Corrupti optio repellendus unde fugit vel ex, explicabo hic, 
                            voluptatem cumque cum veritatis rerum inventore reprehenderit at pariatur 
                            ab minima tenetur odio voluptate possimus assumenda. Deleniti voluptas quibusdam dolores, 
                            provident, rem optio, ratione unde modi repudiandae fugit tempora eum? Aspernatur, beatae suscipit?
                        </p>
                    </div>
                    <div>
                        <button className="btn">Explore Our Site</button>
                    </div>
                </div>
            </main>
            {/* hero-section ends */}

            {/* categories of projects*/}
            <section className="category container mx-auto py-[80px]">
                <div className="flex flex-col space-y-4">
                    <h5 className="text-center text-primary font-bold text-lg font-noto-sans">
                        Categories of Projects
                    </h5>
                    <h1 className="text-center text-3xl font-robot text-secondary">Lorem ipsum dolor sit amet.</h1>
                    <div className="category-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
                        <div className="category-item flex flex-col rounded-lg items-center bg-tertiary p-4">
                            <img src={img1} alt="" className="h-40 hidden md:block  w-40 mx-auto rounded-full border-solid border-2 border-light" />
                            <div className="px-2 py-4 text-primary text-center items-center">
                                <h3 className="text-xl font-bold mb-2">Web Development</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                <button className="btn mt-2">Check Out</button>
                            </div>
                        </div>
                        <div className="category-item flex flex-col rounded-lg items-center bg-tertiary p-4">
                            <img src={img2} alt="" className="hidden md:block h-40 w-40 mx-auto rounded-full border-solid border-2 border-light" />
                            <div className="px-2 py-4 text-primary text-center items-center">
                                <h3 className="text-xl font-bold mb-2">Web Development</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                <button className="btn mt-2">Check Out</button>
                            </div>
                        </div>
                        <div className="category-item flex flex-col rounded-lg items-center bg-tertiary p-4">
                            <img src={img1} alt="" className="hidden md:block h-40 w-40 mx-auto rounded-full border-solid border-2 border-light" />
                            <div className="px-2 py-4 text-primary text-center items-center">
                                <h3 className="text-xl font-bold mb-2">Web Development</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                <button className="btn mt-2">Check Out</button>
                            </div>
                        </div>
                        <div className="category-item flex flex-col rounded-lg items-center bg-tertiary p-4">
                            <img src={img2} alt="" className="hidden md:block h-40 w-40 mx-auto rounded-full border-solid border-2 border-light" />
                            <div className="px-2 py-4 text-primary text-center items-center">
                                <h3 className="text-xl font-bold mb-2">Web Development</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                <button className="btn mt-2">Check Out</button>
                            </div>
                        </div>
                                                
                    </div>
                </div>

            </section>
            {/* category ends here */}

            {/* level  */}
            <section className="py-[80px] bg-tertiary ">
                <div className="container mx-auto">
                    <div className="flex flex-col space-y-4">
                        <h5 className="text-center text-primary font-bold text-lg font-noto-sans">
                            Our Project Levels
                        </h5>
                        <h1 className="text-center text-3xl font-robot text-secondary">Lorem ipsum dolor sit amet.</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-8 gap-4">
                            <div className="p-8 flex flex-col justify-center items-center space-y-4 bg-light">
                                <h1 className="font-bold font-robot text-3xl text-primary">HND</h1>
                                <p className="text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, molestiae.</p>
                                <div>
                                    <a href="" className="btn-secondary">Explore</a>
                                </div>
                            </div>
                            <div className="p-8 flex flex-col justify-center items-center space-y-4 bg-light">
                                <h1 className="font-bold font-robot text-3xl text-primary">BSC</h1>
                                <p className="text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, molestiae.</p>
                                <div>
                                    <a href="" className="btn-secondary">Explore</a>
                                </div>
                            </div>
                            <div className="p-8 flex flex-col justify-center items-center space-y-4 bg-light">
                                <h1 className="font-bold font-robot text-3xl text-primary">NCE</h1>
                                <p className="text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, molestiae.</p>
                                <div>
                                    <a href="" className="btn-secondary">Explore</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* about us  */}
            <section className="py-[80px] bg-light">
                <div className="container mx-auto p-8 grid lg:grid-cols-2 gap-x-12">
                    <div className="left rounded-xl">
                        <img src={banner} alt="" className="h-full w-full rounded-xl" />
                    </div>
                    <div className="right flex flex-col space-y-8">
                        <h5 className="text-primary font-bold text-center ">About CodeGraphics</h5>
                        <h1 className="font-robot font-bold text-4xl text-secondary">CodeGraphics Market Place Your No. One home of quality projects</h1>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                            Pariatur dolorem vitae voluptas et quos quam harum deserunt 
                            illum qui dolore, voluptate beatae, natus similique perferendis 
                            quaerat saepe iure officia adipisci. Alias enim possimus molestiae. 
                            Ex mollitia cum vel nam distinctio ullam culpa! 
                            Quia porro veritatis accusamus, magnam id cupiditate. Rem.</p>
                        <div className="md:grid md:grid-cols-4 gap-x-4 hidden">
                            <div className="p-4 bg-tertiary text-center">
                                <h5 className="text-primary text-bold">1000</h5>
                                <small>Happy Customers</small>
                            </div>
                            <div className="p-4 bg-tertiary text-center">
                                <h5 className="text-primary text-bold">1000</h5>
                                <small>Projects</small>
                            </div>
                            <div className="p-4 bg-tertiary text-center">
                                <h5 className="text-primary text-bold">4</h5>
                                <small>Services</small>
                            </div>
                        </div>
                        <div>
                            <a href="" className="btn-secondary inline">Know More</a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="why-us py-[80px]">
                <div className="container mx-auto flex flex-col space-y-4">
                    <h5 className="text-center text-primary font-bold text-lg font-noto-sans">
                            Why Us
                    </h5>
                        <h1 className="text-center text-3xl font-robot text-secondary">Lorem ipsum dolor sit amet.</h1>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-light p-8">
                        <div className="p-4 flex flex-col justify-center items-center space-y-4 bg-tertiary rounded-2xl">
                            <img src={vector1} className="h-20 w-20" alt="" />
                            <p className="font-bold text-primary">We are <span className="text-2xl text-secondary">100%</span> Reliable</p>
                        </div>
                        <div className="p-4 flex flex-col justify-center items-center space-y-4 bg-tertiary rounded-2xl">
                            <img src={vector2} className="h-20 w-20" alt="" />
                            <p className="font-bold text-primary">less than <span className="text-2xl text-secondary">10%</span>Plagiarism</p>
                        </div>
                        <div className="p-4 flex flex-col justify-center items-center space-y-4 bg-tertiary rounded-2xl">
                            <img src={vector3} className="h-20 w-20" alt="" />
                            <p className="font-bold text-primary">less than <span className="text-2xl text-secondary">10%</span>Plagiarism</p>
                        </div>
                        <div className="p-4 flex flex-col justify-center items-center space-y-4 bg-tertiary rounded-2xl">
                            <img src={vector3} className="h-20 w-20" alt="" />
                            <p className="font-bold text-primary">less than <span className="text-2xl text-secondary">10%</span>Plagiarism</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="testimonials">
                <div className="flex flex-col space-y-4">
                    <h5 className="text-center text-primary font-bold text-lg font-noto-sans">Testimonials</h5>
                    <h1 className="text-center text-3xl font-robot text-secondary">Lorem ipsum dolor sit amet.</h1>
                    <div className="p-8 bg-tertiary">
                        <div className="container mx-auto p-8">
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                <div className="bg-light p-8 flex flex-col space-y-6 rounded-lg">
                                    <div className="flex space-x-4 items-center">
                                        <img src={chat1} alt="" />
                                        <div className="flex flex-col space-y-2">
                                            <h1 className="font-semibold text-xl">Abdulmalik</h1>
                                            <p>Client</p>
                                        </div>
                                    </div>
                                    <hr className="text-secondary" />
                                    <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt expedita nesciunt 
                                        necessitatibus sapiente beatae nostrum.
                                    </p>
                                </div>
                                <div className="bg-tertiary p-8 flex flex-col space-y-6 rounded-lg">
                                    <div className="flex space-x-4 items-center">
                                        <img src={chat2} alt="" />
                                        <div className="flex flex-col space-y-2">
                                            <h1 className="font-semibold text-xl">Abdulmalik</h1>
                                            <p>Client</p>
                                        </div>
                                    </div>
                                    <hr className="text-secondary" />
                                    <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt expedita nesciunt 
                                        necessitatibus sapiente beatae nostrum.
                                    </p>
                                </div>
                                <div className="bg-light p-8 flex flex-col space-y-6 rounded-lg">
                                    <div className="flex space-x-4 items-center">
                                        <img src={chat3} alt="" />
                                        <div className="flex flex-col space-y-2">
                                            <h1 className="font-semibold text-xl">Abdulmalik</h1>
                                            <p>Client</p>
                                        </div>
                                    </div>
                                    <hr className="text-secondary" />
                                    <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt expedita nesciunt 
                                        necessitatibus sapiente beatae nostrum.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />

        </div>
    );
}

export default Index