using Smart_Calendar.Domain.Enum;
using System;

namespace Smart_Calendar.Domain.Entities
{
    
    public class LeaveRequest
    {
        public int LeaveRequestId { get; set; }

        public Guid UserId { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public LeaveStatusEnum IsApproved { get; set; }
        public int LeaveCategoryId { get; set; }

        public LeaveCategory LeaveCategory { get; set; }

        //public string IsApproved { get; set; }

    }
}
