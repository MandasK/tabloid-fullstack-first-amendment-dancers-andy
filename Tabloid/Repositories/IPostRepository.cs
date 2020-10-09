using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        void Delete(int id);
        List<Post> GetAllApprovedPosts();
        List<Post> GetAllUserPosts(int UPID);
        Post GetPostById(int id);
        void Update(Post post);
    }
}