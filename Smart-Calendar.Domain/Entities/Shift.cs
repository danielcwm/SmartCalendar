using System;
using System.Collections.Generic;

namespace Smart_Calendar.Domain.Entities
{
    public class Shift
    {
        public int ShiftId { get; set; }

        public string TimeSlot { get; set; }

        public ICollection<UserShift> UserShift { get; set; }

    }
}
