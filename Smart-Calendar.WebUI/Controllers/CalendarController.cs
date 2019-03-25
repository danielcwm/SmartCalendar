using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Smart_Calendar.Application.Repositories;
using Smart_Calendar.Application.Dtos;
using Smart_Calendar.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Smart_Calendar.Domain.Enum;



namespace Smart_Calendar.WebUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarController : ControllerBase
    {
        private readonly IBaseRepo<User> _userRepo;
        private readonly IBaseRepo<UserShift> _userShiftRepo;
        private readonly IBaseRepo<Shift> _shiftRepo;
        private readonly IBaseRepo<Account> _accountRepo;
        private readonly IBaseRepo<LeaveRequest> _leaveReqRepo;

        public CalendarController(IBaseRepo<User> userRepo, IBaseRepo<UserShift> userShiftRepo, IBaseRepo<Shift> shiftRepo, IBaseRepo<Account> accountRepo,IBaseRepo<LeaveRequest> leavereqRepo)
        {
            _userRepo = userRepo;
            _userShiftRepo = userShiftRepo;
            _shiftRepo = shiftRepo;
            _accountRepo = accountRepo;
            _leaveReqRepo = leavereqRepo;
        }

        [HttpGet("User")]
        public async Task<IActionResult> GetUserList()
        {

            var results = await _userRepo.GetAllAsync(c => c.Department, c => c.Position, c => c.Account, c => c.UserShift);


            var userList = new List<UserVM>();

            foreach (var user in results)
            {
                var userShiftResults = _userShiftRepo.Get(u => u.UserId == user.UserId);
                var userShifts = new List<UserShiftVM>();
                foreach (var userShift in userShiftResults)
                {
                    Shift shiftResult = _shiftRepo.Get(s => s.ShiftId == userShift.ShiftId).FirstOrDefault();
                    var shift = new ShiftVM { ShiftId = shiftResult.ShiftId, TimeSlot = shiftResult.TimeSlot };
                    userShifts.Add(new UserShiftVM { UserShiftId = userShift.UserShiftId, UserId = userShift.UserId, Day = userShift.Day, ShiftId = userShift.ShiftId, Shift = shift });
                }
                userList.Add(new UserVM
                {
                    Id = user.UserId,
                    AccountId = user.AccountId,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Gender = user.Gender,
                    DepartmentId = user.DepartmentId,
                    Department = user.Department.Name,
                    PositionId = user.PositionId,
                    Position = user.Position.Name,
                    UserShifts = userShifts
                });
            }
            return Ok(userList);
        }


        [HttpGet("User/{id}")]
        public async Task<IActionResult> GetUserInfo(Guid id)
        {
            var user = _userRepo.Get(d => d.UserId == id).SingleOrDefault();
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost("User")]
        public async Task<IActionResult> AddUserInfo([FromBody]User user)
        {

            await _userRepo.CreateAsync(user);
            var usersInDb = await GetUserList(); 
            return Ok(usersInDb);
        }

        [HttpDelete("User/{id}")]
        public async Task<IActionResult> DeleteUserInfo(Guid id)
        {
            return Ok(await _userRepo.DeleteAsync(d => d.UserId == id));
        }

        [HttpGet("Account")]
        public async Task<IActionResult> GetUserAccountList()
        {
            var accounts = await _accountRepo.GetAllAsync();
            return Ok(accounts);
        }

        [HttpPost("UserShift")]
        public async Task<IActionResult> AddUserShift([FromBody]UserShift userShift)
        {
            await _userShiftRepo.CreateAsync(userShift);

            return Ok(userShift.UserShiftId);
        }

        [HttpDelete("UserShifts/{userId}")]
        public async Task<IActionResult> DeleteUserShift(Guid userId)
        {
            return Ok(await _userShiftRepo.DeleteAsync(d => d.UserId == userId));
        }

        [HttpPut("UserShift/{id}")]
        public async Task<IActionResult> UpdateUserShift([FromBody]UserShift userShift)
        {
            return Ok(await _userShiftRepo.UpdateAsync(userShift));
        }

        [HttpPost("UserShifts/{userId}")]
        public async Task<IActionResult> AddUserShifts([FromBody]List<UserShiftDto>userShifts)
        {

            foreach (var userShift in userShifts)
            {
                var newUserShift = new UserShift
                {
                    ShiftId = userShift.ShiftId,
                    UserId = userShift.UserId,
                    Day = userShift.Day
                };
                await _userShiftRepo.CreateAsync(newUserShift);
            }

            return Ok(await GetUserList());
        }
        [HttpGet("LeaveRequest")]
        public async Task<IActionResult> GetLeaveList()
        {
            var results = await _leaveReqRepo.GetAllAsync(u => u.LeaveRequestId, 
                u => u.StartDate,u => u.LeaveCategory.LeaveType,
                u => u.EndDate,u => u.IsApproved);
            var userresults = await _userRepo.GetAllAsync(u => u.Department,u =>u.FirstName);
            var leaveList = new List<LeaveReqVM>();

            var leaveresults = from leave in results
                               join user in userresults on leave.UserId equals user.UserId
                               select new {leave.LeaveRequestId,leave.StartDate,
                                   leave.EndDate,leave.IsApproved,leave.LeaveCategory.LeaveType,
                                   leave.LeaveCategory.LeaveCategoryId,user.UserId,
                                   user.FirstName,user.Department.Name };
            foreach ( var leaveinfo in leaveresults ) {
                leaveList.Add(new LeaveReqVM
                {
                    LeaveRequestId = leaveinfo.LeaveRequestId,
                    UserName = leaveinfo.FirstName,
                   //DepartmentId = leaveinfo.de
                   Dept = leaveinfo.Name,
                   Leavetype = leaveinfo.LeaveType,
                   LeaveCategoryId = leaveinfo.LeaveCategoryId,
                   StartDate = leaveinfo.StartDate,
                   EndDate = leaveinfo.EndDate,
                   Status = leaveinfo.IsApproved,
                   UserId = leaveinfo.UserId
                });
            }

            return Ok(leaveList);
        }
        [HttpDelete("LeaveRequest/{id}")]
        public async Task<IActionResult> DeleteLeaveInfo(int id)
        {
            return Ok(await _leaveReqRepo.DeleteAsync(d => d.LeaveRequestId == id));
        }
        [HttpPost("LeaveRequest")]
        public async Task<IActionResult> AddLeaveInfo([FromBody]LeaveRequest leave)
        {

            await _leaveReqRepo.CreateAsync(leave);
            var leavesInDb = await GetLeaveList();
            return Ok(leavesInDb);
        }
        [HttpPut("LeaveRequest")]
        public async Task<IActionResult> UpdateLeaveInfo([FromBody] List<LeaveRequest> leave)
        {
            foreach (var leavedata in leave)
            {
                var newleavedata = new LeaveRequest
                {
                    LeaveRequestId = leavedata.LeaveRequestId,
                    UserId = leavedata.UserId,
                    StartDate = leavedata.StartDate,
                    EndDate = leavedata.EndDate,
                    IsApproved = leavedata.IsApproved,
                    LeaveCategoryId = leavedata.LeaveCategoryId
                };
                
                await _leaveReqRepo.UpdateAsync(newleavedata);
            }
            return Ok(await GetLeaveList());
        }
    }

    public class UserVM
    {
        public Guid Id { get; set; }
        public Guid AccountId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public int DepartmentId { get; set; }
        public string Department { get; set; }
        public int PositionId { get; set; }
        public string Position { get; set; }
        public List<UserShiftVM> UserShifts { get; set; }
    }

    public class UserShiftVM
    {
        public int UserShiftId { get; set; }
        public int ShiftId { get; set; }
        public Guid UserId { get; set; }
        public string Day { get; set; }
        public ShiftVM Shift { get; set; }

    }

    public class ShiftVM
    {
        public int ShiftId { get; set; }
        public string TimeSlot { get; set; }
    }

    public class LeaveReqVM
    {
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public int DepartmentId { get; set; }
        public string Dept { get; set; }
        public string Leavetype { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public LeaveStatusEnum Status { get; set; }
        public User users { get; set; }
        public int LeaveRequestId { get; set; }
        public int LeaveCategoryId { get; set; }
       
    }

}