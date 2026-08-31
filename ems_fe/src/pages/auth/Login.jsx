import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../features/auth/authSlice.js";

import "./Login.css";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        loading,
        error
    } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        setFormError("");

        // Frontend validation
        if (!email.trim()) {
            setFormError("Email is required");
            return;
        }

        if (!password.trim()) {
            setFormError("Password is required");
            return;
        }

        try {
            await dispatch(
                loginUser({
                    email: email.trim(),
                    password
                })
            ).unwrap();

            // Login successful
            navigate("/dashboard");

        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                {/* Logo / Brand */}

                <div className="login-brand">

                    <div className="login-logo">
                        EMS
                    </div>

                    <h1>
                        Employee Management
                    </h1>

                    <p>
                        Sign in to your account
                    </p>

                </div>


                {/* Login Form */}

                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >

                    {/* Email */}

                    <div className="login-form-group">

                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            placeholder="Enter your email"
                            autoComplete="email"
                            disabled={loading}
                        />

                    </div>


                    {/* Password */}

                    <div className="login-form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <div className="password-wrapper">

                            <input
                                id="password"
                                name="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                disabled={loading}
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        (previous) =>
                                            !previous
                                    )
                                }
                                disabled={loading}
                            >
                                {showPassword
                                    ? "Hide"
                                    : "Show"}
                            </button>

                        </div>

                    </div>


                    {/* Error */}

                    {(formError || error) && (
                        <div className="login-error">
                            {formError || error}
                        </div>
                    )}


                    {/* Submit */}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Signing in..."
                            : "Sign In"}
                    </button>

                </form>


                {/* Footer */}

                <div className="login-footer">
                    Employee Management System
                </div>

            </div>

        </div>
    );
};

export default Login;