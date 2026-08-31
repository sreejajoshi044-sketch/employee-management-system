import express from "express";
import {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from "../controllers/employeeController.js";
import { validateEmployeeId } from "../middleware/validateEmployeeId.js";
import { validateEmployee } from "../middleware/validateEmployee.js";
import { validateEmployeeQuery } from "../middleware/validateEmployeeQuery.js";
const router = express.Router();

router.get("/", validateEmployeeQuery, getEmployees);
router.get("/:id", getEmployee);

router.post("/", validateEmployee, createEmployee);

router.put("/:id", validateEmployee, updateEmployee);

router.delete("/:id", deleteEmployee);

export default router;