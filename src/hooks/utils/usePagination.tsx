import { useState, useEffect } from 'react';

/**
 *
 * @param totalItems 총 데이터 길이
 * @param itemsPerPage 페이지 당 아이템 수
 * @param pagesPerRange 범위 당 페이지 수
 */

export const usePagination = (totalItems: number, itemsPerPage: number, pagesPerRange: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageRange, setPageRange] = useState<number[]>([1, pagesPerRange]);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const updatePageRange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setPageRange([pageRange[0] - pagesPerRange, pageRange[1] - pagesPerRange]);
    } else {
      setPageRange([pageRange[0] + pagesPerRange, pageRange[1] + pagesPerRange]);
    }
  };

  useEffect(() => {
    if (currentPage < pageRange[0] || currentPage > pageRange[1]) {
      const start = Math.floor((currentPage - 1) / pagesPerRange) * pagesPerRange + 1;
      setPageRange([start, start + pagesPerRange - 1]);
    }
  }, [currentPage]);

  return {
    currentPage,
    totalPages,
    pageRange,
    setCurrentPage,
    updatePageRange,
  };
};
