    using Microsoft.AspNetCore.Mvc;
    using ExpenseTracker.Data;
    using ExpenseTracker.Models;
    using Microsoft.EntityFrameworkCore;

    namespace ExpenseTracker.Controllers
    {
        [Route("api/[controller]")]
        [ApiController]
        public class ExpensesController : ControllerBase
        {
            private readonly AppDbContext _context;

            public ExpensesController(AppDbContext context)
            {
                _context = context;
            }

            [HttpPost]
            public async Task<IActionResult> CreateExpense([FromBody] Expense expense)
            {
                if (expense == null)
                    return BadRequest("Expense is null");

                var budget = _context.Budgets.FirstOrDefault();
                if (budget == null)
                    return BadRequest("Budget is not set");

                var totalExpenses = _context.Expenses.Sum(e => e.Amount) + expense.Amount;

                if (totalExpenses > budget.MonthlyBudget)
                {
                    return BadRequest("Expense exceeds the monthly budget!");
                }

                await _context.Expenses.AddAsync(expense);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetExpenseById), new { id = expense.Id }, expense);
            }

            [HttpGet("{id}")]
            public async Task<IActionResult> GetExpenseById(int id)
            {
                var expense = await _context.Expenses.FindAsync(id);

                if (expense == null)
                    return NotFound();

                return Ok(expense);
            }
            [HttpGet]
            public async Task<IActionResult> GetAllExpenses()
            {
                var expenses = await _context.Expenses.ToListAsync();
                return Ok(expenses);
            }

            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteExpense(int id)
            {
                var expense = await _context.Expenses.FindAsync(id);

                if (expense == null)
                    return NotFound();

                _context.Expenses.Remove(expense);
                await _context.SaveChangesAsync();

                return NoContent();
            }

            [HttpPut("{id}")]
            public async Task<IActionResult> UpdateExpense(int id, [FromBody] Expense expense)
            {
                if (id != expense.Id)
                    return BadRequest();

                var existingExpense = await _context.Expenses.FindAsync(id);
                if (existingExpense == null)
                    return NotFound();

                existingExpense.Title = expense.Title;
                existingExpense.Category = expense.Category;
                existingExpense.Amount = expense.Amount;
                existingExpense.Date = expense.Date;

                await _context.SaveChangesAsync();

                return Ok(existingExpense);
            }

            [HttpGet("category/{category}")]
            public async Task<IActionResult> GetExpensesByCategory(string category)
            {
                var expenses = await _context.Expenses.Where(e => e.Category == category).ToListAsync();
                return Ok(expenses);
            }

            [HttpGet("totals")]
            public IActionResult GetTotalExpenses()
            {
                var totalExpenses = _context.Expenses.Sum(e => e.Amount);
                return Ok(new { TotalExpenses = totalExpenses });
            }

        }
    }
