using static DataLayer.Constants;

namespace DataLayer.Models
{
    public class Sorting
    {
        public string SortingField { get; set; } = null!;

        public SortingOrder SortingOrder { get; set; }

        public Sorting() { }

        public Sorting(string fieldName, SortingOrder sortingOrder)
        {
            SortingField = fieldName;
            SortingOrder = sortingOrder;
        }
    }
}
