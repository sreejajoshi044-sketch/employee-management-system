import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { fetchEmployeeById } from "../../features/employees/employeeSlice.js";

import "./ViewEmployee.css";

const ViewEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        selectedEmployee,
        loading,
        error
    } = useSelector((state) => state.employees);

    useEffect(() => {
        dispatch(fetchEmployeeById(id));
    }, [dispatch, id]);

    // =========================================
    // LOADING
    // =========================================

    if (loading) {
        return (
            <div className="view-employee-state">
                <div className="loader"></div>
                <p>Loading employee...</p>
            </div>
        );
    }

    // =========================================
    // ERROR
    // =========================================

    if (error) {
        return (
            <div className="view-employee-page">

                <button
                    type="button"
                    className="view-back-button"
                    onClick={() =>
                        navigate("/employees")
                    }
                >
                    ← Back to Employees
                </button>

                <div className="view-employee-error">

                    <h3>
                        Failed to load employee
                    </h3>

                    <p>
                        {error}
                    </p>

                </div>

            </div>
        );
    }

    // =========================================
    // NOT FOUND
    // =========================================

    if (!selectedEmployee) {
        return (
            <div className="view-employee-page">

                <button
                    type="button"
                    className="view-back-button"
                    onClick={() =>
                        navigate("/employees")
                    }
                >
                    ← Back to Employees
                </button>

                <div className="view-employee-empty">

                    <h3>
                        Employee not found
                    </h3>

                    <p>
                        The requested employee
                        does not exist.
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="view-employee-page">

            {/* =====================================
                HEADER
            ===================================== */}

            <div className="view-employee-header">

                <div>
                    <h1>
                        Employee Details
                    </h1>

                    <p>
                        View employee information
                    </p>
                </div>

                <button
                    type="button"
                    className="view-back-button"
                    onClick={() =>
                        navigate("/employees")
                    }
                >
                    ← Back to Employees
                </button>

            </div>


            {/* =====================================
                EMPLOYEE CARD
            ===================================== */}

            <div className="view-employee-card">

                {/* Avatar */}

                <div className="view-employee-avatar">
                    {selectedEmployee.name
                        ?.charAt(0)
                        .toUpperCase()}
                </div>


                {/* Basic Info */}

                <div className="view-employee-info">

                    <h2>
                        {selectedEmployee.name}
                    </h2>

                    <p className="view-employee-email">
                        {selectedEmployee.email}
                    </p>

                </div>


                {/* Details */}

                <div className="view-employee-details">

                    <div className="view-detail">

                        <span>
                            Employee ID
                        </span>

                        <strong>
                            #{selectedEmployee.id}
                        </strong>

                    </div>


                    <div className="view-detail">

                        <span>
                            Department
                        </span>

                        <strong>
                            {selectedEmployee.department}
                        </strong>

                    </div>


                    <div className="view-detail">

                        <span>
                            Salary
                        </span>

                        <strong>
                            ₹
                            {Number(
                                selectedEmployee.salary || 0
                            ).toLocaleString("en-IN")}
                        </strong>

                    </div>


                    <div className="view-detail">

                        <span>
                            Status
                        </span>

                        <strong>
                            {selectedEmployee.status || "—"}
                        </strong>

                    </div>

                </div>


                {/* Actions */}

                <div className="view-employee-actions">

                    <button
                        type="button"
                        className="view-edit-button"
                        onClick={() =>
                            navigate(
                                `/employees/${selectedEmployee.id}/edit`
                            )
                        }
                    >
                        Edit Employee
                    </button>

                    <button
                        type="button"
                        className="view-cancel-button"
                        onClick={() =>
                            navigate("/employees")
                        }
                    >
                        Back
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ViewEmployee;