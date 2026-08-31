const allowedSortFields = [
    "id",
    "name",
    "email",
    "department",
    "salary"
];

export const validateEmployeeQuery = (req, res, next) => {
    const {
        sortBy,
        order,
        page,
        limit
    } = req.query;

    const errors = {};

    if (sortBy && !allowedSortFields.includes(sortBy)) {
        errors.sortBy =
            `sortBy must be one of: ${allowedSortFields.join(", ")}`;
    }

    if (order && !["asc", "desc"].includes(order.toLowerCase())) {
        errors.order = "order must be either 'asc' or 'desc'";
    }

    if (page !== undefined) {
        const pageNumber = Number(page);

        if (!Number.isInteger(pageNumber) || pageNumber < 1) {
            errors.page = "page must be a positive integer";
        }
    }

    if (limit !== undefined) {
        const limitNumber = Number(limit);

        if (!Number.isInteger(limitNumber) || limitNumber < 1) {
            errors.limit = "limit must be a positive integer";
        } else if (limitNumber > 100) {
            errors.limit = "limit cannot be greater than 100";
        }
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid query parameters",
            errors
        });
    }

    next();
};