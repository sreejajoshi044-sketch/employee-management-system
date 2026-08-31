import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px"
            }}
        >
            <h1>404</h1>

            <p>
                Page not found
            </p>

            <button
                type="button"
                onClick={() => navigate("/dashboard")}
            >
                Go to Dashboard
            </button>
        </div>
    );
};

export default NotFound;