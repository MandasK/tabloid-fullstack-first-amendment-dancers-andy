using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
   // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController: ControllerBase
    {
        private readonly ISubscriptionRepository _subscriptionRepository;
        public SubscriptionController(ISubscriptionRepository subscriptionRepository)
        {
            _subscriptionRepository = subscriptionRepository;
        }

        [HttpGet("{subscriber}/{provider}")]
        public IActionResult Get(int subscriber, int provider)
        {
            var subscriptions = _subscriptionRepository.GetReleventSubscriptions(subscriber, provider);
            if (subscriptions == null)
            {
                return NotFound();
            }
            return Ok(subscriptions);
        }


        [HttpPost]
        public IActionResult Post(Subscription subscription)
        {
            _subscriptionRepository.Add(subscription);
            return Ok();
        }
    }
}
