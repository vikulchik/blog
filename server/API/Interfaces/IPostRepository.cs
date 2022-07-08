using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IPostRepository
    {
        Task<Post> GetByIdAsync(int id);
        Task CreateAsync(Post post);
        void Update(Post post);
        Task DeleteByIdAsync(int id);
        Task<IEnumerable<Post>> GetAll();
    }
}