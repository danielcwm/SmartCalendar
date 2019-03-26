using System;
using System.Collections.Generic;
using System.Text;
using Smart_Calendar.Domain.Entities;

namespace Smart_Calendar.Application.Dtos
{
    public class UpdateUserPartialDto
    {
        public Guid UserId { get; set; }
        public Guid AccountId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public int DepartmentId { get; set; }
        public int PositionId { get; set; }
    }
}
