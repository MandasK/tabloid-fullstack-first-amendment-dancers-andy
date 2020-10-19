using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Tabloid.Repositories;
using Tabloid.Models;
using Tabloid.Utils;
using Microsoft.Data.SqlClient;
using System.Web;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAllApprovedPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                         SELECT p.Id, p.Title, p.Content, p.ImageLocation, p.CreateDateTime,
                                         p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId,
                                         up.FirstName AS PosterFirstName, up.LastName AS PosterLastName,
                                         c.Name AS CategoryName
                                         FROM Post p
                                         LEFT JOIN UserProfile up on p.UserProfileId = up.Id
                                         LEFT JOIN Category c on p.CategoryId = c.Id
                                         WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME()
                                         ORDER BY PublishDateTime DESC;";

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                FirstName = DbUtils.GetString(reader, "PosterFirstName"),
                                LastName = DbUtils.GetString(reader, "PosterLastName")
                            },
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "CategoryName")

                            }
                        });
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public List<Post> GetAllUserPosts(int UPID)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                         SELECT p.Id, p.Title, p.Content, p.ImageLocation, p.CreateDateTime,
                                         p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId,
                                         up.FirstName AS PosterFirstName, up.LastName AS PosterLastName,
                                         c.Name AS CategoryName
                                         FROM Post p
                                         LEFT JOIN UserProfile up on p.UserProfileId = up.Id
                                         LEFT JOIN Category c on p.CategoryId = c.Id
                                         WHERE p.UserProfileId = @UPID
                                         ORDER BY PublishDateTime DESC;";

                    DbUtils.AddParameter(cmd, "@UPID", UPID);

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                FirstName = DbUtils.GetString(reader, "PosterFirstName"),
                                LastName = DbUtils.GetString(reader, "PosterLastName")
                            },
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "CategoryName")

                            }
                        });
                    }

                    reader.Close();

                    return posts;
                }
            }
        }


        public Post GetPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                         SELECT p.Id, p.Title, p.Content, p.ImageLocation, p.CreateDateTime,
                                         p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId,
                                         up.FirstName AS PosterFirstName, up.LastName AS PosterLastName, up.displayName,
                                         c.Name AS CategoryName
                                         FROM Post p
                                         LEFT JOIN UserProfile up on p.UserProfileId = up.Id
                                         LEFT JOIN Category c on p.CategoryId = c.Id
                                         WHERE p.Id = @Id;";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Post post = null;
                    if (reader.Read())
                    {
                        post = new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                FirstName = DbUtils.GetString(reader, "PosterFirstName"),
                                LastName = DbUtils.GetString(reader, "PosterLastName"),
                                DisplayName = DbUtils.GetString(reader, "displayName")
                            },
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "CategoryName")

                            }
                        };
                    }

                    reader.Close();

                    return post;
                }
            }
        }









        public void Add(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post (Title, Content, ImageLocation, CreateDateTime, 
                                          PublishDateTime, IsApproved, CategoryId, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@Title, @Content, @ImageLocation, GETDATE(), GETDATE(),
                                1, @CategoryId, @UserProfileId)";

                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@Content", post.Content);
                    DbUtils.AddParameter(cmd, "@ImageLocation", post.ImageLocation);
                    //DbUtils.AddParameter(cmd, "@CreateDateTime", post.CreateDateTime);
                    //DbUtils.AddParameter(cmd, "@PublishDateTime", DateTime.Now);
                    //DbUtils.AddParameter(cmd, "@IsApproved", true);
                    DbUtils.AddParameter(cmd, "@CategoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", post.UserProfileId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Post
                           SET Title = @Title,
                               Content = @Content,
                               ImageLocation = @ImageLocation,
                               CreateDateTime = @CreateDateTime,
                               PublishDateTime = @PublishDateTime,
                               IsApproved = @IsApproved,
                               CategoryId = @CategoryId,
                               UserProfileId = @UserProfileId
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@Content", post.Content);
                    DbUtils.AddParameter(cmd, "@ImageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", post.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@PublishDateTime", post.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@IsApproved", post.IsApproved);
                    DbUtils.AddParameter(cmd, "@CategoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", post.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Id", post.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        

        public void DeletePost(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        DELETE FROM Comment
                                        WHERE PostId = @id;
                                        DELETE FROM PostTag 
                                        WHERE PostId = @id;
                                        DELETE FROM Post
                                        WHERE Id = @id;";

                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        //Get {n} random posts that aren't the users (currently set to 3)
        //This will get 3 random posts if the user has no current subscriptions
        public List<Post> GetRandomPosts(int numberOfPosts, int block)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                         SELECT TOP 3 p.Id, p.Title, p.Content, p.ImageLocation, p.CreateDateTime,
                                         p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId,
                                         up.FirstName AS PosterFirstName, up.LastName AS PosterLastName,
                                         c.Name AS CategoryName
                                         FROM Post p
                                         LEFT JOIN UserProfile up on p.UserProfileId = up.Id
                                         LEFT JOIN Category c on p.CategoryId = c.Id
                                         WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME() AND p.UserProfileId != @block
                                         ORDER BY newid()";
                    DbUtils.AddParameter(cmd, "@numberOfPosts", numberOfPosts);
                    DbUtils.AddParameter(cmd, "@block", block);

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                FirstName = DbUtils.GetString(reader, "PosterFirstName"),
                                LastName = DbUtils.GetString(reader, "PosterLastName")
                            },
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "CategoryName")

                            }
                        });
                    }

                    reader.Close();

                    return posts;
                }                             
            }
        }
        //This gets a list of posts using the User Profile ids sent in a query string ordered by Published DateTime. 
        //Including a value for num will change this to getting {num} random posts from the ids in the query string
        public List<Post> GetRecommendedPosts(string q, int block, int? num)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    //Make an iterable list of the the query string q
                    string[] subscribees = q.Split(",");
                    //Build the text of subsribee @ parameters for the Sql 'IN' list using the iterable query string
                    string subscriberlist = "";
                    for (int i = 0; i<subscribees.Length; i++)
                    {
                        int aSubscribee;
                        //Catch any attempt to pass in a non-int
                        try
                        {
                            int.TryParse(subscribees[i], out aSubscribee);
                        }
                        catch
                        {
                            return null;
                        }
                        //Add the Sql '@' to the 'In' chain for this index of the query string 
                        string subscribee = "@subscribee" + i;
                        subscriberlist += subscribee;
                        //Add a comma between the statement if its not the last one in the list
                        if (i != subscribees.Length - 1)
                        {
                            subscriberlist += ", ";
                        }

                        //Tie this Id value to the command text as it is being built
                        DbUtils.AddParameter(cmd, subscribee, aSubscribee);
                    }

                    //If num is null Set the Sql command text to a generic SELECT, and order by Date
                    string selectStart = "SELECT ";
                    string selectEnd = ") ORDER BY PublishDateTime DESC";
                    if (num != null)
                    {
                        selectStart = "SELECT TOP " + num;
                        selectEnd = ") ORDER BY newid()";
                    }
                    cmd.CommandText =   selectStart 
                                            + 
                                        @"
                                         p.Id, p.Title, p.Content, p.ImageLocation, p.CreateDateTime,
                                         p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId,
                                         up.FirstName AS PosterFirstName, up.LastName AS PosterLastName,
                                         c.Name AS CategoryName
                                         FROM Post p
                                         LEFT JOIN UserProfile up on p.UserProfileId = up.Id
                                         LEFT JOIN Category c on p.CategoryId = c.Id
                                         WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME() AND p.UserProfileId != @block
                                         AND p.UserProfileId IN ( "
                                            +
                                              subscriberlist
                                            +
                                              selectEnd;

                    //Block the user from seeing their own posts in the 'recommended' result set
                    DbUtils.AddParameter(cmd, "@block", block);

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                FirstName = DbUtils.GetString(reader, "PosterFirstName"),
                                LastName = DbUtils.GetString(reader, "PosterLastName")
                            },
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "CategoryName")

                            }
                        });
                    }

                    reader.Close();

                    return posts;
                }
            }
        }
        //Search for posts by their tag(s)
        public List<Post> SearchByTag(int tagId)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    
                                        ";
                            
                }
            }
        }
    }
}