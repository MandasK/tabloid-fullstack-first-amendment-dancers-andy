using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;


namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IWebHostEnvironment _webhost;
        public ImageController(IWebHostEnvironment webhost)
        {
            _webhost = webhost;
        }

        [HttpPost]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            //where images are stored
            var savedImagePath = Path.Combine(_webhost.WebRootPath, "images", file.FileName);

            if(file.Length > 0)
            {
                using (var stream = new FileStream(savedImagePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }
            else
            {
                return BadRequest();
            }
            return Ok();
        }

        [HttpGet("{imageUrl}")]
        public IActionResult Get(string imageUrl)
        {
            var path = Path.Combine(_webhost.WebRootPath, "images", imageUrl);
            var imageFileStream = System.IO.File.OpenRead(path);
            return File(imageFileStream, "image/jpeg");
        }
    }
}
