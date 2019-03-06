using System;

namespace Smart_Calendar.Domain.Entities
{
    public class UserShift
    {
        public int UserShiftId { get; set; }
        public int ShiftId { get; set; }
        public Guid UserId { get; set; }
        public string Day { get; set; }

        public Shift Shift { get; set; }
        public User User { get; set; }
    }
}
