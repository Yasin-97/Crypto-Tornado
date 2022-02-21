import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

export default function usePagination() {
  const [inputData, setInputData] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [perPage, setPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState();

  const receiveData = () => {
    const slice = inputData?.slice(offset, offset + perPage);
    setCurrentPageData(slice);
    setPageCount(Math.ceil(inputData?.length / perPage));
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    setCurrentPage(selectedPage);
    setOffset(offset);

    window.scroll({ top: 0 })
  };
  
  useEffect(() => {
    receiveData();
  }, [inputData, offset]);
  
  return {
    setInputData,
    currentPageData,

    paginate: (
      <ReactPaginate role='pagination-component'
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        previousLabel="prev"
        nextLabel="next"
        breakLabel="..."
        breakClassName="break-me"
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    ),
  };
}
