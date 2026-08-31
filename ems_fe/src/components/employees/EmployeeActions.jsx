import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchEmployees } from "../../features/employees/employeeSlice.js";
import EmployeeTable from "../../components/employees/EmployeeTable.jsx";

const EmployeeList = () => {
    const dispatch = useDispatch();

    const {
        employees,
        loading,
        error
    } = useSelector((state) => state.employees);

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    // Loading state
    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>

                    <p className="text-sm text-gray-500">
                        Loading employees...
                    </p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 md:p-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Employee Management
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Manage your employees
                    </p>
                </div>

                <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                    <h3 className="font-semibold text-red-700">
                        Failed to load employees
                    </h3>

                    <p className="mt-2 text-sm text-red-600">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    // Main employee page
    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8">

            {/* Page Header */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Employee Management
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Manage your employees
                    </p>
                </div>

                <div>
                    <span className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                        {employees.length} Employees
                    </span>
                </div>
            </div>

            {/* Employee Table */}
            <EmployeeTable employees={employees} />

        </div>
    );
};

export default EmployeeList;  