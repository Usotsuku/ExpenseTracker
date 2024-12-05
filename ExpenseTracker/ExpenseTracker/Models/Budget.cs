namespace ExpenseTracker.Models
{
    public class Budget
    {
        public int Id { get; set; }
        public decimal MonthlyBudget { get; set; }
        public decimal TotalExpenses { get; set; }
    }
}