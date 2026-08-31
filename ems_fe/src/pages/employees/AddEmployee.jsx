import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import EmployeeForm from "../../components/employees/EmployeeForm.jsx";
import { addEmployee } from "../../features/employees/employeeSlice.js";

import "./AddEmployee.css";
import "../../styles/employees.css";

const AddEmployee = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        loading,
        error
    } = useSelector((state) => state.employees);

    const handleSubmit = async (employeeData) => {
        try {
            await dispatch(
                addEmployee(employeeData)
            ).unwrap();

            navigate("/employees");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="add-employee-page">

            {/* Page Header */}

            <div className="add-employee-header">

                <div>
                    <h1>
                        Add Employee
                    </h1>

                    <p>
                        Create a new employee record
                    </p>
                </div>

                <button
                    type="button"
                    className="back-button"
                    onClick={() =>
                        navigate("/employees")
                    }
                >
                    ← Back
                </button>

            </div>


            {/* Error */}

            {error && (
                <div className="employee-error">

                    <h3>
                        Failed to create employee
                    </h3>

                    <p>
                        {error}
                    </p>

                </div>
            )}


            {/* Form */}

            <div className="employee-form-card">

                <EmployeeForm
                    onSubmit={handleSubmit}
                    loading={loading}
                    submitText="Add Employee"
                />

            </div>

        </div>
    );
};

export default AddEmployee;