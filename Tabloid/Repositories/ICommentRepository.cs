using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICommentRepository
    {
        void Add(Comment comment);
        void Delete(int id);
        List<Comment> GetAllComments();
        List<Comment> GetCommentsByPostId(int commentId);

        Comment GetCommentById(int commentId);
        void Update(Comment comment);
    }
}