
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Repositories;
using Tabloid.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860





namespace Tabloid.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly ICommentRepository _commentRepository;
        public CommentController(ICommentRepository commentRepository,
            IUserProfileRepository userProfileRepository)
        {
            _commentRepository = commentRepository;
            _userProfileRepository = userProfileRepository;
        }
        // GET: api/<CommentController>

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_commentRepository.GetAllComments());
        }

        // GET api/<CommentController>/5
        [HttpGet("{id}")]
        public IActionResult GetCommentById(int id)
        {
            return Ok(_commentRepository.GetCommentById(id));
        }

        [HttpGet("GetCommentsByPostId/{id}")]
        public IActionResult GetCommentsByPostId(int id)
        {
            return Ok(_commentRepository.GetCommentsByPostId(id));
        }


        // POST api/<CommentController>
        [HttpPost]
        public IActionResult Add(Comment comment)
        {
            var currentUserProfile = GetCurrentUserProfile();
            if (currentUserProfile == null)
            {
                return Unauthorized();
            }
            _commentRepository.Add(comment);
            return base.Created("", comment); //returns the comment, not including headers
        }

        // PUT api/<CommentController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Comment comment)
        {
            var currentUserProfile = GetCurrentUserProfile();
            if (currentUserProfile.Id != _commentRepository.GetCommentById(id).UserProfileId)
            {
                return Unauthorized();
            }
            if (id != comment.Id)
            {
                return BadRequest();
            }
            _commentRepository.Update(comment);
            return Ok();
        }

        // DELETE api/<CommentController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            if (currentUserProfile.Id != _commentRepository.GetCommentById(id).UserProfileId || currentUserProfile.UserTypeId != 1)
            {
                return Unauthorized();
            }

            _commentRepository.Delete(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
