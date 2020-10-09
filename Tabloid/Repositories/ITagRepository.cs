using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        void AddTag(Tag tag);
        void Delete(int Id);
        List<Tag> GetAllTags();
        Tag GetTagById(int Id);
        void UpdateTag(Tag tag);
    }
}