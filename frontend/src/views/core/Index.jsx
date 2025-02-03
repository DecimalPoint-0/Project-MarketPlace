import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";
import banner from "../../assets/images/banner.jpg";
import join from "../../assets/images/join.png";
import hire from "../../assets/images/hire.svg";
import { Button } from "@material-tailwind/react";
import apiInstance from "../../utils/axios";
import Toast from "../../plugin/Toast";

function Index() {

    const [categories, setCategories] = useState([])
    const [faqs, setFaqs] = useState([])
    const [categoryPagination, setCategoryPagination] = useState({ next: null, previous: null });
    const [faqsPagination, setFaqsPagination] = useState({ next: null, previous: null });
    const [loading, setLoading] = useState(false);

    const fetchData = async (categoryUrl = "/categories", faqsUrl = "/faqs") => {
        setLoading(true);
        try {
            const [categoryResponse, faqsResponse] = await Promise.all([
                apiInstance.get(categoryUrl),
                apiInstance.get(faqsUrl),
            ]);

            // Set response data for categories
            setCategories(categoryResponse.data.results || categoryResponse.data);
            setCategoryPagination({
                next: categoryResponse.data.next,
                previous: categoryResponse.data.previous,
            });

            // Set response data for FAQs
            setFaqs(faqsResponse.data.results || faqsResponse.data);
            setFaqsPagination({
                next: faqsResponse.data.next,
                previous: faqsResponse.data.previous,
            });
        } catch (error) {
            console.log(error);
            Toast("error", error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <Header />

            <section className="p-8">
                <div className="container m-auto max-w-6xl grid grid-cols-3 gap-6">
                    
                    {/* navigation categories for projects  */}
                    <div className="">
                        <div  className="bg-slate-100 p-4">
                            
                            <div className="my-2">
                                <ul className="uppercase">
                                    <h3 className="my-4 uppercase font-bold">Department Category</h3>
                                        <hr className="text-white" />
                                        {categories?.map((cat) =>(
                                            <li className="py-2 flex justify-between items-center" key={cat?.id}>
                                                <div>
                                                    <i className="fas fa-list-alt pr-2"></i>
                                                    <Link to={`/categories/${cat?.id}`}  className="hover:text-slate-400">
                                                        {cat?.title}
                                                    </Link>
                                                </div>
                                                <small className="p-1 bg-slate-400 rounded-sm px-2">{cat?.project_count ?? 0}</small>
                                            </li>
                                        ))}
                                        <hr className="text-white" />
                                </ul>
                            </div>
                            <div className="p-2">
                                <button
                                    className="hover:cursor-pointer"
                                    onClick={() => fetchData(categoryPagination.previous, "/faqs")}
                                    disabled={!categoryPagination.previous}
                                >
                                    ← Previous
                                </button>
                                <button
                                    className="ml-4 hover:cursor-pointer"
                                    onClick={() => fetchData(categoryPagination.next, "/faqs")}
                                    disabled={!categoryPagination.next}
                                >
                                    Next →
                                </button>
                            </div>
                        </div>

                        {/* professional writers  */}

                        <div className="py-8 flex flex-col space-y-4 font-bold">
                            <div>
                                <h1 className="uppercase text-center">Are you a passionate writer? Here's an earning opportunity for you ? </h1>
                                <img src={join} alt="" className="h-40 mx-auto" />
                            </div>
                            <h4 className="text-slate-600">Follow these simple steps</h4>
                            <ol className="list-decimal ml-8 flex flex-col space-y-2">
                                <li>Register with us <a href="" className="text-blue-600">Click Now</a> </li>
                                <li>Get Verified</li>
                                <li>Upload your materials</li>
                                <li>Earn each your project is purchased</li>
                                <li>A lifetime earning opportunity just for you</li>
                            </ol>
                        </div>
                    </div>

                    {/* projects section  */}
                    <div className="col-span-2">
                        <div className="bg-slate-100 shadow-md mb-6">
                            <h1 className=" p-4 text-white bg-primary">GET YOUR PROJECT TOPICS IN JUST FEW STEPS </h1>
                            <ul className="mx-4 py-4 flex flex-col space-y-2 ">
                                <li className="pl-2">Get three (3) topics of intrest from our site</li>
                                <li className="pl-2">Submit three topics to your institution-based supervisor</li>
                                <li className="pl-2">Ensure that your supervisor picks one (1)</li>
                                <li className="pl-2">Revisit this site to purchase the material of the project topic approved</li>
                                <li className="pl-2">If your project topic was changed, dont worry, you can hire a professional 
                                    <a href="" className="text-blue-600">Click Here</a> 
                                </li>
                            </ul>
                        </div>

                        {/* frequently asked question  */}

                        <div className="flex flex-col space-y-2 my-4 ">
                            <h1 className="p-4 text-white bg-primary uppercase">Frequently asked question </h1>
                            
                            <hr className="text-white pb-2" />
                            {faqs?.map((f) => (
                                <div className="p-4 bg-tertiary shadow-lg">
                                    <h3 className='font-bold mb-2 flex items-center'> 
                                        <i className="fas fa-question text-primary font-bold p-2"></i> 
                                        <h3>{f?.question}</h3>
                                    </h3>
                                    <p className="flex items-center space-x-2">
                                        <i className="fas fa-reply text-primary"></i> 
                                        <h5>{f?.answer}</h5>
                                    </p>
                                </div>
                            ))}
                            <hr className="text-white pt-2" />

                            <div className="p-2">
                                <button
                                    className="hover:cursor-pointer"
                                    onClick={() => fetchData("/categories", faqsPagination.previous)}
                                    disabled={!faqsPagination.previous}
                                >
                                    Previous
                                </button>
                                <button
                                    className="ml-4 hover:cursor-pointer"
                                    onClick={() => fetchData("/categories", faqsPagination.next)}
                                    disabled={!faqsPagination.next}
                                >
                                    Next
                                </button>
                            </div>
                            <h1></h1>
                        </div>
  
                    </div>
                </div>

                <div className="container m-auto max-w-6xl grid grid-cols-2">
                    <div> 
                        <h1 className="p-4 uppercase bg-primary text-white">Our Blog Posts</h1>
                        <div className="my-2 p-4 bg-slate-100 shadow-md">
                            <h3 className="font-bold">DELIVERING A GOOD PRESENTATION: TIPS FOR A GOOD PROJECT DEFENCE</h3>
                            <small className="text-slate-500">Posted on 06-01-25</small>
                            <p className="truncate my-2">The educational curriculum states that in order to be awarded a degree after the graduating, there is need to carry out a research in a field of study. Consequently, this is done at the final year level in all university institutions. A lot of students have challenge when it comes to choosing a research topic. This is as a result of the fact that they lack knowledge on the
                            </p>
                            <a href="" className="p-2 bg-slate-300 text-white text-sm">Read more</a>
                        </div>
                        <div className="my-2 p-4 bg-slate-100 shadow-md">
                            <h3 className="font-bold">DELIVERING A GOOD PRESENTATION: TIPS FOR A GOOD PROJECT DEFENCE</h3>
                            <small className="text-slate-500">Posted on 06-01-25</small>
                            <p className="truncate my-2">The educational curriculum states that in order to be awarded a degree after the graduating, there is need to carry out a research in a field of study. Consequently, this is done at the final year level in all university institutions. A lot of students have challenge when it comes to choosing a research topic. This is as a result of the fact that they lack knowledge on the
                            </p>
                            <a href="" className="p-2 bg-slate-300 text-white text-sm">Read more</a>
                        </div>
                       
                    </div>

                    <div className="relative text-center">
                        <h1 className="text-center uppercase font-bold mb-4 text-2xl text-primary">Want to hire a write?</h1>
                        <img src={hire}  alt="" />
                        <a className="absolute top-1/2 left-1/2 py-2 px-4 rounded-md bg-secondary text-white">Click here</a>
                    </div>
                </div>
            </section>


            <Footer />

        </>
    );

}

export default Index;