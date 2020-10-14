using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostTagController : ControllerBase
    {
        private readonly IPostTagRepository _postTagRepository;
        public PostTagController(IPostTagRepository postTagRepository)
        {
            _postTagRepository = postTagRepository;
        }
        //Get by the Id of the post
        [HttpGet("{id}")]

        public IActionResult PostTag(int id)
        {
            List<PostTag> postTags =_postTagRepository.GetPostTags(id);

            if (postTags == null)
            {
                return NotFound();
            }
            return Ok(postTags);
        }

        [HttpPost]
        public IActionResult AddTagToPost (PostTag postTag)
        {
            PostTag tagCheck = _postTagRepository.CheckIfExists(postTag);
            if (tagCheck == null) { 
                    _postTagRepository.AddPostTag(postTag);            
                    return Ok();
                }
            return Ok();
        }

        [HttpDelete("{tagId}/{postId}")]
        public IActionResult Delete(int tagId, int postId)
        {
            _postTagRepository.Delete(tagId, postId);
            return NoContent();
        }


    }
}
