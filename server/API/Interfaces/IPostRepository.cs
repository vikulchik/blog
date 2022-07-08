using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IPostRepository
    {
        Task<Post> GetByIdAsync(int id);
        Task<bool> CreateAsync(string email, Post post);
        Task<bool> UpdateAsync(Post post);
        // Task DeleteByIdAsync(int id);
        Task<IEnumerable<Post>> GetAll();
    }
}