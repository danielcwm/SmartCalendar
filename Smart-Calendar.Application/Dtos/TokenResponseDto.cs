using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using Smart_Calendar.Domain.Entities;

namespace Smart_Calendar.Application.Dtos
{
    public class TokenResponseDto
    {
        public string Token { get; set; }
        public HttpStatusCode Code { get; set; }
        public int RoleId { get; set; }
        public Guid AccountId { get; set; }
        public string Error { get; set; }
    }
}
