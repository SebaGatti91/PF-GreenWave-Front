const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const showPages = 5;
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const middle = Math.floor(showPages / 2);

    let start = currentPage - middle;
    let end = currentPage + middle;

    if (start < 1) {
      start = 1;
      end = Math.min(showPages, totalPages);
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, totalPages - showPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={` px-2 py-1 border-2 border-lime-100 ${
            i === currentPage
              ? "bg-boton text-white"
              : "bg-hover text-black  flex items-center justify-center px-4 leading-tight hover:bg-boton"
          }`}
          style={{ width: "30px", }}
          onClick={() => {
            onPageChange(i);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  // const renderPageNumbers = () => {
  //   const pageNumbers = [];
  //   const middle = Math.floor(showPages / 2);

  //   let start = currentPage - middle;
  //   let end = currentPage + middle;

  //   if (start < 1) {
  //     start = 1;
  //     end = showPages;
  //   }

  //   if (end > totalPages) {
  //     end = totalPages;
  //     start = totalPages - showPages + 1;
  //   }

  //   for (let i = start; i <= end; i++) {
  //     pageNumbers.push(
  //       <button
  //         key={i}
  //         className={`mx-1 px-2 py-1 rounded-lg ${
  //           i === currentPage
  //             ? "bg-boton text-white"
  //             : "bg-hover text-black  px-2 py-1 rounded-lg text-2xl hover:bg-boton"
  //         }`}
  //         style={{ width: "40px", margin: "5px" }}
  //         onClick={() => {
  //           onPageChange(i);
  //           window.scrollTo({ top: 0, behavior: "smooth" });
  //         }}
  //       >
  //         {i}
  //       </button>
  //     );
  //   }

  //   return pageNumbers;
  // };

  return (
    <div className="flex justify-center py-2 mt-4 mb-3">
      <button
        className="bg-hover border-2 border-lime-100 flex items-center justify-center px-4 h-10 ms-0 leading-tight hover:bg-boton rounded-l-lg"
        onClick={() => {
          onPageChange(currentPage - 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={currentPage === 1}
      >
         &#8249; {/* Flecha izquierda */}
      </button>

      {renderPageNumbers()}

      <button
        className="bg-hover border-2 border-lime-100 flex items-center justify-center px-4 h-10 ms-0 leading-tight hover:bg-boton rounded-r-lg "
        onClick={() => {
          onPageChange(currentPage + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={currentPage === totalPages}
      >
        &#8250; {/* Flecha derecha */}
      </button>
    </div>
  );
};

export default Pagination;
