import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout.jsx";

import Login from "../pages/auth/Login.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";

import EmployeeList from "../pages/employees/EmployeeList.jsx";
import AddEmployee from "../pages/employees/AddEmployee.jsx";
import ViewEmployee from "../pages/employees/ViewEmployee.jsx";
import EditEmployee from "../pages/employees/EditEmployee.jsx";

import NotFound from "../pages/NotFound.jsx";

const AppRoutes = () => {
    return (
        <Routes>

            {/* =========================================
                LOGIN
            ========================================= */}

            <Route
                path="/login"
                element={<Login />}
            />


            {/* =========================================
                MAIN APPLICATION LAYOUT
            ========================================= */}

            <Route element={<MainLayout />}>

                {/* Dashboard */}

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />


                {/* Employee List */}

                <Route
                    path="/employees"
                    element={<EmployeeList />}
                />


                {/* Add Employee */}

                <Route
                    path="/employees/add"
                    element={<AddEmployee />}
                />


                {/* Edit Employee */}

                <Route
                    path="/employees/:id/edit"
                    element={<EditEmployee />}
                />


                {/* View Employee */}

                <Route
                    path="/employees/:id"
                    element={<ViewEmployee />}
                />

            </Route>


            {/* =========================================
                DEFAULT ROUTE
            ========================================= */}

            <Route
                path="/"
                element={
                    <Navigate
                        to="/dashboard"
                        replace
                    />
                }
            />


            {/* =========================================
                404
            ========================================= */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>
    );
};

export default AppRoutes;