using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepo;
        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepo = categoryRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoryRepo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var category = _categoryRepo.GetCategoryById(id);
            if(category == null || category.Id == 10)
            {
                return NotFound();
            }
            return Ok(category);
        }

        [HttpPost]
        public IActionResult Post(Category category)
        {
            _categoryRepo.AddCategory(category);
            return CreatedAtAction(nameof(Get), new { id = category.Id }, category);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var category = _categoryRepo.GetCategoryById(id);
            if (id == 10 || id != category.Id)
            {
                return BadRequest();
            }
            _categoryRepo.DeleteCategory(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Category category)
        {
            if (id == 10 || id != category.Id)
            {
                return BadRequest();
            }
            _categoryRepo.UpdateCategory(category);
            return NoContent();
        }
           
    }
}
