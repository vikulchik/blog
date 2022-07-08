using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _userRepository.GetUsers();
            return Ok(users);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(UpdateUserDto updateUserDto)
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            var user = await _userRepository.GetUserByEmailAsync(email);

            _mapper.Map(updateUserDto, user);
            var isUpdated = await _userRepository.UpdateAsync(user);

            if (isUpdated) return NoContent();

            return BadRequest("Failed to update user");
        }
    }
}