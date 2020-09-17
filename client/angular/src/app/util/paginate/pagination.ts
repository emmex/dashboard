export class Page<T> {
  items: T[];
  meta: {
    itemCount: number,
    totalItems: number,
    itemsPerPage: number,
    totalPages: number,
    currentPage: number,
  };
}

export class PaginationOptions {
  page: number;
  limit: number;
}
