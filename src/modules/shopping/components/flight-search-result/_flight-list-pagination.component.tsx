import { Button } from "@/design/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function PaginationComponent({
  totalPages,
  currentPage,
  onPageChange,
}: IProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center mt-8 space-x-4">
      <Button
        size="icon"
        variant="outline"
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      >
        <ChevronLeft size={20} />
      </Button>

      <span className="text-sm font-medium text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        size="icon"
        variant="outline"
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      >
        <ChevronRight size={20} />
      </Button>
    </nav>
  );
}
