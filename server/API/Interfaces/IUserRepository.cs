using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUserByEmailAsync(string email);
        Task CreateUserAsync(User user);
        Task<bool> IsUserExist(string email);
        Task<IEnumerable<User>> GetUsers();
    }
}