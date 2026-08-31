import { login } from "../services/authService.js";

// =========================================
// LOGIN
// =========================================

export const loginUser = (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = login(email, password);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token: "ems-demo-token",
            user
        });

    } catch (error) {
        next(error);
    }
};