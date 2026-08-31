import { configureStore } from "@reduxjs/toolkit";

import employeeReducer from "../features/employees/employeeSlice.js";
import authReducer from "../features/auth/authSlice.js";

const store = configureStore({
    reducer: {
        employees: employeeReducer,
        auth: authReducer
    }
});

export default store;