export interface PaginateProps {
    dataBank?: any,
    limitPage: number,
    startPage: number,
    activePage: number,
    handleChangePagination: (page: any, evt: any) => void,
}