using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        List<UserProfile> GetAllUsers();
        UserProfile GetByFirebaseUserId(string firebaseUserId);
    }
}