import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = [1, 2, 3];

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {/* Previous */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="flex h-[44px] w-[44px] items-center justify-center border border-[#ddd9e3] text-[#777184] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={19} />
      </button>

      {/* Pages */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`h-[44px] w-[44px] border text-[14px] ${
            currentPage === page
              ? "border-[#6846e8] bg-[#6846e8] text-white"
              : "border-[#ddd9e3] bg-white text-[#222]"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Ellipsis */}
      <span className="flex h-[44px] w-[30px] items-center justify-center">
        ...
      </span>

      {/* Last */}
      <button
        onClick={() => onPageChange(totalPages)}
        className={`h-[44px] min-w-[44px] border border-[#ddd9e3] bg-white px-3 text-[14px] ${
          currentPage === totalPages
            ? "border-[#6846e8] bg-[#6846e8] text-white"
            : ""
        }`}
      >
        {totalPages}
      </button>

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="flex h-[44px] w-[44px] items-center justify-center border border-[#ddd9e3] text-[#777184] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight size={19} />
      </button>
    </div>
  );
}

export default Pagination;
