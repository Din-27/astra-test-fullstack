import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import React from "react";

export default function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={"cursor-pointer"}
            onClick={() => onPageChange(currentPage <= 1 ? 1 : currentPage - 1)}
          />
        </PaginationItem>
        <PaginationItem>
          {pages.map((item, index) => (
            <PaginationLink
              className={`${
                currentPage === item ? "bg-blue-500 text-white" : ""
              } cursor-pointer`}
              key={index}
              onClick={() => onPageChange(item)}
            >
              {item}
            </PaginationLink>
          ))}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={"cursor-pointer"}
            onClick={() =>
              onPageChange(currentPage === 20 ? 20 : currentPage + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
