namespace DataLayer.Models
{
    public class Paging
    {
        public int PageSize { get; set; }

        public int PageNumber { get; set; }

        public Paging(int pageSize = 10, int pageNumber = 1)
        {
            PageSize = pageSize < 1 ? 1 : pageSize;
            PageNumber = pageNumber < 1 ? 1 : pageNumber;
        }
    }
}
