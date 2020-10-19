using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using Tabloid.Models;
using Tabloid.Repositories;

using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;

namespace Tabloid.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAllUsers());
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }
        [Authorize]
        [HttpGet("{id}/details")]
        public IActionResult GetById(int id)
        {
            var userProfile = _userProfileRepository.GetById(id);
            if(userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.UserTypeId = UserType.AUTHOR_ID;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }
       
        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile userProfile)
        {
            if (id != userProfile.Id)
            {
                return BadRequest();
            }
            _userProfileRepository.Update(userProfile);
            return Ok();
        }




        //[HttpPost]
        //public async Task<IActionResult> Login(string firebaseUserId)
        //{
        //    var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);

        //    if (userProfile == null)
        //    {
        //        return NotFound();
        //    }
        //    //Checks to see if the account has been deactivated
        //    else if (userProfile.UserTypeId == 3)
        //    {
        //        return RedirectToAction("Deactivated", "Account");
        //    }
        //    var claims = new List<Claim>
        //    {
        //        new Claim(ClaimTypes.NameIdentifier, userProfile.Id.ToString()),
        //        new Claim(ClaimTypes.Email, userProfile.Email),
        //    };

        //    //Adds Role to user credentials if the user is an Administrator. Admin role will show more menu options
        //    if (userProfile.UserTypeId == 1)
        //    {
        //        claims.Add(new Claim(ClaimTypes.Role, "Admin"));
        //    }

        //    var claimsIdentity = new ClaimsIdentity(
        //        claims, CookieAuthenticationDefaults.AuthenticationScheme);

        //    await HttpContext.SignInAsync(
        //        CookieAuthenticationDefaults.AuthenticationScheme,
        //        new ClaimsPrincipal(claimsIdentity));

        //    return Ok(userProfile);
        //}
    }
}
