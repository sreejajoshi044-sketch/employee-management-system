import axiosClient from "./axiosClient.js";

// =========================================
// GET ALL EMPLOYEES
// =========================================

export const getEmployees = async (params = {}) => {
    return await axiosClient.get("/employees", {
        params
    });
};


// =========================================
// GET EMPLOYEE BY ID
// =========================================

export const getEmployeeById = async (id) => {
    return await axiosClient.get(
        `/employees/${id}`
    );
};


// =========================================
// CREATE EMPLOYEE
// =========================================

export const createEmployee = async (employeeData) => {
    return await axiosClient.post(
        "/employees",
        employeeData
    );
};


// =========================================
// UPDATE EMPLOYEE
// =========================================

export const updateEmployee = async (
    id,
    employeeData
) => {
    return await axiosClient.put(
        `/employees/${id}`,
        employeeData
    );
};


// =========================================
// DELETE EMPLOYEE
// =========================================

export const deleteEmployee = async (id) => {
    return await axiosClient.delete(
        `/employees/${id}`
    );
};