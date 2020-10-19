using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        void DeletePost(int id);
        List<Post> GetAllApprovedPosts();
        List<Post> GetAllUserPosts(int UPID);
        Post GetPostById(int id);
        List<Post> GetRandomPosts(int numberOfPosts, int block);
        List<Post> GetRecommendedPosts(string q, int block, int? num);
        void Update(Post post);
    }
}