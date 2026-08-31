import { useState } from "react";

const EmployeeForm = ({
    initialData = {},
    onSubmit,
    loading = false,
    submitText = "Add Employee"
}) => {
    const [formData, setFormData] = useState({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        department: initialData.department || "",
        designation: initialData.designation || "",
        salary: initialData.salary || "",
        status: initialData.status || "Active",
        joiningDate: initialData.joiningDate || ""
    });

    const [formError, setFormError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setFormError("");

        if (!formData.name.trim()) {
            setFormError("Name is required");
            return;
        }

        if (!formData.email.trim()) {
            setFormError("Email is required");
            return;
        }

        if (!formData.phone.trim()) {
            setFormError("Phone is required");
            return;
        }

        if (!formData.department) {
            setFormError("Department is required");
            return;
        }

        if (!formData.designation.trim()) {
            setFormError("Designation is required");
            return;
        }

        if (
            !formData.salary ||
            Number(formData.salary) <= 0
        ) {
            setFormError(
                "Salary must be greater than 0"
            );
            return;
        }

        if (!formData.status) {
            setFormError("Status is required");
            return;
        }

        if (!formData.joiningDate) {
            setFormError(
                "Joining date is required"
            );
            return;
        }

        onSubmit({
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            department: formData.department,
            designation: formData.designation.trim(),
            salary: Number(formData.salary),
            status: formData.status,
            joiningDate: formData.joiningDate
        });
    };

    return (
        <form
            className="employee-form"
            onSubmit={handleSubmit}
        >
            <div className="employee-form-grid">

                {/* Name */}

                <div className="form-group">
                    <label htmlFor="name">
                        Employee Name
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter employee name"
                    />
                </div>


                {/* Email */}

                <div className="form-group">
                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                    />
                </div>


                {/* Phone */}

                <div className="form-group">
                    <label htmlFor="phone">
                        Phone
                    </label>

                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                    />
                </div>


                {/* Department */}

                <div className="form-group">
                    <label htmlFor="department">
                        Department
                    </label>

                    <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                    >
                        <option value="">
                            Select department
                        </option>

                        <option value="Development">
                            Development
                        </option>

                        <option value="Testing">
                            Testing
                        </option>

                        <option value="HR">
                            HR
                        </option>

                        <option value="Finance">
                            Finance
                        </option>

                        <option value="Marketing">
                            Marketing
                        </option>
                    </select>
                </div>


                {/* Designation */}

                <div className="form-group">
                    <label htmlFor="designation">
                        Designation
                    </label>

                    <input
                        id="designation"
                        name="designation"
                        type="text"
                        value={formData.designation}
                        onChange={handleChange}
                        placeholder="Enter designation"
                    />
                </div>


                {/* Salary */}

                <div className="form-group">
                    <label htmlFor="salary">
                        Salary
                    </label>

                    <input
                        id="salary"
                        name="salary"
                        type="number"
                        min="1"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="Enter salary"
                    />
                </div>


                {/* Status */}

                <div className="form-group">
                    <label htmlFor="status">
                        Status
                    </label>

                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Active">
                            Active
                        </option>

                        <option value="Inactive">
                            Inactive
                        </option>
                    </select>
                </div>


                {/* Joining Date */}

                <div className="form-group">
                    <label htmlFor="joiningDate">
                        Joining Date
                    </label>

                    <input
                        id="joiningDate"
                        name="joiningDate"
                        type="date"
                        value={formData.joiningDate}
                        onChange={handleChange}
                    />
                </div>

            </div>


            {/* Validation Error */}

            {formError && (
                <div className="form-error">
                    {formError}
                </div>
            )}


            {/* Form Actions */}

            <div className="form-actions">
                <button
                    type="submit"
                    className="form-submit-button"
                    disabled={loading}
                >
                    {loading
                        ? "Saving..."
                        : submitText}
                </button>
            </div>

        </form>
    );
};

export default EmployeeForm;