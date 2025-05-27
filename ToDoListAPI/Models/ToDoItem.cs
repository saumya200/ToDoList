using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ToDoListApi.Models
{
    public class ToDoItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }
        public bool IsComplete { get; set; } = false;
        public string Priority { get; set; } = "Low";
        public DateTime? DeletedAt { get; set; }

        [ForeignKey("UserItem")]
        public int? UserId { get; set; }

        // [JsonIgnore]
        // public UserItem? UserItem { get; set; }

    }

    public class UserItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
        // public ICollection<ToDoItem> ToDoItems { get; set; }
    }


}