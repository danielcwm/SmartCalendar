using System;
using System.Collections.Generic;
using System.Text;

namespace Smart_Calendar.Application.Dtos
{
    public class UserShiftDto
    {
        public int ShiftId { get; set; }
        public Guid UserId { get; set; }
        public string Day { get; set; }
    }
}
