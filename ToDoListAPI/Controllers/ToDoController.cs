using Microsoft.AspNetCore.Mvc;
using ToDoListApi.Models;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;
using ToDoListAPI.Migrations;
using Microsoft.AspNetCore.Identity.Data;


[ApiController]
[Route("api/[controller]")]
public class ToDoController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<ToDoController> _logger;
    public ToDoController(ApplicationDbContext context, ILogger<ToDoController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet("getAll")] //global query filter already executes deleted items
    public async Task<ActionResult<IEnumerable<ToDoItem>>> GetToDoList()
    {
        _logger.LogInformation("Fetching ToDo list");
        return await _context.ToDoItems.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ToDoItem>> GetToDoList(int id)
    {
        var item = await _context.ToDoItems.FindAsync(id);
        if (item == null)
        {
            _logger.LogWarning($"ToDo with {id} not found !");
            return NotFound();
        }
        return item;
    }

    [HttpPost("createToDo")]
    public async Task<ActionResult<ToDoItem>> CreateToDoList([FromBody] ToDoItem item)
    {
        _context.ToDoItems.Add(item);
        await _context.SaveChangesAsync();
        _logger.LogInformation("Creating new ToDo item");
        return CreatedAtAction(nameof(GetToDoList), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateToDoList(int id, [FromBody] ToDoItem updatedFields)
    {
        var existingToDo = await _context.ToDoItems.FindAsync(id);

        if (existingToDo == null)
        {
            _logger.LogWarning($"Todo with id {id} not found!");
            return NotFound();
        }

        // Only update fields you care about (safely)
        existingToDo.IsComplete = updatedFields.IsComplete;
        existingToDo.Title = updatedFields.Title ?? existingToDo.Title; // if title is optional
        existingToDo.DeletedAt = updatedFields.DeletedAt;
        existingToDo.Priority = updatedFields.Priority;

        try
        {
            await _context.SaveChangesAsync();
            _logger.LogInformation($"Updated todo with id {id}!");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error updating todo with id {id}");
            return StatusCode(500, "An error occurred while updating the item.");
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteToDoList(int id) //Soft delete
    {
        var item = await _context.ToDoItems.FindAsync(id);
        if (item == null || item.DeletedAt != null)
        {
            _logger.LogWarning($"ToDo with {id} not found !");
            return NotFound();
        }

        item.DeletedAt = DateTime.UtcNow;

        // _context.ToDoItems.Remove(item);
        await _context.SaveChangesAsync();
        _logger.LogInformation($"Deleting ToDo item with {id}");
        return NoContent();
    }



    [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<ToDoItem>>> GetToDosByUser(int userId)
    {
        _logger.LogInformation($"Fetching todo by userId");
        var todos = _context.ToDoItems.Where(t => t.UserId == userId).ToList();
        return Ok(todos);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserItem userItem)
    {
        var user = await _context.UserItems
            .FirstOrDefaultAsync(u => u.Email == userItem.Email && u.Password == userItem.Password);

        if (user == null)
        {
            return Unauthorized("Invalid email or password");
        }

        var todoItems = await _context.ToDoItems.Where(t => t.UserId == user.Id && t.DeletedAt == null).ToListAsync();

        _logger.LogInformation("User logged in successfully:");
        return Ok(new { status = 200, userId = user.Id, email = user.Email });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserItem userItem)
    {
        // Basic validation
        if (string.IsNullOrWhiteSpace(userItem.Email) || string.IsNullOrWhiteSpace(userItem.Password))
        {
            return BadRequest("Email and Password are required.");
        }

        // Check if user already exists
        var existingUser = _context.UserItems.FirstOrDefault(u => u.Email == userItem.Email);
        if (existingUser != null)
        {
            return Conflict("User with this email already exists.");
        }

        // Save new user
        _context.UserItems.Add(userItem);
        await _context.SaveChangesAsync();

        _logger.LogInformation($"User registered: {userItem.Email}");

        return Ok("User registered successfully.");
    }

    // [HttpPost("restore/{id}")]
    // public async Task<IActionResult> RestoreToDoItem(int id)
    // {
    //     var item = await _context.ToDoItems.IgnoreQueryFilters().FirstOrDefaultAsync(t => t.Id == id);

    //     if (item == null || item.DeletedAt == null)
    //     {
    //         return NotFound();
    //     }

    //     item.DeletedAt = null;
    //     await _context.SaveChangesAsync();

    //     return Ok(item);
    // }
}