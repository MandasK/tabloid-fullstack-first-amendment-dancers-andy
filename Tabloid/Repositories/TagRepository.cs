using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Xml.Linq;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class TagRepository : BaseRepository, ITagRepository
    {
        public TagRepository(IConfiguration configuration) : base(configuration) { }

        public List<Tag> GetAllTags()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT Id, [Name]
                                        FROM Tag";

                    var reader = cmd.ExecuteReader();

                    List<Tag> tags = new List<Tag>();

                    while (reader.Read())
                    {
                        var aTag = new Tag()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        };
                        tags.Add(aTag);
                    }

                    reader.Close();

                    return tags;
                }
            }
        }

        public Tag GetTagById(int Id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT Id, [Name]
                                        FROM Tag
                                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", Id);

                    var reader = cmd.ExecuteReader();

                    Tag tag = null;

                    if (reader.Read())
                    {
                        tag = new Tag
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }

                    reader.Close();

                    return tag;
                }
            }
        }

        public void AddTag(Tag tag)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO Tag
                                        ([Name])
                                        OUTPUT INSERTED.Id
                                        Values (@name)";
                    DbUtils.AddParameter(cmd, "@name", tag.Name);

                    tag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateTag(Tag tag)
        {
            using( var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        UPDATE Tag
                                        SET Name = @name
                                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", tag.Id);
                    DbUtils.AddParameter(cmd, "@name", tag.Name);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Delete(int Id)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using( var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        DELETE FROM PostTag
                                        WHERE TagId = @Id
                                        DELETE FROM Tag
                                        WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
