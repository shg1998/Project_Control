namespace Services.WebFramework.Pagination
{
    public class PaginationHeader
    {
        public int TotalPages { get; set; }
        public int ItemsPerPage { get; set; }
        public int CurrentPage { get; set; }
        public int TotalItems { get; set; }

        public PaginationHeader(int totalPages, int itemsPerPage, int currentPage, int totalItems)
        {
            this.TotalPages = totalPages;
            this.TotalItems = totalItems;
            this.ItemsPerPage = itemsPerPage;
            this.CurrentPage = currentPage;
        }
    }
}
