using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreatePostDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Text { get; set; }
    }
}