using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpdatePostDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
    }
}