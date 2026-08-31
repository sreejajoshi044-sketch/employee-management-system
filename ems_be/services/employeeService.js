import employees from "../data/employeeData.js";

// GET employees with search, filters, sorting and pagination
export const getAllEmployees = ({
    search,
    department,
    status,
    sortBy,
    order = "asc",
    page = 1,
    limit = 10
} = {}) => {
    let result = [...employees];

    // =========================
    // SEARCH
    // =========================

    if (search) {
        const searchTerm = search
            .trim()
            .toLowerCase();

        result = result.filter(
            (employee) =>
                employee.name
                    .toLowerCase()
                    .includes(searchTerm) ||
                employee.email
                    .toLowerCase()
                    .includes(searchTerm)
        );
    }

    // =========================
    // DEPARTMENT FILTER
    // =========================

    if (department) {
        result = result.filter(
            (employee) =>
                employee.department
                    .toLowerCase() ===
                department
                    .trim()
                    .toLowerCase()
        );
    }

    // =========================
    // STATUS FILTER
    // =========================

    if (status) {
        result = result.filter(
            (employee) =>
                employee.status
                    .toLowerCase() ===
                status
                    .trim()
                    .toLowerCase()
        );
    }

    // =========================
    // SORT
    // =========================

    const allowedSortFields = [
        "name",
        "salary",
        "joiningDate"
    ];

    if (
        sortBy &&
        allowedSortFields.includes(sortBy)
    ) {
        result.sort((a, b) => {
            const valueA = a[sortBy];
            const valueB = b[sortBy];

            // Sort by name
            if (sortBy === "name") {
                const comparison =
                    valueA.localeCompare(valueB);

                return order === "desc"
                    ? -comparison
                    : comparison;
            }

            // Sort by salary / joining date
            if (valueA < valueB) {
                return order === "desc"
                    ? 1
                    : -1;
            }

            if (valueA > valueB) {
                return order === "desc"
                    ? -1
                    : 1;
            }

            return 0;
        });
    }

    // =========================
    // PAGINATION
    // =========================

    const total = result.length;

    const currentPage = Math.max(
        Number(page) || 1,
        1
    );

    const itemsPerPage = Math.max(
        Number(limit) || 10,
        1
    );

    const totalPages = Math.ceil(
        total / itemsPerPage
    );

    const startIndex =
        (currentPage - 1) *
        itemsPerPage;

    const paginatedEmployees =
        result.slice(
            startIndex,
            startIndex + itemsPerPage
        );

    return {
        employees: paginatedEmployees,

        pagination: {
            page: currentPage,
            limit: itemsPerPage,
            total,
            totalPages
        }
    };
};


// =========================
// GET EMPLOYEE BY ID
// =========================

export const getEmployeeById = (id) => {
    return employees.find(
        (employee) =>
            employee.id === id
    );
};


// =========================
// CREATE EMPLOYEE
// =========================

export const createEmployee = (
    employeeData
) => {

    // Required fields
    if (
        !employeeData.name ||
        !employeeData.email ||
        !employeeData.phone ||
        !employeeData.department ||
        !employeeData.designation ||
        !employeeData.salary ||
        !employeeData.status ||
        !employeeData.joiningDate
    ) {
        const error = new Error(
            "All employee fields are required"
        );

        error.statusCode = 400;

        throw error;
    }

    // Normalize email
    const email =
        employeeData.email
            .trim()
            .toLowerCase();

    // Duplicate email check
    const existingEmployee =
        employees.find(
            (employee) =>
                employee.email
                    .toLowerCase() === email
        );

    if (existingEmployee) {
        const error = new Error(
            "Email already exists"
        );

        error.statusCode = 400;

        throw error;
    }

    // Validate salary
    const salary =
        Number(employeeData.salary);

    if (
        Number.isNaN(salary) ||
        salary <= 0
    ) {
        const error = new Error(
            "Salary must be greater than 0"
        );

        error.statusCode = 400;

        throw error;
    }

    // Create new employee
    const newEmployee = {
        id:
            employees.length > 0
                ? Math.max(
                    ...employees.map(
                        (employee) =>
                            employee.id
                    )
                ) + 1
                : 1,

        name:
            employeeData.name.trim(),

        email,

        phone:
            employeeData.phone.trim(),

        department:
            employeeData.department.trim(),

        designation:
            employeeData.designation.trim(),

        salary,

        status:
            employeeData.status.trim(),

        joiningDate:
            employeeData.joiningDate.trim()
    };

    employees.push(newEmployee);

    return newEmployee;
};


// =========================
// UPDATE EMPLOYEE
// =========================

export const updateEmployee = (
    id,
    employeeData
) => {
    const index =
        employees.findIndex(
            (employee) =>
                employee.id === id
        );

    if (index === -1) {
        return null;
    }

    // Required fields
    if (
        !employeeData.name ||
        !employeeData.email ||
        !employeeData.phone ||
        !employeeData.department ||
        !employeeData.designation ||
        !employeeData.salary ||
        !employeeData.status ||
        !employeeData.joiningDate
    ) {
        const error = new Error(
            "All employee fields are required"
        );

        error.statusCode = 400;

        throw error;
    }

    // Normalize email
    const email =
        employeeData.email
            .trim()
            .toLowerCase();

    // Duplicate email check
    // Exclude current employee
    const existingEmployee =
        employees.find(
            (employee) =>
                employee.email
                    .toLowerCase() === email &&
                employee.id !== id
        );

    if (existingEmployee) {
        const error = new Error(
            "Email already exists"
        );

        error.statusCode = 400;

        throw error;
    }

    // Validate salary
    const salary =
        Number(employeeData.salary);

    if (
        Number.isNaN(salary) ||
        salary <= 0
    ) {
        const error = new Error(
            "Salary must be greater than 0"
        );

        error.statusCode = 400;

        throw error;
    }

    // Update employee
    employees[index] = {
        id,

        name:
            employeeData.name.trim(),

        email,

        phone:
            employeeData.phone.trim(),

        department:
            employeeData.department.trim(),

        designation:
            employeeData.designation.trim(),

        salary,

        status:
            employeeData.status.trim(),

        joiningDate:
            employeeData.joiningDate.trim()
    };

    return employees[index];
};


// =========================
// DELETE EMPLOYEE
// =========================

export const deleteEmployee = (id) => {
    const index =
        employees.findIndex(
            (employee) =>
                employee.id === id
        );

    if (index === -1) {
        return null;
    }

    const deletedEmployee =
        employees.splice(
            index,
            1
        );

    return deletedEmployee[0];
};