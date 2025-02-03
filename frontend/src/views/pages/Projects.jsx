import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link, useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import apiInstance from "../../utils/axios";

function Projects() {

    const [projects, setProjects] = useState([]);

    const param = useParams();

    const fetchProjects = async () => {
        try{
            const response = await apiInstance.get(`category/${param.id}/projects`)
            setProjects(response.data.results);
            console.log(projects)
        }catch(error){
            console.log(error)
        }

    }

    useEffect(() => {
        fetchProjects()
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
                                    <h3 className="my-4 font-bold">Department Category</h3>
                                        <hr className="text-white" />
                                        <li className="py-2 flex justify-between items-center">
                                            <div>
                                                <i className="fas fa-list-alt pr-2"></i>
                                                <a href="" className="hover:text-slate-400">Computer Science </a>  
                                            </div>
                                            <small className="p-1 bg-slate-400 rounded-sm px-2">3</small>
                                        </li>
                                        <hr className="text-white" />
                                        <li className="py-2 flex justify-between items-center">
                                            <div>
                                                <i className="fas fa-list-alt pr-2"></i>
                                                <a href="" className="hover:text-slate-400">Public Administrator </a>  
                                            </div>
                                            <small className="p-1 bg-slate-400 rounded-sm px-2">3</small>
                                        </li>
                                        <hr className="text-white" />

                                </ul>
                            </div>
                        </div>

                    </div>

                    {/* projects section  */}
                    <div className="col-span-2">
                        <div className="flex flex-col space-y-2 my-4 ">
                            <div>

                            <h1 className="p-4 text-white bg-primary uppercase"> 
                            Projects Available 
                                <form action="" className="flex space-x-4 mt-2 mb-6">
                                    <input type="text" name="amount" placeholder="Enter Project Topic" className="px-4 p-2 border-slate-200 border rounded-md flex-1" />
                                    <Button type="submit" className="font-robot font-bold text-white bg-slate-600 rounded-sm p-2">Search</Button>
                                </form> 
                            </h1>
                            </div>
                            
                            {projects.map((project) => (

                                <div className="px-4 bg-white rounded-lg shadow-lg hover:cursor-pointer hover:shadow-xl">
                                    <h3 className='font-bold mb-2 font-robot'>
                                        <Link
                                            className="text-blue-700"
                                            to={`/projects/${project?.id}`} 
                                        >
                                        {project?.title}
                                        </Link>

                                    </h3>
                                    <div className="flex space-x-4 items-center py-2 justify-between">
                                        <div className="text-slate-500">
                                            <div>
                                                <i className="fas fa-folder inline-block"></i> Level: {project?.level}
                                            </div>
                                            <div>
                                                <i className="fas fa-user"></i> Author: {project?.author_name}
                                            </div>
                                        </div>

                                        <div>
                                            <i className="fas fa-heart text-red-700"><small className="text-slate-500 pl-1">{projects?.like ?? 0}</small></i>
                                            <i className="fas fa-eye text-yellow-400"><small className="text-slate-500 pl-1">{projects?.views ?? 0 }</small></i>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        
                            <hr className="text-white pb-2" />
                            
                        </div>
  
                    </div>
                </div>

            </section>


            <Footer />

        </>
    );

}

export default Projects;