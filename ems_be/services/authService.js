// =========================================
// TEMPORARY LOGIN CREDENTIALS
// =========================================

const ADMIN_USER = {
    id: 1,
    name: "Admin",
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin"
};


// =========================================
// LOGIN SERVICE
// =========================================

export const login = (email, password) => {

    if (!email || !password) {
        const error = new Error(
            "Email and password are required"
        );

        error.statusCode = 400;

        throw error;
    }

    const user = ADMIN_USER;

    // Check email
    if (
        email.trim().toLowerCase() !==
        user.email.toLowerCase()
    ) {
        const error = new Error(
            "Invalid email or password"
        );

        error.statusCode = 401;

        throw error;
    }

    // Check password
    if (password !== user.password) {
        const error = new Error(
            "Invalid email or password"
        );

        error.statusCode = 401;

        throw error;
    }

    // Never return password to frontend
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };
};