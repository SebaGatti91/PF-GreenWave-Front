const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center py-2">
            <button className="bg-hover px-2 rounded-lg text-2xl hover:bg-boton" style={{borderRadius: '2rem 2rem'}}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &#8249; {/* Flecha izquierda */}
            </button>
            <span className="px-2 mx-2 text-lg bg-hover rounded-lg" style={{
          fontFamily: "font-serif"}}>
                {currentPage} of {totalPages}
            </span>
            <button className="bg-hover px-2 rounded-lg text-2xl hover:bg-boton" style={{borderRadius: '2rem 2rem'}}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &#8250; {/* Flecha derecha */}
            </button>
        </div>
    );
};

export default Pagination;