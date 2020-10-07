using Microsoft.AspNetCore.Mvc;
using System;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepository;
        public TagController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tagRepository.GetAllTags());
        }

        [HttpGet("{Id}")]
        public IActionResult Get(int Id)
        {
            var tag = _tagRepository.GetTagById(Id);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }
    }
}
