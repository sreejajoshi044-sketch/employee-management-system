import "./Pagination.css";
const Pagination = ({
    page,
    totalPages,
    onPageChange
}) => {
    if (!totalPages || totalPages <= 1) {
        return null;
    }

    const handlePrevious = () => {
        if (page > 1) {
            onPageChange(page - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            onPageChange(page + 1);
        }
    };

    return (
        <div className="pagination">

            <button
                type="button"
                className="pagination-button"
                onClick={handlePrevious}
                disabled={page === 1}
            >
                ← Previous
            </button>

            <div className="pagination-pages">

                {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                ).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        type="button"
                        className={`pagination-page ${
                            pageNumber === page
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            onPageChange(pageNumber)
                        }
                    >
                        {pageNumber}
                    </button>
                ))}

            </div>

            <button
                type="button"
                className="pagination-button"
                onClick={handleNext}
                disabled={page === totalPages}
            >
                Next →
            </button>

        </div>
    );
};

export default Pagination;