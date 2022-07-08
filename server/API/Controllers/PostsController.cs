using System.Security.Claims;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PostsController : BaseApiController
    {
        private readonly IPostRepository _postRepository;
        private readonly IMapper _mapper;
        public PostsController(IPostRepository postRepository, IMapper mapper)
        {
            _mapper = mapper;
            _postRepository = postRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetAllPosts()
        {
            var results = await _postRepository.GetAll();
            return Ok(results);
        }

        [HttpPost]
        public async Task<ActionResult<bool>> CreatePost(CreatePostDto createPostDto)
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            if (email == null) {
                return BadRequest("You are not logged in");
            }

            var post = new Post
            {
                UserEmail = email
            };

            _mapper.Map<CreatePostDto, Post>(createPostDto, post);
            return await _postRepository.CreateAsync(email, post);
        }

        [HttpPut]
        public async Task<ActionResult<bool>> UpdatePost(UpdatePostDto updatePostDto)
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            if (email == null) {
                return BadRequest("You are not logged in");
            }
            
            var post = await _postRepository.GetByIdAsync(updatePostDto.Id);
            _mapper.Map<UpdatePostDto, Post>(updatePostDto, post);
            return await _postRepository.UpdateAsync(post);
        }
    }
}