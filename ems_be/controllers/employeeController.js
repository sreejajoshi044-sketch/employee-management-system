import {
    getAllEmployees,
    getEmployeeById,
    createEmployee as createEmployeeService,
    updateEmployee as updateEmployeeService,
    deleteEmployee as deleteEmployeeService
} from "../services/employeeService.js";

// GET all employees
// GET employees with search, filter, sort and pagination
export const getEmployees = (req, res, next) => {
    try {
        const {
            search,
            department,
            status,
            sortBy,
            order,
            page,
            limit
        } = req.query;

        const result = getAllEmployees({
            search,
            department,
            status,
            sortBy,
            order,
            page,
            limit
        });

        res.status(200).json({
            success: true,
            data: result.employees,
            pagination: result.pagination
        });

    } catch (error) {
        next(error);
    }
};


// GET employee by ID
export const getEmployee = (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const employee = getEmployeeById(id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        res.status(200).json({
            success: true,
            data: employee
        });

    } catch (error) {
        next(error);
    }
};


// CREATE employee
export const createEmployee = (req, res, next) => {
    try {
        const employee =
            createEmployeeService(req.body);

        res.status(201).json({
            success: true,
            message: "Employee created successfully",
            data: employee
        });

    } catch (error) {
        next(error);
    }
};


// UPDATE employee
export const updateEmployee = (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const employee =
            updateEmployeeService(
                id,
                req.body
            );

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            data: employee
        });

    } catch (error) {
        next(error);
    }
};


// DELETE employee
export const deleteEmployee = (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const employee =
            deleteEmployeeService(id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee deleted successfully",
            data: employee
        });

    } catch (error) {
        next(error);
    }
};