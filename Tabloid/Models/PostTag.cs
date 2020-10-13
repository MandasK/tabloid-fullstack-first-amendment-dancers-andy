using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabloid.Models
{
    public class PostTag
    {
        public int id { get; set; }
        public int Postid { get; set; }
        public int TagId { get; set; }
        public string tagName { get; set; }
    }
}
