namespace DataLayer.Entities;

public class Worktime
{ 
    public Guid Id { get; set; }
    
    public Guid UserId { get; set; }
    
    public DateTime StartDate { get; set; }
    
    public DateTime FinishDate { get; set; }
    
    public bool IsAutoCreated { get; set; }
    
    public Guid LastEditorId { get; set; }

}