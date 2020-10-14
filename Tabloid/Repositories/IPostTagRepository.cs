using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostTagRepository
    {
        void AddPostTag(PostTag postTag);
        PostTag CheckIfExists(PostTag postTag);
        void Delete(int tagId, int postId);
        List<PostTag> GetPostTags(int postId);
    }
}