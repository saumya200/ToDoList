using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToDoListAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddDeletedAtToToDoItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "ToDoItems");

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "ToDoItems",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeletedAt",
                table: "ToDoItems");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "ToDoItems",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
