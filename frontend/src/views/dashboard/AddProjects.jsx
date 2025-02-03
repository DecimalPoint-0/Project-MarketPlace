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


function Projects(){

    // initiatialization 
    const accessToken = Cookies.get('access_token');
    const [category, setCategory] = useState([])

    // sets and hold the projects associated to the user
    const [myprojects, setmyProjects] = useState([])

    // sets and hold the details of projects to be uploaded
    const [newproject, setNewProject ] = useState({
        title: "",
        category: parseInt(""),
        description: "",
        level: "",
        price: "",
        keywords: "",
        co_authors: "",
        table_of_content: null,
        project_content: null,
    })

    // set and hold state of processing 
    const [isLoading, setIsLoading] = useState(false)

    // asynchronous function for fetching projects associated with the user 
    const fetchData = async () => {
        try {
            const [projectsResponse, categoriesResponse] = await Promise.all([
                apiInstance.get("user/project",
                    // includes JWT 
                    { headers: { 
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${accessToken}`
                    }}
                ),
                // get categories dynamically
                apiInstance.get("/categories"),
              ]
            );

            // set response data 
            setmyProjects(projectsResponse.data.results);
            setCategory(categoriesResponse.data.results);

        } catch (error) {
            // returns appropriate error 
            Toast("error", error.response?.data?.message || "An error occurred");
        }
    }

    // handles changes of input elements 
    const handleChange = (event) => {
        setNewProject ({
            ...newproject,
            // dynamically sets the name and value of each form field on change 
            [event.target.name]: event.target.value,
        });
    }

    // handles changes of input file 
    const handleFileChange = (event) => {
        // extract the file from the input element 
        const selectedfile = event.target.files[0];
    
        if (selectedfile) {
            // binds the name of the file with the selected file itself 
            setNewProject({
                ...newproject,
                [event.target.name]: { file: selectedfile },
            });
        }
    };

    // Handles the submission of project 
    const handleSubmitProject = async (event) =>{
        // prevents form from loading 
        event.preventDefault();

        // sets a list of requiredFields for addition check 
        const requiredFields = ["title", "description", "category", "level", "price", 
            "table_of_content", "project_content", "price"];
            
            // checks if a required field in empty 
            for (let field of requiredFields) {
                if (!newproject[field]) {
                    Toast("error", `Please provide a valid ${field.replace("_", " ")}`);
                    return;
            }
        }

        try {

            setIsLoading(true);
            
            // creates a new form object 
            const formData = new FormData();

            // append validated fields to the formData 
            formData.append("title", newproject.title);
            formData.append("category", newproject.category);
            formData.append("level", newproject.level);
            formData.append("price", newproject.price);
            formData.append("table_of_content", newproject.table_of_content.file);
            formData.append("project_content", newproject.project_content.file);
            formData.append("keywords", newproject.keywords);
            formData.append("co_authors", newproject.co_authors);
            
            // API post request to submit project 
            const response = await apiInstance.post("user/project/", formData, {
                headers: { 
                    "Content-Type": "multipart/form-data", 
                    Authorization: `Bearer ${accessToken}` 
                },
            });
      
            Swal.fire({
                icon: "success",
                title: "Project submitted successfully"
            });
            
            // reload page 
            window.location.reload()
          
        } catch (error) {
            Toast("error", error);
        } finally {
            setIsLoading(false);
        }
    }

    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const projectItems = myprojects?.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(myprojects?.length / itemsPerPage);
    const pageNumbers = Array.from({length: totalPages}, (_, index) => index + 1)

    useEffect(() =>{
        // load project and categories 
        fetchData()
    }, [])

    return (
        <>
            <AdminNavBar />
            <main className="flex">

                <LeftNavBar />

                <div className="p-8 flex-1 min-h-screen ml-[200px] bg-slate-100 flex gap-6"> 
                    <div>
                        <div className="p-4 bg-white rounded-lg shadow-lg flex flex-col space-y-6">
                            <h1 className="font-robot text-2xl font-bold">All Projects</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, quasi!</p>
                            <div className="flex flex-col space-y-4">
                                
                                {projectItems?.map((project) => (
                                    <div className="flex flex-col rounded-lg p-4 shadow-xl space-y-4 hover:shadow-2xl hover:cursor-pointer">
                                        <div className="flex flex-col space-y-2">
                                            <h3 className="font-robot">Topic: {project?.title}</h3>
                                            
                                        </div>
                                        
                                        <div className="flex justify-between space-x-2">
                                            <div>
                                                <div className="text-[1rem]">
                                                    <i className="fas fa-thumbs-up p-1 rounded-lg text-blue-700 text-[1rem]"> <small className="text-black">2</small> </i>
                                                    <i className="fas fa-eye p-1 rounded-lg text-green-700 text-[1rem]"> <small className="text-black">{project.views}</small> </i>
                                                </div>
                                                <span>Status: 
                                                    <small className="text-green-500">{project?.status ?? 'Pending'}</small>
                                                </span>
                                            </div>
                                            <div className="flex space-x-2 items-center justify-center p-2 bg-slate-200 rounded-lg shadow-md text-sm">
                                                <a href="">View Order<i className="fas fa-eye text-green-400"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                )) ?? 'No Project Uploaded Yet!'}

                            </div>
                        </div>

                        <nav className="flex mt-2 items-center space-x-4">
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 1 ? 'pointer-events-none text-slate-400' : ''}`}>
                                    <button className="page-link text-dark fw-bold me-1 rounded" onClick={() => setCurrentPage(currentPage - 1)}>
                                        <i className="fas fa-arrow-left me-2" />
                                        Previous
                                    </button>
                                </li>
                            </ul>
                            <ul className="pagination flex space-x-4">
                                {pageNumbers.map((page) => (
                                    <li key={1} className={`page-item p-2 ${currentPage === page ? 'text-gray-800 bg-slate-300' : ''}`}>
                                        <button className="text-dark rounded" onClick={() => setCurrentPage(page)}>{page}</button>
                                    </li>
                                ))}
                            </ul>
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === totalPages ? 'pointer-events-none text-slate-400' : ''}`} >
                                    <button className="page-link text-dark fw-bold ms-1 rounded" onClick={() => setCurrentPage(currentPage + 1)}>
                                        Next
                                        <i className="fas fa-arrow-right ms-3 " />
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="flex-1">
                        <div className="bg-white p-4 rounded-2xl shadow-lg h-full">
                            <form action="" onSubmit={handleSubmitProject} className="bg-white p-4 rounded-lg" encType="multipart/form-data">
                                <div className="form-title">
                                    <h1 className="font-bold text-3xl text-center">Upload Your project</h1>
                                    <p className="text-center">Carefully enter the details of the project.</p>
                                </div>
                                <div className="form-body py-6 gap-x-8">
                                    <div className="flex flex-col space-y-2 pb-2 mb-2">
                                        <label htmlFor="">Title:</label>
                                        <input type="text" id="title" name="title" value={newproject.title} onChange={handleChange} className="p-2 border-gray-300 border-[1px] rounded-lg w-full focus:outline-none" required/>
                                    </div>
                                    <div className="flex flex-col space-y-2 pb-2 mb-2">
                                        <label htmlFor="">Category:</label>
                                        <select name="category" id="category" onChange={handleChange} className="p-2 border-gray-300 border-[1px] rounded-lg w-full focus:outline-none" required>
                                            <option value="">------</option>
                                            {category?.map((cat, index) => (
                                                <option key={index} value={cat?.id}>{cat.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex flex-col space-y-2 pb-2 mb-2">
                                        <label htmlFor="">Level:</label>
                                        <select name="level" id="level" onChange={handleChange} className="p-2 border-gray-300 border-[1px] rounded-lg w-full focus:outline-none" required>
                                            <option value="">---</option>
                                            <option value="ND">ND</option>
                                            <option value="HND">HND</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col space-y-2 pb-2 mb-2">
                                        <label htmlFor="">Description:</label>
                                        <textarea name="description" id="decription" value={newproject.description} onChange={handleChange} className="p-2 h-[100px] border-gray-300 border-[1px] rounded-lg w-full focus:outline-none"></textarea>
                                    </div>
                                    <div className="flex flex-col space-y-2 pb-2">
                                        <label htmlFor="">Table_of_content:</label>
                                        <input type="file" id="table_of_content" name="table_of_content" onChange={handleFileChange}  className="p-2 border-gray-300 border-[1px] rounded-lg w-full focus:outline-none" required/>
                                    </div>
                                    <div className="flex flex-col space-y-2 pb-2">
                                        <label htmlFor="">Project_content:</label>
                                        <input type="file" id="project_content" name="project_content" onChange={handleFileChange}  className="p-2 border-gray-300 border-[1px] rounded-lg w-full focus:outline-none" required/>
                                    </div>
                                    <div className="flex flex-col space-y-2 pb-2">
                                        <label htmlFor="">Amount:</label>
                                        <input type="number" id="price" name="price" value={newproject.price} onChange={handleChange} className="p-2 border-gray-300 border-[1px] rounded-lg w-full focus:outline-none" required/>
                                    </div>
                                    <div className="flex flex-col space-y-2 pb-2 mb-4">
                                        <label htmlFor="">Keywords:</label>
                                        <input type="text" id="keywords" name="keywords" value={newproject.keywords} onChange={handleChange} className="p-2 border-gray-300 border-[1px] rounded-lg w-full focus:outline-none"/>
                                    </div>
                                    <div className="flex flex-col space-y-2 pb-2">
                                        <label htmlFor="">Co_Authors:</label>
                                        <input type="text" id="co_authors" name="co_authors" value={newproject.co_authors} onChange={handleChange} className="p-2 border-gray-300 border-[1px] rounded-lg w-full focus:outline-none"/>
                                    </div>
                                </div>
                                
                                <div className="py-2">
                                    <button className="bg-primary text-white py-2 px-4 rounded-md w-full" type="submit">Upload Project</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            </main>
        </>
    );
}

export default Projects