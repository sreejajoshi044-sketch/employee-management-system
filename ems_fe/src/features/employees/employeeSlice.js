import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from "../../api/employeeApi.js";


// =========================================
// GET ALL EMPLOYEES
// =========================================

export const fetchEmployees = createAsyncThunk(
    "employees/fetchEmployees",

    async (params = {}, { rejectWithValue }) => {
        try {
            const response = await getEmployees(params);

            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch employees"
            );
        }
    }
);


// =========================================
// GET EMPLOYEE BY ID
// =========================================

export const fetchEmployeeById = createAsyncThunk(
    "employees/fetchEmployeeById",

    async (id, { rejectWithValue }) => {
        try {
            const response =
                await getEmployeeById(id);

            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch employee"
            );
        }
    }
);


// =========================================
// CREATE EMPLOYEE
// =========================================

export const addEmployee = createAsyncThunk(
    "employees/addEmployee",

    async (employeeData, { rejectWithValue }) => {
        try {
            const response =
                await createEmployee(employeeData);

            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to create employee"
            );
        }
    }
);


// =========================================
// UPDATE EMPLOYEE
// =========================================

export const editEmployee = createAsyncThunk(
    "employees/editEmployee",

    async (
        { id, employeeData },
        { rejectWithValue }
    ) => {
        try {
            const response =
                await updateEmployee(
                    id,
                    employeeData
                );

            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to update employee"
            );
        }
    }
);


// =========================================
// DELETE EMPLOYEE
// =========================================

export const removeEmployee = createAsyncThunk(
    "employees/removeEmployee",

    async (id, { rejectWithValue }) => {
        try {
            const response =
                await deleteEmployee(id);

            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete employee"
            );
        }
    }
);


// =========================================
// INITIAL STATE
// =========================================

const initialState = {
    employees: [],

    selectedEmployee: null,

    loading: false,

    error: null,

    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    }
};


// =========================================
// EMPLOYEE SLICE
// =========================================

const employeeSlice = createSlice({
    name: "employees",

    initialState,

    reducers: {

        clearEmployeeError: (state) => {
            state.error = null;
        },

        clearSelectedEmployee: (state) => {
            state.selectedEmployee = null;
        }
    },


    // =========================================
    // ASYNC ACTIONS
    // =========================================

    extraReducers: (builder) => {

        // =====================================
        // FETCH ALL
        // =====================================

        builder
            .addCase(
                fetchEmployees.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                fetchEmployees.fulfilled,
                (state, action) => {
                    state.loading = false;

                    state.employees =
                        action.payload.data || [];

                    state.pagination =
                        action.payload.pagination || {
                            page: 1,
                            limit: 10,
                            total: 0,
                            totalPages: 0
                        };
                }
            )

            .addCase(
                fetchEmployees.rejected,
                (state, action) => {
                    state.loading = false;

                    state.error =
                        action.payload ||
                        "Failed to fetch employees";
                }
            );


        // =====================================
        // FETCH BY ID
        // =====================================

        builder
            .addCase(
                fetchEmployeeById.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                    state.selectedEmployee = null;
                }
            )

            .addCase(
                fetchEmployeeById.fulfilled,
                (state, action) => {
                    state.loading = false;

                    state.selectedEmployee =
                        action.payload.data;
                }
            )

            .addCase(
                fetchEmployeeById.rejected,
                (state, action) => {
                    state.loading = false;

                    state.error =
                        action.payload ||
                        "Failed to fetch employee";

                    state.selectedEmployee = null;
                }
            );


        // =====================================
        // ADD
        // =====================================

        builder
            .addCase(
                addEmployee.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                addEmployee.fulfilled,
                (state, action) => {
                    state.loading = false;

                    const newEmployee =
                        action.payload.data;

                    state.employees.push(
                        newEmployee
                    );

                    state.pagination.total += 1;
                }
            )

            .addCase(
                addEmployee.rejected,
                (state, action) => {
                    state.loading = false;

                    state.error =
                        action.payload ||
                        "Failed to create employee";
                }
            );


        // =====================================
        // EDIT
        // =====================================

        builder
            .addCase(
                editEmployee.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                editEmployee.fulfilled,
                (state, action) => {
                    state.loading = false;

                    const updatedEmployee =
                        action.payload.data;

                    const index =
                        state.employees.findIndex(
                            (employee) =>
                                employee.id ===
                                updatedEmployee.id
                        );

                    if (index !== -1) {
                        state.employees[index] =
                            updatedEmployee;
                    }

                    state.selectedEmployee =
                        updatedEmployee;
                }
            )

            .addCase(
                editEmployee.rejected,
                (state, action) => {
                    state.loading = false;

                    state.error =
                        action.payload ||
                        "Failed to update employee";
                }
            );


        // =====================================
        // DELETE
        // =====================================

        builder
            .addCase(
                removeEmployee.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                removeEmployee.fulfilled,
                (state, action) => {
                    state.loading = false;

                    const deletedEmployee =
                        action.payload.data;

                    state.employees =
                        state.employees.filter(
                            (employee) =>
                                employee.id !==
                                deletedEmployee.id
                        );

                    state.pagination.total =
                        Math.max(
                            state.pagination.total - 1,
                            0
                        );

                    if (
                        state.selectedEmployee?.id ===
                        deletedEmployee.id
                    ) {
                        state.selectedEmployee = null;
                    }
                }
            )

            .addCase(
                removeEmployee.rejected,
                (state, action) => {
                    state.loading = false;

                    state.error =
                        action.payload ||
                        "Failed to delete employee";
                }
            );
    }
});


// =========================================
// ACTIONS
// =========================================

export const {
    clearEmployeeError,
    clearSelectedEmployee
} = employeeSlice.actions;


// =========================================
// REDUCER
// =========================================

export default employeeSlice.reducer;