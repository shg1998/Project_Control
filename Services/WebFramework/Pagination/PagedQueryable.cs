namespace Services.WebFramework.Pagination
{
    public class PagedQueryable<T>
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public IQueryable<T> Data { get; set; }
    }
}
