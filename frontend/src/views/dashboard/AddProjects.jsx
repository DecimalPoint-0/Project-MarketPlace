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

                <div className="p-8 flex-1 min-h-screen ml-[200px] bg-gradient-to-br from-slate-50 to-slate-100 flex gap-8">
                    {/* Projects List Sidebar */}
                    <div className="w-80">
                        <div className="card sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-primary">
                                    <i className="fas fa-layer-group mr-2"></i> My Projects
                                </h2>
                                <span className="badge badge-secondary">{myprojects.length}</span>
                            </div>

                            {myprojects.length > 0 ? (
                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {projectItems?.map((project) => (
                                        <div key={project?.id} className="p-4 rounded-lg bg-gradient-to-r from-slate-100 to-slate-50 border-l-4 border-secondary hover:shadow-medium transition-shadow cursor-pointer">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-primary truncate">{project?.title}</h3>
                                                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                                                    project?.status === 'active' ? 'bg-success text-white' : 'bg-warning text-primary'
                                                }`}>
                                                    {project?.status ?? 'Pending'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-600 mb-3">{project?.description?.substring(0, 50)}...</p>
                                            <div className="flex items-center justify-between text-xs text-slate-500">
                                                <span><i className="fas fa-eye mr-1"></i>{project?.views ?? 0} views</span>
                                                <span><i className="fas fa-heart text-red-500 mr-1"></i>{project?.like ?? 0} likes</span>
                                                <span>₦{project?.price}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <i className="fas fa-inbox text-4xl text-slate-300 mb-3"></i>
                                    <p className="text-slate-600">No projects yet. Create one to get started!</p>
                                </div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <nav className="flex items-center justify-center gap-2 mt-6 pt-6 border-t">
                                    <button 
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="btn-outline px-3 py-1 text-sm disabled:opacity-50"
                                    >
                                        <i className="fas fa-chevron-left"></i>
                                    </button>
                                    {pageNumbers.map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`px-3 py-1 text-sm rounded font-semibold transition-all ${
                                                currentPage === page ? 'bg-secondary text-white' : 'bg-slate-200 text-primary hover:bg-slate-300'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button 
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="btn-outline px-3 py-1 text-sm disabled:opacity-50"
                                    >
                                        <i className="fas fa-chevron-right"></i>
                                    </button>
                                </nav>
                            )}
                        </div>
                    </div>

                    {/* Upload Form */}
                    <div className="flex-1">
                        <div className="card">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-primary mb-2">
                                    <i className="fas fa-cloud-upload-alt mr-2"></i> Upload New Project
                                </h2>
                                <p className="text-slate-600">Share your research materials and start earning</p>
                            </div>

                            <form onSubmit={handleSubmitProject} encType="multipart/form-data" className="space-y-6">
                                
                                {/* Basic Info Section */}
                                <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-secondary">
                                    <h3 className="text-lg font-bold text-primary mb-4">
                                        <i className="fas fa-info-circle mr-2"></i> Basic Information
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="form-label">Project Title *</label>
                                            <input 
                                                type="text" 
                                                name="title" 
                                                value={newproject.title} 
                                                onChange={handleChange} 
                                                placeholder="Enter a clear, descriptive title"
                                                className="form-input"
                                                required
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="form-label">Category *</label>
                                                <select 
                                                    name="category" 
                                                    onChange={handleChange} 
                                                    className="form-input"
                                                    required
                                                >
                                                    <option value="">Select a category</option>
                                                    {category?.map((cat, index) => (
                                                        <option key={index} value={cat?.id}>{cat.title}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="form-label">Academic Level *</label>
                                                <select 
                                                    name="level" 
                                                    onChange={handleChange} 
                                                    className="form-input"
                                                    required
                                                >
                                                    <option value="">Select level</option>
                                                    <option value="100">100 Level</option>
                                                    <option value="200">200 Level</option>
                                                    <option value="300">300 Level</option>
                                                    <option value="400">400 Level</option>
                                                    <option value="ND">ND</option>
                                                    <option value="HND">HND</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="form-label">Description *</label>
                                            <textarea 
                                                name="description" 
                                                value={newproject.description} 
                                                onChange={handleChange} 
                                                placeholder="Provide a detailed description of your project materials"
                                                className="form-textarea h-24"
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                {/* Files Section */}
                                <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-info">
                                    <h3 className="text-lg font-bold text-primary mb-4">
                                        <i className="fas fa-file-upload mr-2"></i> Project Files
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="form-label">Table of Content *</label>
                                            <div className="relative">
                                                <input 
                                                    type="file" 
                                                    name="table_of_content" 
                                                    onChange={handleFileChange}
                                                    className="sr-only"
                                                    id="table_of_content"
                                                    required
                                                />
                                                <label htmlFor="table_of_content" className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-secondary hover:bg-secondary hover:bg-opacity-5 transition">
                                                    <i className="fas fa-file-pdf text-2xl text-secondary"></i>
                                                    <div>
                                                        <p className="font-semibold text-primary">Click to upload</p>
                                                        <p className="text-sm text-slate-500">PDF or DOC files</p>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="form-label">Project Content *</label>
                                            <div className="relative">
                                                <input 
                                                    type="file" 
                                                    name="project_content" 
                                                    onChange={handleFileChange}
                                                    className="sr-only"
                                                    id="project_content"
                                                    required
                                                />
                                                <label htmlFor="project_content" className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-secondary hover:bg-secondary hover:bg-opacity-5 transition">
                                                    <i className="fas fa-file-pdf text-2xl text-secondary"></i>
                                                    <div>
                                                        <p className="font-semibold text-primary">Click to upload</p>
                                                        <p className="text-sm text-slate-500">PDF or ZIP files</p>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Pricing & Additional Info */}
                                <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-warning">
                                    <h3 className="text-lg font-bold text-primary mb-4">
                                        <i className="fas fa-tag mr-2"></i> Pricing & Details
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="form-label">Price (₦) *</label>
                                            <input 
                                                type="number" 
                                                name="price" 
                                                value={newproject.price} 
                                                onChange={handleChange} 
                                                placeholder="Set your project price"
                                                className="form-input"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="form-label">Keywords (comma separated)</label>
                                            <input 
                                                type="text" 
                                                name="keywords" 
                                                value={newproject.keywords} 
                                                onChange={handleChange} 
                                                placeholder="e.g., research, analysis, data science"
                                                className="form-input"
                                            />
                                        </div>

                                        <div>
                                            <label className="form-label">Co-Authors</label>
                                            <input 
                                                type="text" 
                                                name="co_authors" 
                                                value={newproject.co_authors} 
                                                onChange={handleChange} 
                                                placeholder="Names of other authors (optional)"
                                                className="form-input"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-4">
                                    <button 
                                        type="submit" 
                                        disabled={isLoading}
                                        className="btn flex-1 py-3 flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            <>
                                                <i className="fas fa-spinner fa-spin"></i> Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-cloud-upload-alt"></i> Upload Project
                                            </>
                                        )}
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setNewProject({
                                            title: "",
                                            category: parseInt(""),
                                            description: "",
                                            level: "",
                                            price: "",
                                            keywords: "",
                                            co_authors: "",
                                            table_of_content: null,
                                            project_content: null,
                                        })}
                                        className="btn-outline px-6 py-3"
                                    >
                                        Clear
                                    </button>
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
            