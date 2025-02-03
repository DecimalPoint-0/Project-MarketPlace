import './App.css'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainWrapper from "./layouts/MainWrapper";
import PrivateRoute from "./layouts/PrivateRoute";
import Index from './views/core/Index';
import About from './views/pages/About';
import Projects from './views/pages/Projects';
import ProjectDetails from './views/pages/ProjectDetails';
import Home from './views/dashboard/Home';
import Profile from './views/dashboard/Profile';
import Wallet from './views/dashboard/Wallet';
import Transactions from './views/dashboard/Transactions';
import AddProjects from './views/dashboard/AddProjects';
import SignUp from './views/auth/SignUp';
import Login from './views/auth/Login';

function App() {

  return (
    <BrowserRouter>
      <MainWrapper>  
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sign-up/" element={<SignUp />} />
          <Route path="/about-us/" element={<About />} />
          <Route path="/categories/:id" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/dashboard/about-us/" element={<About />} />
          <Route path="/dashboard/profile/" element={<Profile />} />
          <Route path="/dashboard/projects/" element={<AddProjects />} />
          <Route path="/dashboard/wallet/" element={<Wallet />} />
          <Route path="/dashboard/transactions/" element={<Transactions />} />
          <Route path="/dashboard/" element={<Home />} />
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  )
}

export default App
