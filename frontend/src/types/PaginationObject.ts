export interface PaginationObject {
  totalPages: number;
  currentPage: number;

  setCurrentPage: (value: number) => { payload: number; type: string };
  increment: () => { payload: undefined; type: string };
  decrement: () => { payload: undefined; type: string };
}
