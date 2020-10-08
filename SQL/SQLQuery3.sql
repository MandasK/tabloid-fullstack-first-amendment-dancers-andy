SELECT * FROM Post

SELECT p.Id, p.Title, p.Content, p.ImageLocation, p.CreateDateTime,
p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId,
up.FirstName AS PosterFirstName, up.LastName AS PosterLastName,
c.Name AS CategoryName
FROM Post p
LEFT JOIN UserProfile up on p.UserProfileId = up.Id
LEFT JOIN Category c on p.CategoryId = c.Id;
