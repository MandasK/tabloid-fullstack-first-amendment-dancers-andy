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
                                        SELECT pt.id, t.name, pt.TagId, pt.postId from PostTag pt
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
                            name = DbUtils.GetString(reader, "name")
                        };
                        postTags.Add(postTag);
                    }

                    reader.Close();

                    return postTags;
                }

            }
        }

        public PostTag CheckIfExists(PostTag postTag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT pt.id, t.name, pt.TagId, pt.postId from PostTag pt
                                        JOIN Tag t on t.id = pt.TagId
                                        WHERE pt.PostId = @PostId AND pt.TagId = @TagId
                                        ";
                    DbUtils.AddParameter(cmd, "@PostId", postTag.Postid);
                    DbUtils.AddParameter(cmd, "@TagId", postTag.TagId);

                    var reader = cmd.ExecuteReader();
                    PostTag apostTag = null;
                     if (reader.Read())
                    {
                        apostTag = new PostTag()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            Postid = DbUtils.GetInt(reader, "postId"),
                            TagId = DbUtils.GetInt(reader, "tagId"),
                            name = DbUtils.GetString(reader, "name")
                        };
                        
                    }

                    reader.Close();

                    return apostTag;
                }

            }
        }
        public void AddPostTag (PostTag postTag)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO PostTag
                                        (PostId, TagId)
                                        OUTPUT Inserted.Id
                                        Values(@PostId, @TagId)
                                        ";
                    DbUtils.AddParameter(cmd, "@PostId", postTag.Postid);
                    DbUtils.AddParameter(cmd, "@TagId", postTag.TagId);

                    postTag.id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete (int tagId, int postId)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        DELETE FROM PostTag
                                        WHERE PostId = @postId AND TagId = @tagId
                                        ";
                    DbUtils.AddParameter(cmd, "@tagId", tagId);
                    DbUtils.AddParameter(cmd, "@postId", postId);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
