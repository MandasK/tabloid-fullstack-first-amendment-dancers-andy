using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        [HttpPost]
        public IActionResult Upload(IFormFile file)
        {
            //where images are stored
            string savedImagePath = "client/public/images/posts/";

            try
            {
                using var image = Image.Load(file.OpenReadStream());

                image.Save(savedImagePath + file.FileName);
            }
            catch
            {
                return Conflict();
            }

            return Ok();
            
        }
    }
}
