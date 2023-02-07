namespace Services.WebFramework.Pagination
{
    public class ManualPagedList<T>
    {
        public IList<T> Items { get; set; }
        public int TotalCount { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
    }
}
