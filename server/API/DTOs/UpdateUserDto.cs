using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpdateUserDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string LastName { get; set; }
        public string DateOfBirthday { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string About { get; set; }
    }
}