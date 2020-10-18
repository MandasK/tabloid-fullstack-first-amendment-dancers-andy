using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ISubscriptionRepository
    {
        void Add(Subscription subscription);
        List<Subscription> GetReleventSubscriptions(int subscriber, int provider);
        void Unsubscribe(int id);
    }
}