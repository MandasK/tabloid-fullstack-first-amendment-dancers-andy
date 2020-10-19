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
    [Authorize]
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

        [HttpGet("getAll/{subscriber}")]
        public IActionResult GetAll(int subscriber)
        {
            var subscriptions = _subscriptionRepository.GetAllUserSubscriptions(subscriber);
            if (subscriptions == null)
            {
                return NotFound();
            }
            return Ok(subscriptions);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var subscription = _subscriptionRepository.GetSubscriptionById(id);
            if (subscription == null)
            {
                return NotFound();
            }
            return Ok(subscription);
        }


        [HttpPost]
        public IActionResult Post(Subscription subscription)
        {
            _subscriptionRepository.Add(subscription);
            return CreatedAtAction("Get", new { id = subscription.Id }, subscription);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id)
        {
            //if (id != subscription.Id)
            //{
            //    return BadRequest();
            //}

            _subscriptionRepository.Unsubscribe(id);
            return Ok();
        }
    }
}
