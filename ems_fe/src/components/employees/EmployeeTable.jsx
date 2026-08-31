import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { removeEmployee } from "../../features/employees/employeeSlice.js";

import "./EmployeeTable.css";

const EmployeeTable = ({ employees }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // =========================================
    // EMPTY STATE
    // =========================================

    if (!employees || employees.length === 0) {
        return (
            <div className="employee-empty">

                <div className="employee-empty-icon">
                    👥
                </div>

                <h3>
                    No employees found
                </h3>

                <p>
                    There are no employees to display.
                </p>

            </div>
        );
    }


    // =========================================
    // DELETE EMPLOYEE
    // =========================================

    const handleDelete = (employee) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${employee.name}?`
        );

        if (!confirmed) {
            return;
        }

        dispatch(
            removeEmployee(employee.id)
        );
    };


    // =========================================
    // TABLE
    // =========================================

    return (
        <div className="employee-table-wrapper">

            <table className="employee-table">

                {/* Table Header */}

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Employee</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>


                {/* Table Body */}

                <tbody>

                    {employees.map((employee) => (

                        <tr key={employee.id}>

                            {/* ID */}

                            <td>
                                <span className="employee-id">
                                    #{employee.id}
                                </span>
                            </td>


                            {/* Employee */}

                            <td>
                                <div className="employee-profile">

                                    <div className="employee-avatar">
                                        {employee.name
                                            ?.charAt(0)
                                            ?.toUpperCase()}
                                    </div>

                                    <div className="employee-name">
                                        {employee.name}
                                    </div>

                                </div>
                            </td>


                            {/* Email */}

                            <td>
                                <span className="employee-email">
                                    {employee.email}
                                </span>
                            </td>


                            {/* Department */}

                            <td>
                                <span className="department-badge">
                                    {employee.department || "—"}
                                </span>
                            </td>


                            {/* Salary */}

                            <td>
                                <span className="employee-salary">
                                    ₹
                                    {Number(
                                        employee.salary || 0
                                    ).toLocaleString("en-IN")}
                                </span>
                            </td>


                            {/* Actions */}

                            <td>

                                <div className="employee-actions">

                                    {/* View */}

                                    <button
                                        type="button"
                                        className="action-button view"
                                        onClick={() =>
                                            navigate(
                                                `/employees/${employee.id}`
                                            )
                                        }
                                    >
                                        View
                                    </button>


                                    {/* Edit */}

                                    <button
                                        type="button"
                                        className="action-button edit"
                                        onClick={() =>
                                            navigate(
                                                `/employees/${employee.id}/edit`
                                            )
                                        }
                                    >
                                        Edit
                                    </button>


                                    {/* Delete */}

                                    <button
                                        type="button"
                                        className="action-button delete"
                                        onClick={() =>
                                            handleDelete(employee)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default EmployeeTable;