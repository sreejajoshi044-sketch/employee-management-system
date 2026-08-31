import { useLocation, useNavigate } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <aside className="sidebar">

            {/* Navigation */}

            <nav className="sidebar-nav">

                <button
                    type="button"
                    className={`sidebar-link ${
                        isActive("/dashboard")
                            ? "sidebar-link-active"
                            : ""
                    }`}
                    onClick={() => navigate("/dashboard")}
                >
                    <span className="sidebar-icon">
                        📊
                    </span>

                    <span>
                        Dashboard
                    </span>
                </button>


                <button
                    type="button"
                    className={`sidebar-link ${
                        location.pathname.startsWith(
                            "/employees"
                        )
                            ? "sidebar-link-active"
                            : ""
                    }`}
                    onClick={() => navigate("/employees")}
                >
                    <span className="sidebar-icon">
                        👥
                    </span>

                    <span>
                        Employees
                    </span>
                </button>


                <button
                    type="button"
                    className={`sidebar-link ${
                        isActive("/employees/add")
                            ? "sidebar-link-active"
                            : ""
                    }`}
                    onClick={() =>
                        navigate("/employees/add")
                    }
                >
                    <span className="sidebar-icon">
                        ➕
                    </span>

                    <span>
                        Add Employee
                    </span>
                </button>


                <button
                    type="button"
                    className={`sidebar-link ${
                        isActive("/settings")
                            ? "sidebar-link-active"
                            : ""
                    }`}
                    onClick={() =>
                        navigate("/settings")
                    }
                >
                    <span className="sidebar-icon">
                        ⚙️
                    </span>

                    <span>
                        Settings
                    </span>
                </button>

            </nav>


            {/* Sidebar Footer */}

            <div className="sidebar-footer">
                <p>
                    Employee Management System
                </p>
            </div>

        </aside>
    );
};

export default Sidebar;