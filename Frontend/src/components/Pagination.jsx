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
  const getVisiblePages = () => {
    const maxVisiblePages = 3;
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = start + maxVisiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };
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
          {getVisiblePages().map((item, index) => (
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
              onPageChange(
                currentPage === totalPages ? totalPages : currentPage + 1
              )
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
