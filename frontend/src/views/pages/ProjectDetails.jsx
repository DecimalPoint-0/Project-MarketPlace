import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link, useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import apiInstance from "../../utils/axios";
import mammoth from "mammoth";
import Toast from "../../plugin/Toast"
import Cookies from 'js-cookie';
import useUserData from '../../plugin/useUserData'

function ProjectDetails() {

    const [project, setProject] = useState([]);
    const [tableContent, setTableContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState("");
    const userData = useUserData();


    const initiatePayment = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const formData = new FormData();
            const userData = useUserData(); // Call useUserData once to avoid redundant calls
            if (userData) {
                formData.append("email", userData.email);
            } else if (email) {
                formData.append("email", email); // Email input value from the form
            } else {
                Toast("error", "Email is required.");
                return;
            }
            const response = await apiInstance.post(`projects/${project.id}/initiatepayment`, formData,
                { headers: { "Content-Type": "multipart/form-data"}}
            );
            window.open(response.data.data.authorization_url, '_blank');
        } catch (error) {
            console.error(error);
            Toast("error", "Unable to initiate payment, ensure you have an internet connection");
        } finally {
            setIsLoading(false);
        }
    };


    const param = useParams();

    

    const fetchProject = async () => {
        try {
            const response = await apiInstance.get(`projects/${param.id}`);
            setProject(response.data);
    
            if (response.data.table_of_content) {
                const fileResponse = await apiInstance.get(response.data.table_of_content, {
                    responseType: "arraybuffer", // Fetch as binary data
                });
    
                mammoth.convertToHtml({ arrayBuffer: fileResponse.data })
                    .then((result) => {
                        setTableContent(result.value); // Extracted text from the DOCX
                    })
                    .catch((error) => {
                        console.error("Error extracting text from DOCX:", error);
                });
            }
        } catch (error) {
            console.error("Error fetching project:", error);
        }
    };

    useEffect(() => {
        fetchProject()
    }, [])

    return (
        <>
            <Header />
            <section className="container mx-auto max-w-6xl py-8 grid grid-cols-3 gap-6">
                <div className="col-span-2">
                    <div className="p-2 text-white bg-primary">
                        <h1>{project?.title}</h1>
                    </div>

                    <div className="p-4 border-1 bg-tertiary my-4">
                        <div className="flex gap-6 text-primary flex-wrap">
                            <div className="flex items-center">
                                <i className="fas fa-file mr-2 "></i>
                                <h5 className="font-bold">Format</h5> : 
                                <h5> MS Word</h5>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-folder mr-2"></i>
                                <h5 className="font-bold">Level</h5> : 
                                <h5>{project?.level}</h5>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-user mr-2"></i>
                                <h5 className="font-bold">Author</h5> : 
                                <h5> {project?.author_name}</h5>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-book mr-2"></i>
                                <h5 className="font-bold">Chapters</h5> : 
                                <h5> 1 - 5</h5>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-star mr-2"></i>
                                <h5 className="font-bold">Reach</h5> : 
                                <h5> {project?.views}</h5>
                            </div>
                            <div className="flex items-center font-bold">
                                <i className="fas fa-money mr-2"></i>
                                <h5 className="">Price</h5> : 
                                <h5>&#8358;{project?.price}</h5>
                            </div>
                        </div>
                    </div>

                    <div className="border-[1px] p-4">
                        <div
                            className="h-screen overflow-y-scroll overflow-x-hidden"
                            style={{
                            whiteSpace: "pre-wrap", // Preserve formatting
                            fontFamily: "Time new roman", 
                            }}
                            dangerouslySetInnerHTML={{__html: tableContent}}
                        />
                         
                    </div>


                    <div className="my-4 border-[1px] p-2">
                        <form onSubmit={initiatePayment} className="flex flex-col space-y-4 my-4">
                            {!useUserData && (
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Your Email Address here"
                                    className="px-4 p-2 border-slate-200 border rounded-md"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            )}
                            <Button
                                type="submit"
                                className="p-2 bg-green-500 text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : "Purchase"}
                            </Button>
                        </form>
                    </div>

                </div>

                <div className="">
                    <h1 className="p-4 bg-slate-200">Related Projects</h1>
                    <table className="w-full p-2">
                        <tr>
                            <td className="flex items-center px-4 py-2 bg-slate-100">
                                <i className="fas fa-book pr-2"></i>
                                <h3 className="">
                                    <a href="" className="text-blue-700">Lorem ipsum dolor sit, amet consectetur adipisicing elit</a>
                                </h3>
                            </td>
                            <td className="flex items-center px-4 py-2 bg-slate-100">
                                <i className="fas fa-book pr-2"></i>
                                <h3 className="">
                                    <a href="" className="text-blue-700">Lorem ipsum dolor sit, amet consectetur adipisicing elit</a>
                                </h3>
                            </td>
                        </tr>
                    </table>
                </div>
            </section>



            <Footer />
        </>
    );

}


export default ProjectDetails;