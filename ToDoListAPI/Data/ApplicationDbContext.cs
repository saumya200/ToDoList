using System.Diagnostics;
using System.Net.Security;
using System.Runtime.InteropServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using ToDoListApi.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<ToDoItem> ToDoItems { get; set; }
    public DbSet<UserItem> UserItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Global query filter to exclude soft-deleted items
        modelBuilder.Entity<ToDoItem>()
                    .HasQueryFilter(t => t.DeletedAt == null);

        base.OnModelCreating(modelBuilder);
    }
}

