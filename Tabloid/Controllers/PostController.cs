using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public PostController(IPostRepository postRepository, IUserProfileRepository userProfileRepository)
        {
            _postRepository = postRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAllApprovedPosts());
        }
        //Get {n} posts from random users, blocking the userId provided in {block} -PM 
        [HttpGet("{numberOfPosts}/{block}")]
        public IActionResult Get(int numberOfPosts, int block)
        {
            return Ok(_postRepository.GetRandomPosts(numberOfPosts, block));
        }
        //GET all subsribee posts (ids listed in 'q') ordered by most recent,
        //OR if a value is provided as 'num'
        //GET {num} random posts - PM
        [HttpGet("subscribe")]
        public IActionResult Recommended(string q, int block, int? num = null)
        {
            return Ok(_postRepository.GetRecommendedPosts(q, block, num));
        }

        [HttpGet("GetAllUserPosts/{id}")]
        public IActionResult GetAllUserPosts(int id)
        {
            return Ok(_postRepository.GetAllUserPosts(id));
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetPostById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpPost]
        public IActionResult Post(Post post)
        {
            var currentUserProfile = GetCurrentUserProfile();
            post.UserProfileId = currentUserProfile.Id;
            _postRepository.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var postFromDB = _postRepository.GetPostById(id);
            if (postFromDB.UserProfileId == currentUserProfile.Id)
            {
                if (id != post.Id)
                {
                    return BadRequest();
                }
                post.UserProfileId = postFromDB.UserProfileId;
                post.CreateDateTime = postFromDB.CreateDateTime;
                post.PublishDateTime = postFromDB.PublishDateTime;
                post.IsApproved = postFromDB.IsApproved;
                _postRepository.Update(post);

                return Ok();
            }
            else
            {
                return Unauthorized();
            }
            
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var post = _postRepository.GetPostById(id);
            
            if (post.UserProfileId == currentUserProfile.Id || currentUserProfile.UserTypeId == 1)
            {
                _postRepository.DeletePost(id);
                return NoContent();
            }
            
             else
            {
                return Unauthorized();
            }
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
