import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchEmployees } from "../../features/employees/employeeSlice.js";

import "./Dashboard.css";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        employees,
        loading,
        error
    } = useSelector((state) => state.employees);

    useEffect(() => {
        dispatch(
            fetchEmployees({
                page: 1,
                limit: 100
            })
        );
    }, [dispatch]);

    // =========================================
    // STATISTICS
    // =========================================

    const totalEmployees = employees.length;

    const activeEmployees = employees.filter(
        (employee) =>
            employee.status?.toLowerCase() === "active"
    ).length;

    const inactiveEmployees = employees.filter(
        (employee) =>
            employee.status?.toLowerCase() === "inactive"
    ).length;

    const departments = [
        ...new Set(
            employees.map(
                (employee) => employee.department
            )
        )
    ];

    // =========================================
    // LOADING
    // =========================================

    if (loading) {
        return (
            <div className="dashboard-state">
                <div className="loader"></div>

                <p>
                    Loading dashboard...
                </p>
            </div>
        );
    }

    // =========================================
    // ERROR
    // =========================================

    if (error) {
        return (
            <div className="dashboard-page">

                <div className="dashboard-header">
                    <h1>
                        Dashboard
                    </h1>

                    <p>
                        Welcome to Employee Management System
                    </p>
                </div>

                <div className="dashboard-error">
                    {error}
                </div>

            </div>
        );
    }

    return (
        <div className="dashboard-page">

            {/* =====================================
                HEADER
            ===================================== */}

            <div className="dashboard-header">

                <div>
                    <h1>
                        Dashboard
                    </h1>

                    <p>
                        Welcome to Employee Management System
                    </p>
                </div>

                <button
                    type="button"
                    className="dashboard-add-button"
                    onClick={() =>
                        navigate("/employees/add")
                    }
                >
                    + Add Employee
                </button>

            </div>


            {/* =====================================
                STATISTICS
            ===================================== */}

            <div className="dashboard-stats">

                <div className="dashboard-stat-card">

                    <div className="stat-icon">
                        👥
                    </div>

                    <div>
                        <p>
                            Total Employees
                        </p>

                        <h2>
                            {totalEmployees}
                        </h2>
                    </div>

                </div>


                <div className="dashboard-stat-card">

                    <div className="stat-icon">
                        ✓
                    </div>

                    <div>
                        <p>
                            Active Employees
                        </p>

                        <h2>
                            {activeEmployees}
                        </h2>
                    </div>

                </div>


                <div className="dashboard-stat-card">

                    <div className="stat-icon">
                        !
                    </div>

                    <div>
                        <p>
                            Inactive Employees
                        </p>

                        <h2>
                            {inactiveEmployees}
                        </h2>
                    </div>

                </div>


                <div className="dashboard-stat-card">

                    <div className="stat-icon">
                        🏢
                    </div>

                    <div>
                        <p>
                            Departments
                        </p>

                        <h2>
                            {departments.length}
                        </h2>
                    </div>

                </div>

            </div>


            {/* =====================================
                DASHBOARD CONTENT
            ===================================== */}

            <div className="dashboard-content">


                {/* Department Overview */}

                <div className="dashboard-card">

                    <div className="dashboard-card-header">

                        <div>
                            <h3>
                                Department Overview
                            </h3>

                            <p>
                                Employees by department
                            </p>
                        </div>

                    </div>


                    <div className="department-list">

                        {departments.map(
                            (department) => {

                                const count =
                                    employees.filter(
                                        (employee) =>
                                            employee.department ===
                                            department
                                    ).length;

                                return (
                                    <div
                                        className="department-row"
                                        key={department}
                                    >

                                        <span>
                                            {department}
                                        </span>

                                        <strong>
                                            {count}
                                        </strong>

                                    </div>
                                );
                            }
                        )}

                    </div>

                </div>


                {/* Recent Employees */}

                <div className="dashboard-card">

                    <div className="dashboard-card-header">

                        <div>
                            <h3>
                                Recent Employees
                            </h3>

                            <p>
                                Latest employee records
                            </p>
                        </div>

                        <button
                            type="button"
                            className="view-all-button"
                            onClick={() =>
                                navigate("/employees")
                            }
                        >
                            View All
                        </button>

                    </div>


                    <div className="recent-employees">

                        {employees
                            .slice(0, 5)
                            .map((employee) => (

                                <div
                                    className="recent-employee"
                                    key={employee.id}
                                >

                                    <div className="employee-avatar">
                                        {employee.name
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div className="recent-employee-info">

                                        <strong>
                                            {employee.name}
                                        </strong>

                                        <span>
                                            {employee.email}
                                        </span>

                                    </div>

                                    <span
                                        className={`dashboard-status ${
                                            employee.status
                                                ?.toLowerCase() ===
                                            "active"
                                                ? "dashboard-status-active"
                                                : "dashboard-status-inactive"
                                        }`}
                                    >
                                        {employee.status ||
                                            "Unknown"}
                                    </span>

                                </div>

                            ))}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Dashboard;