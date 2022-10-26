import React from 'react'
import { PaginateProps } from "./Pagination.types"
import PaginationBootstraps from 'react-bootstrap/Pagination';

export const Pagination: React.FC<PaginateProps> = ({dataBank, limitPage, startPage, activePage, handleChangePagination}: PaginateProps) => {
    const LEFT_PAGE = "LEFT";
    const RIGHT_PAGE = "RIGHT";
    const [countPaginate, setCountPaginate] = React.useState<number>(0)

    const limitData = async(dataTable: any, page_size: number) => {
        let countPagePending = 0;
        countPagePending = Math.ceil(dataTable.length / page_size);
        setCountPaginate(countPagePending)
    }

    const range = (from: any, to: any, step = 1) => {
        let i = from;
        const range = [];
      
        while (i <= to) {
          range.push(i);
          i += step;
        }
      
        return range;
    };

    const fetchPageNumbers = () => {
        const totalPages = countPaginate;
        const currentPage = startPage;
        const pageNeighbours = 1;
    
        const totalNumbers = pageNeighbours * 2 + 3;
        const totalBlocks = totalNumbers + 2;
    
        if (totalPages > totalBlocks) {
          let pages = [];
    
          const leftBound = currentPage - pageNeighbours;
          const rightBound = currentPage + pageNeighbours;
          const beforeLastPage = totalPages - 1;
    
          const startPage = leftBound > 2 ? leftBound : 2;
          const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;
    
          pages = range(startPage, endPage);
    
          const pagesCount = pages.length;
          const singleSpillOffset = totalNumbers - pagesCount - 1;
    
          const leftSpill = startPage > 2;
          const rightSpill = endPage < beforeLastPage;
    
          const leftSpillPage = LEFT_PAGE;
          const rightSpillPage = RIGHT_PAGE;
    
          if (leftSpill && !rightSpill) {
            const extraPages = range(startPage - singleSpillOffset, startPage - 1);
            pages = [leftSpillPage, ...extraPages, ...pages];
          } else if (!leftSpill && rightSpill) {
            const extraPages = range(endPage + 1, endPage + singleSpillOffset);
            pages = [...pages, ...extraPages, rightSpillPage];
          } else if (leftSpill && rightSpill) {
            pages = [leftSpillPage, ...pages, rightSpillPage];
          }
    
          return [1, ...pages, totalPages];
        }
    
        return range(1, totalPages);
    };

    const pages = fetchPageNumbers();

    React.useEffect(() => {
        limitData(dataBank, limitPage)
    }, []);

    return (
        <React.Fragment>
            <PaginationBootstraps className='float-end mb-0'>
                {pages.map((page, index) => {
                if (page === LEFT_PAGE)
                    return (
                        <PaginationBootstraps.Ellipsis disabled />
                    );

                if (page === RIGHT_PAGE)
                    return (
                        <PaginationBootstraps.Ellipsis disabled />
                    );

                return (
                    <>
                        {activePage == page ? (
                            <PaginationBootstraps.Item active key={index} onClick={(event) => handleChangePagination(page, event)}>
                                {page}
                            </PaginationBootstraps.Item>
                        ) : (
                            <PaginationBootstraps.Item key={index} onClick={(event) => handleChangePagination(page, event)}>
                                {page}
                            </PaginationBootstraps.Item>
                        )}
                    </>
                );
                })}
            </PaginationBootstraps>
            </React.Fragment>
    );
};

export default Pagination;