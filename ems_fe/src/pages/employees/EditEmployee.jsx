import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import EmployeeForm from "../../components/employees/EmployeeForm.jsx";

import {
    fetchEmployeeById,
    editEmployee
} from "../../features/employees/employeeSlice.js";

import "./EditEmployee.css";

const EditEmployee = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        selectedEmployee,
        loading,
        error
    } = useSelector((state) => state.employees);

    useEffect(() => {
        dispatch(fetchEmployeeById(id));
    }, [dispatch, id]);

    const handleSubmit = async (employeeData) => {
        try {
            await dispatch(
                editEmployee({
                    id: Number(id),
                    employeeData
                })
            ).unwrap();

            navigate(`/employees/${id}`);
        } catch (error) {
            console.error(error);
        }
    };

    if (loading && !selectedEmployee) {
        return (
            <div className="edit-employee-state">
                <div className="loader"></div>

                <p>
                    Loading employee...
                </p>
            </div>
        );
    }

    if (error && !selectedEmployee) {
        return (
            <div className="edit-employee-page">

                <button
                    type="button"
                    className="edit-back-button"
                    onClick={() =>
                        navigate("/employees")
                    }
                >
                    ← Back to Employees
                </button>

                <div className="edit-employee-error">

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

    if (!selectedEmployee) {
        return null;
    }

    return (
        <div className="edit-employee-page">

            {/* Header */}

            <div className="edit-employee-header">

                <div>
                    <h1>
                        Edit Employee
                    </h1>

                    <p>
                        Update employee information
                    </p>
                </div>

                <button
                    type="button"
                    className="edit-back-button"
                    onClick={() =>
                        navigate(
                            `/employees/${id}`
                        )
                    }
                >
                    ← Back
                </button>

            </div>


            {/* Form */}

            <div className="edit-employee-card">

                {error && (
                    <div className="edit-employee-error">
                        <p>
                            {error}
                        </p>
                    </div>
                )}

                <EmployeeForm
                    initialData={selectedEmployee}
                    onSubmit={handleSubmit}
                    loading={loading}
                    submitText="Update Employee"
                />

            </div>

        </div>
    );
};

export default EditEmployee;