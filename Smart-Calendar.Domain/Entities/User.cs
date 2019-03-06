using System;
using System.Collections.Generic;

namespace Smart_Calendar.Domain.Entities
{
    public class User
    {
        public Guid UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }

        public Guid AccountId { get; set; }
        public int DepartmentId { get; set; }
        public int PositionId { get; set; }

        public Department Department { get; set; }
        public Position Position { get; set; }
        public Account Account { get; set; }
        public ICollection<UserShift> UserShift { get; set; }
        public ICollection<LeaveRequest> LeaveRequests { get; set; }
    }
}
