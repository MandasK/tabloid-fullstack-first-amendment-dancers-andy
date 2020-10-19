﻿using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Tabloid.Repositories;
using Tabloid.Models;
using Tabloid.Utils;
using Microsoft.Data.SqlClient;

namespace Tabloid.Repositories
{
    public class SubscriptionRepository : BaseRepository, ISubscriptionRepository
    {
        public SubscriptionRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(Subscription subscription)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Subscription (SubscriberUserProfileId, ProviderUserProfileId, BeginDateTime, EndDateTime)
                        OUTPUT INSERTED.ID
                        VALUES (@SubscriberUserProfileId, @ProviderUserProfileId, GETDATE(), NULL);";

                    DbUtils.AddParameter(cmd, "@SubscriberUserProfileId", subscription.SubscriberUserProfileId);
                    DbUtils.AddParameter(cmd, "@ProviderUserProfileId", subscription.ProviderUserProfileId);

                    subscription.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<Subscription> GetReleventSubscriptions(int subscriber, int provider)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                         SELECT Id, SubscriberUserProfileId, ProviderUserProfileId, BeginDateTime, EndDateTime 
                                         FROM Subscription
                                         WHERE SubscriberUserProfileId = @subscriber AND ProviderUserProfileId = @provider
                                         ORDER BY BeginDateTime;";
                    DbUtils.AddParameter(cmd, "@subscriber", subscriber);
                    DbUtils.AddParameter(cmd, "@provider", provider);

                    var reader = cmd.ExecuteReader();

                    var subscriptions = new List<Subscription>();
                    while (reader.Read())
                    {
                        subscriptions.Add(new Subscription()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            SubscriberUserProfileId = DbUtils.GetInt(reader, "SubscriberUserProfileId"),
                            ProviderUserProfileId = DbUtils.GetInt(reader, "ProviderUserProfileId"),
                            BeginDateTime = DbUtils.GetDateTime(reader, "BeginDateTime"),
                            EndDateTime = DbUtils.GetNullableDateTime(reader, "EndDateTime")
                        });
                    }

                    reader.Close();

                    return subscriptions;
                }
            }
        }


        public List<Subscription> GetAllUserSubscriptions(int subscriber)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                         SELECT Id, SubscriberUserProfileId, ProviderUserProfileId, BeginDateTime, EndDateTime 
                                         FROM Subscription
                                         WHERE SubscriberUserProfileId = @subscriber AND EndDateTime is Null
                                         ORDER BY BeginDateTime;";
                    DbUtils.AddParameter(cmd, "@subscriber", subscriber);

                    var reader = cmd.ExecuteReader();

                    var subscriptions = new List<Subscription>();
                    while (reader.Read())
                    {
                        subscriptions.Add(new Subscription()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            SubscriberUserProfileId = DbUtils.GetInt(reader, "SubscriberUserProfileId"),
                            ProviderUserProfileId = DbUtils.GetInt(reader, "ProviderUserProfileId"),
                            BeginDateTime = DbUtils.GetDateTime(reader, "BeginDateTime"),
                            EndDateTime = DbUtils.GetNullableDateTime(reader, "EndDateTime")
                        });
                    }

                    reader.Close();

                    return subscriptions;
                }
            }
        }

        public void Unsubscribe(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    
                    cmd.CommandText = @"
                        UPDATE Subscription
                           SET EndDateTime = GETDATE()
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Subscription GetSubscriptionById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                         SELECT Id, SubscriberUserProfileId, ProviderUserProfileId, BeginDateTime, EndDateTime 
                                         FROM Subscription
                                         WHERE Id = @Id;";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Subscription subscription = null;
                    if (reader.Read())
                    {
                        subscription = new Subscription()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            SubscriberUserProfileId = DbUtils.GetInt(reader, "SubscriberUserProfileId"),
                            ProviderUserProfileId = DbUtils.GetInt(reader, "ProviderUserProfileId"),
                            BeginDateTime = DbUtils.GetDateTime(reader, "BeginDateTime"),
                            EndDateTime = DbUtils.GetNullableDateTime(reader, "EndDateTime")

                        };
                    }

                    reader.Close();

                    return subscription;
                }
            }
        }



    }
}