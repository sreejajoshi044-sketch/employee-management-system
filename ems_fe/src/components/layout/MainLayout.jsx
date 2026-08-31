import { Outlet } from "react-router-dom";

import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

import "./MainLayout.css";

const MainLayout = () => {
    return (
        <div className="main-layout">

            {/* =========================================
                NAVBAR
            ========================================= */}

            <Navbar />


            {/* =========================================
                MAIN BODY
            ========================================= */}

            <div className="main-layout-body">

                {/* Sidebar */}

                <Sidebar />


                {/* Page Content */}

                <main className="main-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default MainLayout;