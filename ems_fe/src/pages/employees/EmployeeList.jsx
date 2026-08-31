import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "../../components/common/Pagination.jsx";
import EmployeeFilters from "../../components/employees/EmployeeFilters.jsx";
import EmployeeTable from "../../components/employees/EmployeeTable.jsx";

import { fetchEmployees } from "../../features/employees/employeeSlice.js";

import useDebounce from "../../hooks/useDebounce.js";

import "./EmployeeList.css";

const EmployeeList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        employees,
        loading,
        error,
        pagination
    } = useSelector((state) => state.employees);


    // =========================================
    // DEBUG
    // =========================================

    console.log("EMPLOYEES:", employees);
    console.log("LOADING:", loading);
    console.log("ERROR:", error);
    console.log("PAGINATION:", pagination);


    // =========================================
    // SEARCH
    // =========================================

    const [search, setSearch] = useState("");


    // =========================================
    // PAGINATION
    // =========================================

    const [page, setPage] = useState(1);


    // =========================================
    // FILTERS
    // =========================================

    const [department, setDepartment] = useState("");
    const [status, setStatus] = useState("");


    // =========================================
    // SORTING
    // =========================================

    const [sortBy, setSortBy] = useState("");
    const [order, setOrder] = useState("asc");


    // =========================================
    // DEBOUNCED SEARCH
    // =========================================

    const debouncedSearch =
        useDebounce(search, 300);


    // =========================================
    // FETCH EMPLOYEES
    // =========================================

    useEffect(() => {

        dispatch(
            fetchEmployees({
                search: debouncedSearch,
                department,
                status,
                sortBy,
                order,
                page,
                limit: 10
            })
        );

    }, [
        dispatch,
        debouncedSearch,
        department,
        status,
        sortBy,
        order,
        page
    ]);


    // =========================================
    // RESET PAGE
    // =========================================

    useEffect(() => {

        setPage(1);

    }, [
        debouncedSearch,
        department,
        status,
        sortBy,
        order
    ]);


    // =========================================
    // LOADING STATE
    // =========================================

    if (loading) {

        return (
            <div className="employee-page-state">

                <div className="loader"></div>

                <p>
                    Loading employees...
                </p>

            </div>
        );
    }


    // =========================================
    // ERROR STATE
    // =========================================

    if (error) {

        return (
            <div className="employee-list-page">

                <div className="employee-list-header">

                    <div>

                        <h1>
                            Employee Management
                        </h1>

                        <p>
                            Manage your employees
                        </p>

                    </div>

                </div>


                <div className="employee-error">

                    <h3>
                        Failed to load employees
                    </h3>

                    <p>
                        {error}
                    </p>


                    <button
                        type="button"
                        onClick={() =>
                            dispatch(
                                fetchEmployees({
                                    search: debouncedSearch,
                                    department,
                                    status,
                                    sortBy,
                                    order,
                                    page,
                                    limit: 10
                                })
                            )
                        }
                    >
                        Try Again
                    </button>

                </div>

            </div>
        );
    }


    // =========================================
    // PAGE
    // =========================================

    return (
        <div className="employee-list-page">


            {/* =====================================
                HEADER
            ===================================== */}

            <div className="employee-list-header">

                <div>

                    <h1>
                        Employee Management
                    </h1>

                    <p>
                        Manage your employees
                    </p>

                </div>


                <div className="employee-header-actions">

                    <div className="employee-count">

                        {pagination.total} Employees

                    </div>


                    <button
                        type="button"
                        className="add-employee-button"
                        onClick={() =>
                            navigate("/employees/add")
                        }
                    >
                        + Add Employee
                    </button>

                </div>

            </div>


            {/* =====================================
                FILTERS
            ===================================== */}

            <EmployeeFilters
                search={search}
                department={department}
                status={status}
                sortBy={sortBy}
                order={order}

                onSearchChange={setSearch}

                onDepartmentChange={
                    setDepartment
                }

                onStatusChange={
                    setStatus
                }

                onSortChange={
                    setSortBy
                }

                onOrderChange={
                    setOrder
                }
            />


            {/* =====================================
                EMPLOYEE TABLE
            ===================================== */}

            <EmployeeTable
                employees={employees}
            />


            {/* =====================================
                PAGINATION
            ===================================== */}

            <Pagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={setPage}
            />

        </div>
    );
};

export default EmployeeList;