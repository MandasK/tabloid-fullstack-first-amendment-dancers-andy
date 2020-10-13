using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Xml.Linq;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostTagRepository : BaseRepository, IPostTagRepository
    {
        public PostTagRepository(IConfiguration configuration) : base(configuration) { }

        public List<PostTag> GetPostTags(int postId)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using( var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT pt.id, t.name, t.tagId, pt.postId from PostTag pt
                                        JOIN Tag t on t.id = pt.TagId
                                        WHERE pt.PostId = @id 
                                        ";
                    DbUtils.AddParameter(cmd, "@id", postId);

                    var reader = cmd.ExecuteReader();
                    List<PostTag> postTags = new List<PostTag>();
                    while(reader.Read())
                    {
                        var postTag = new PostTag()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            Postid = DbUtils.GetInt(reader, "postId"),
                            TagId = DbUtils.GetInt(reader, "tagId"),
                            tagName = DbUtils.GetString(reader, "name")
                        };
                        postTags.Add(postTag);
                    }

                    reader.Close();

                    return postTags;
                }

            }
        }
    }
}
