namespace Common.Utilities
{
    public class OdataUtils
    {
        public static OdataPaginationModel GetSkipLimit<T>(string? queries, IQueryable<T> list)
        {
            var result = new OdataPaginationModel();
            if (queries == null) return result;
            result.Skip = int.Parse(queries.Split("skip=")[1].Split('&')[0]);
            result.Limit = int.Parse(queries.Split("top=")[1].Split('&')[0]);
            if (result.Limit != 0)
                result.TotalCount = list.Count();
            result.CurrentPageNumber = result.Skip / result.Limit + 1;
            return result;
        }
    }

    public class OdataPaginationModel
    {
        public int Skip { get; set; }
        public int Limit { get; set; }
        public int CurrentPageNumber { get; set; }
        public int TotalCount { get; set; }
    }
}
