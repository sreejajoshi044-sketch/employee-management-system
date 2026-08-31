export const validateEmployee = (req, res, next) => {
    const { name, email, department, salary } = req.body;

    const errors = {};

    if (!name || name.trim() === "") {
        errors.name = "Name is required";
    }

    if (!email || email.trim() === "") {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Invalid email format";
    }

    if (!department || department.trim() === "") {
        errors.department = "Department is required";
    }

    if (salary === undefined || salary === null || salary === "") {
        errors.salary = "Salary is required";
    } else if (isNaN(Number(salary))) {
        errors.salary = "Salary must be a number";
    } else if (Number(salary) < 0) {
        errors.salary = "Salary cannot be negative";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors
        });
    }

    next();
};