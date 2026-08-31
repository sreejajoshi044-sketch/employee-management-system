import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../features/auth/authSlice.js";

import "./Navbar.css";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(
        (state) => state.auth
    );

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login", { replace: true });
    };

    return (
        <header className="navbar">

            {/* Brand */}

            <div
                className="navbar-brand"
                onClick={() => navigate("/dashboard")}
            >
                <div className="navbar-logo">
                    EMS
                </div>

                <span>
                    Employee Management
                </span>
            </div>


            {/* Navigation */}

            <nav className="navbar-nav">

                <button
                    type="button"
                    className="navbar-link"
                    onClick={() => navigate("/dashboard")}
                >
                    Dashboard
                </button>

                <button
                    type="button"
                    className="navbar-link"
                    onClick={() => navigate("/employees")}
                >
                    Employees
                </button>

                <button
                    type="button"
                    className="navbar-link"
                    onClick={() => navigate("/settings")}
                >
                    Settings
                </button>

            </nav>


            {/* User */}

            <div className="navbar-user">

                <div className="navbar-user-info">

                    <span className="navbar-user-name">
                        {user?.name || "Admin"}
                    </span>

                    <span className="navbar-user-role">
                        {user?.role || "Administrator"}
                    </span>

                </div>

                <button
                    type="button"
                    className="navbar-logout"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </header>
    );
};

export default Navbar;