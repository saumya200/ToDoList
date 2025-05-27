using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToDoListAPI.Migrations
{
    /// <inheritdoc />
    public partial class MakeUserIdNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDoItems_UserItems_UserId",
                table: "ToDoItems");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "ToDoItems",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoItems_UserItems_UserId",
                table: "ToDoItems",
                column: "UserId",
                principalTable: "UserItems",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDoItems_UserItems_UserId",
                table: "ToDoItems");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "ToDoItems",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoItems_UserItems_UserId",
                table: "ToDoItems",
                column: "UserId",
                principalTable: "UserItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
