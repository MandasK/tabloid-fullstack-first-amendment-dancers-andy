using System;
using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models
{
    public class Post
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        
        public string ImageLocation { get; set; }

        public DateTime CreateDateTime { get; set; }

        [Required]
        public DateTime? PublishDateTime { get; set; }

        public int IsApproved { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        public Category Category { get; set; }

    }
}
