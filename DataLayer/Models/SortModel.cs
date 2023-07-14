namespace DataLayer.Models
{
    public class SortModel
    {
        public string FieldName { get; set; }

        public string SortingOrder { get; set; }

        public SortModel(string fieldName = "EmploymentDate", string sortingOrder = "DESC")
        {
            FieldName = fieldName;
            SortingOrder = sortingOrder;
        }
    }
}
