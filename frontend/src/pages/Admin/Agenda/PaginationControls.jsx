import React from 'react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const PaginationControls = ({ currentPage, setCurrentPage, totalPages, itemsPerPage, setItemsPerPage }) => {
  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationItem className="bg-gray-100 cursor-pointer transition transform hover:scale-105 hover:shadow-lg">
            <PaginationPrevious className="text-primary text-gray-500 hover:text-foreground hover:text-gray-900" onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))} disabled={currentPage === 1} />
          </PaginationItem>
          {[...Array(totalPages).keys()].map((page) => (
            <PaginationItem key={page} className="text-primary text-gray-500 hover:text-foreground hover-text-gray-900 cursor-pointer transition transform hover:scale-105 hover:shadow-lg">
              <PaginationLink onClick={() => setCurrentPage(page + 1)} isActive={currentPage === page + 1}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem className="bg-gray-100 cursor-pointer transition transform hover:scale-105 hover:shadow-lg">
            <PaginationNext className="text-primary text-gray-500 hover:text-foreground hover:text-gray-900" onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))} disabled={currentPage === totalPages} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="flex justify-end">
        <label htmlFor="itemsPerPage" className="mr-2">Items per page:</label>
        <select id="itemsPerPage" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="border rounded px-2 py-1">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </>
  );
};

export default PaginationControls;
