using ExpenseTracker.Data;
using ExpenseTracker.Models;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTracker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BudgetController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BudgetController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetBudget()
        {
            return Ok(_context.Budgets.FirstOrDefault());
        }

        [HttpPost]
        public IActionResult SetBudget([FromBody] Budget budget)
        {
            var existingBudget = _context.Budgets.FirstOrDefault();

            if (existingBudget != null)
            {
                existingBudget.MonthlyBudget = budget.MonthlyBudget;
                existingBudget.TotalExpenses = budget.TotalExpenses; 
                _context.SaveChanges();
                return Ok(existingBudget);
            }
            else
            {
                _context.Budgets.Add(budget);
                _context.SaveChanges();
                return Ok(budget);
            }
        }

        [HttpPut]
        public IActionResult UpdateBudget([FromBody] Budget budget)
        {
            var existingBudget = _context.Budgets.FirstOrDefault();
            if (existingBudget == null) return NotFound();

            existingBudget.MonthlyBudget = budget.MonthlyBudget;
            _context.SaveChanges();
            return Ok(existingBudget);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBudget(int id)
        {
            var budget = await _context.Budgets.FindAsync(id);

            if (budget == null)
                return NotFound();

            _context.Budgets.Remove(budget);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("budget-progress")]
        public IActionResult GetBudgetProgress()
        {
            var budget = _context.Budgets.FirstOrDefault();
            if (budget == null)
                return BadRequest("Budget is not set");

            var totalExpenses = _context.Expenses.Sum(e => e.Amount);
            var progress = (totalExpenses / budget.MonthlyBudget) * 100;
            return Ok(new { Progress = progress });
        }
    }
}
