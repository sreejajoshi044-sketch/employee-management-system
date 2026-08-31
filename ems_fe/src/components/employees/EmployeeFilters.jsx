import "./EmployeeFilters.css";
const EmployeeFilters = ({
    search,
    department,
    status,
    sortBy,
    order,
    onSearchChange,
    onDepartmentChange,
    onStatusChange,
    onSortChange,
    onOrderChange
}) => {
    const handleSearch = (event) => {
        onSearchChange(event.target.value);
    };

    const clearSearch = () => {
        onSearchChange("");
    };

    return (
        <div className="employee-filters">

            {/* Search */}
            <div className="search-box">
                <span className="search-icon">
                    🔍
                </span>

                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search by name or email..."
                    className="search-input"
                />

                {search && (
                    <button
                        type="button"
                        className="search-clear"
                        onClick={clearSearch}
                    >
                        ×
                    </button>
                )}
            </div>

            {/* Department */}
            <select
                value={department}
                onChange={(event) =>
                    onDepartmentChange(event.target.value)
                }
                className="department-select"
            >
                <option value="">
                    All Departments
                </option>

                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Operations">Operations</option>
            </select>

            {/* Status */}
            <select
                value={status}
                onChange={(event) =>
                    onStatusChange(event.target.value)
                }
                className="department-select"
            >
                <option value="">
                    All Status
                </option>

                <option value="Active">
                    Active
                </option>

                <option value="Inactive">
                    Inactive
                </option>
            </select>

            {/* Sort By */}
            <select
                value={sortBy}
                onChange={(event) =>
                    onSortChange(event.target.value)
                }
                className="department-select"
            >
                <option value="">
                    Sort By
                </option>

                <option value="name">
                    Name
                </option>

                <option value="salary">
                    Salary
                </option>

                <option value="joiningDate">
                    Joining Date
                </option>
            </select>

            {/* Order */}
            <select
                value={order}
                onChange={(event) =>
                    onOrderChange(event.target.value)
                }
                className="department-select"
            >
                <option value="asc">
                    Ascending
                </option>

                <option value="desc">
                    Descending
                </option>
            </select>

        </div>
    );
};

export default EmployeeFilters;