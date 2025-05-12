using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using ToDoListApi.Models;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;


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

    [HttpGet("getAll")]
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
    public async Task<ActionResult<ToDoItem>> CreateToDoList(ToDoItem item)
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

    [HttpDelete]
    public async Task<IActionResult> DeleteToDoList(int id)
    {
        var item = await _context.ToDoItems.FindAsync(id);
        if (item == null)
        {
            _logger.LogWarning($"ToDo with {id} not found !");
            return NotFound();
        }
        _context.ToDoItems.Remove(item);
        await _context.SaveChangesAsync();
        _logger.LogInformation($"Deleting ToDo item with {id}");
        return NoContent();
    }
}