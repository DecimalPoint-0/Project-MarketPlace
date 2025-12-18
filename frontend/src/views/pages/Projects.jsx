import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link, useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import apiInstance from "../../utils/axios";

function Projects() {

    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [filterLevel, setFilterLevel] = useState("");

    const param = useParams();

    const fetchProjects = async () => {
        try{
            const response = await apiInstance.get(`category/${param.id}/projects`)
            setProjects(response.data.results);
            setFilteredProjects(response.data.results);
        }catch(error){
            console.log(error)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = projects.filter(project =>
            project.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProjects(filtered);
    };

    const handleLevelFilter = (level) => {
        setFilterLevel(level);
        if (level === "") {
            setFilteredProjects(projects);
        } else {
            const filtered = projects.filter(project => project.level === level);
            setFilteredProjects(filtered);
        }
    };

    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <>
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-primary text-light py-12 px-8">
                <div className="container max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold mb-2">Available Projects</h1>
                    <p className="text-slate-300">Discover quality project materials tailored to your academic needs</p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-8 bg-slate-50">
                <div className="container max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        {/* Sidebar - Filters */}
                        <div className="md:col-span-1">
                            <div className="card sticky top-24">
                                <h3 className="text-xl font-bold text-primary mb-6">
                                    <i className="fas fa-filter mr-2"></i> Filters
                                </h3>
                                
                                <div className="mb-6">
                                    <h4 className="form-label">Project Level</h4>
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="level" 
                                                value=""
                                                checked={filterLevel === ""}
                                                onChange={(e) => handleLevelFilter(e.target.value)}
                                                className="w-4 h-4"
                                            />
                                            <span className="text-slate-700">All Levels</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="level" 
                                                value="100"
                                                checked={filterLevel === "100"}
                                                onChange={(e) => handleLevelFilter(e.target.value)}
                                                className="w-4 h-4"
                                            />
                                            <span className="text-slate-700">100 Level</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="level" 
                                                value="200"
                                                checked={filterLevel === "200"}
                                                onChange={(e) => handleLevelFilter(e.target.value)}
                                                className="w-4 h-4"
                                            />
                                            <span className="text-slate-700">200 Level</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="level" 
                                                value="300"
                                                checked={filterLevel === "300"}
                                                onChange={(e) => handleLevelFilter(e.target.value)}
                                                className="w-4 h-4"
                                            />
                                            <span className="text-slate-700">300 Level</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="level" 
                                                value="400"
                                                checked={filterLevel === "400"}
                                                onChange={(e) => handleLevelFilter(e.target.value)}
                                                className="w-4 h-4"
                                            />
                                            <span className="text-slate-700">400 Level</span>
                                        </label>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => {
                                        setFilterLevel("");
                                        setSearchTerm("");
                                        setFilteredProjects(projects);
                                    }}
                                    className="btn-outline w-full py-2"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>

                        {/* Main Content - Projects */}
                        <div className="md:col-span-3">
                            {/* Search Bar */}
                            <div className="card mb-8">
                                <form onSubmit={handleSearch} className="flex gap-2">
                                    <input 
                                        type="text" 
                                        name="search" 
                                        placeholder="Search by project title..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="form-input flex-1"
                                    />
                                    <button type="submit" className="btn px-6">
                                        <i className="fas fa-search"></i> Search
                                    </button>
                                </form>
                            </div>

                            {/* Results Count */}
                            <div className="mb-6">
                                <p className="text-slate-600">
                                    Showing <strong>{filteredProjects.length}</strong> project(s)
                                </p>
                            </div>

                            {/* Projects Grid */}
                            {filteredProjects.length > 0 ? (
                                <div className="grid gap-6">
                                    {filteredProjects.map((project) => (
                                        <Link 
                                            key={project?.id}
                                            to={`/projects/${project?.id}`}
                                            className="card group overflow-hidden"
                                        >
                                            <div className="flex gap-6">
                                                {/* Project Icon */}
                                                <div className="flex-shrink-0 w-20 h-20 bg-gradient-primary rounded-lg flex items-center justify-center text-light text-3xl">
                                                    <i className="fas fa-file-pdf"></i>
                                                </div>

                                                {/* Project Info */}
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors mb-2">
                                                        {project?.title}
                                                    </h3>
                                                    
                                                    <p className="text-slate-600 text-sm mb-3 truncate-3">
                                                        By <strong>{project?.author_name}</strong>
                                                    </p>

                                                    <div className="flex flex-wrap gap-3 items-center text-sm">
                                                        <span className="badge badge-primary">
                                                            <i className="fas fa-layer-group mr-1"></i> Level {project?.level}
                                                        </span>
                                                        <span className="text-slate-600">
                                                            <i className="fas fa-heart text-red-500 mr-1"></i>
                                                            {project?.like ?? 0} Likes
                                                        </span>
                                                        <span className="text-slate-600">
                                                            <i className="fas fa-eye text-info mr-1"></i>
                                                            {project?.views ?? 0} Views
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Price and Action */}
                                                <div className="flex flex-col items-end justify-between min-w-fit">
                                                    <div className="text-right">
                                                        <p className="text-slate-600 text-sm">Price</p>
                                                        <p className="text-2xl font-bold text-secondary">
                                                            ₦{project?.price?.toLocaleString() ?? '0'}
                                                        </p>
                                                    </div>
                                                    <button className="btn px-4 py-2 text-sm whitespace-nowrap">
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="card text-center py-12">
                                    <i className="fas fa-search text-6xl text-slate-300 mb-4"></i>
                                    <h3 className="text-2xl font-bold text-slate-600 mb-2">No Projects Found</h3>
                                    <p className="text-slate-500">Try adjusting your filters or search terms</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

        </>
    );

}

export default Projects;