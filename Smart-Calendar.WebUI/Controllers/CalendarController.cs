using Microsoft.AspNetCore.Mvc;
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
        private readonly IBaseRepo<Department> _departmentRepo;
        private readonly IBaseRepo<Position> _positionRepo;
        private readonly IBaseRepo<UserShift> _userShiftRepo;
        private readonly IBaseRepo<Shift> _shiftRepo;
        private readonly IBaseRepo<Account> _accountRepo;
        private readonly IBaseRepo<LeaveRequest> _leaveReqRepo;

        public CalendarController(
            IBaseRepo<User> userRepo,
            IBaseRepo<Department> departmentRepo,
            IBaseRepo<Position> positionRepo,
            IBaseRepo<UserShift> userShiftRepo, 
            IBaseRepo<Shift> shiftRepo, 
            IBaseRepo<Account> accountRepo, 
            IBaseRepo<LeaveRequest> leavereqRepo)
        {
            _userRepo = userRepo;
            _departmentRepo = departmentRepo;
            _positionRepo = positionRepo;
            _userShiftRepo = userShiftRepo;
            _shiftRepo = shiftRepo;
            _accountRepo = accountRepo;
            _leaveReqRepo = leavereqRepo;
        }

        [HttpGet("User")]
        public async Task<IActionResult> GetUserList()
        {
            var results = await _userRepo.GetAllAsync();
            var userList = new List<UserVM>();
            foreach (var user in results) {
                var deptResults = await _departmentRepo.GetAsync(d => d.DepartmentId == user.DepartmentId);
                var posResults = await _positionRepo.GetAsync(p => p.PositionId == user.PositionId);
                var accountResults = await _accountRepo.GetAsync(a => a.AccountId == user.AccountId);

                var userShiftResults = await _userShiftRepo.GetAsync(u => u.UserId == user.UserId);
                var userShifts = new List<UserShiftVM>();
                foreach (var userShift in userShiftResults)
                {
                    var shiftResults = await _shiftRepo.GetAsync(s => s.ShiftId == userShift.ShiftId);
                    var shiftResult = shiftResults.FirstOrDefault();
                    var shift = new ShiftVM { ShiftId = shiftResult.ShiftId, TimeSlot = shiftResult.TimeSlot };
                    userShifts.Add(new UserShiftVM { UserShiftId = userShift.UserShiftId, UserId = userShift.UserId, Day = userShift.Day, ShiftId = userShift.ShiftId, Shift = shift });
                }
                userList.Add(new UserVM
                {
                    Id = user.UserId,
                    AccountId = user.AccountId,
                    Email = accountResults.FirstOrDefault().Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Gender = user.Gender,
                    DepartmentId = user.DepartmentId,
                    Department = deptResults.FirstOrDefault().Name,
                    PositionId = user.PositionId,
                    Position = posResults.FirstOrDefault().Name,
                    UserShifts = userShifts
                });

            }
            return Ok(userList);
        }

        [HttpGet("User/{id}")]
        public async Task<IActionResult> GetUserInfo(Guid id)
        {
            List<User> users = await _userRepo.GetAsync(d => d.AccountId == id);
            var user = users.FirstOrDefault();
            return Ok(user);
        }

        [HttpPost("User")]
        public async Task<IActionResult> AddUserInfo([FromBody]User user)
        {

            await _userRepo.CreateAsync(user);
            var usersInDb = await GetUserList();
            return Ok(usersInDb);
        }

        [HttpPut("User/{userId}")]
        public async Task<IActionResult> UpdateUserShift([FromBody]UpdateUserDto updatedUser)
        {
            var newUser = new User
            {
                UserId = updatedUser.UserId,
                AccountId = updatedUser.AccountId,
                FirstName = updatedUser.FirstName,
                LastName = updatedUser.LastName,
                Gender = updatedUser.Gender,
                DepartmentId = updatedUser.DepartmentId,
                PositionId = updatedUser.PositionId
            };
            await _userShiftRepo.DeleteAsync(d => d.UserId == updatedUser.UserId);

            await _userRepo.UpdateAsync(newUser);

            if (updatedUser.UserShifts.Count > 0)
            {
                foreach (var userShift in updatedUser.UserShifts)
                {
                    var newUserShift = new UserShift
                    {
                        ShiftId = userShift.ShiftId,
                        UserId = userShift.UserId,
                        Day = userShift.Day
                    };
                    await _userShiftRepo.CreateAsync(newUserShift);
                }
            }
            return Ok(await GetUserList());
        }

        [HttpPut("UserPartial/{userId}")]
        public async Task<IActionResult> UpdateUserPartial([FromBody]UpdateUserPartialDto updatedUser)
        {
            var user = new User
            {
                UserId = updatedUser.UserId,
                AccountId = updatedUser.AccountId,
                FirstName = updatedUser.FirstName,
                LastName = updatedUser.LastName,
                Gender = updatedUser.Gender,
                DepartmentId = updatedUser.DepartmentId,
                PositionId = updatedUser.PositionId
            };

            await _userRepo.UpdateAsync(user);

            return Ok(await GetUserList());
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

        [HttpGet("LeaveRequest")]
        public async Task<IActionResult> GetLeaveList()
        {
            var results = await _leaveReqRepo.GetAllAsync(u => u.LeaveRequestId,
                u => u.StartDate, u => u.LeaveCategory.LeaveType,
                u => u.EndDate, u => u.IsApproved);
            var userresults = await _userRepo.GetAllAsync(u => u.Department, u => u.FirstName);
            var leaveList = new List<LeaveReqVM>();

            var leaveresults = from leave in results
                               join user in userresults on leave.UserId equals user.UserId
                               select new
                               {
                                   leave.LeaveRequestId,
                                   leave.StartDate,
                                   leave.EndDate,
                                   leave.IsApproved,
                                   leave.LeaveCategory.LeaveType,
                                   leave.LeaveCategory.LeaveCategoryId,
                                   user.UserId,
                                   user.FirstName,
                                   user.Department.Name
                               };
            foreach (var leaveinfo in leaveresults)
            {
                leaveList.Add(new LeaveReqVM
                {
                    LeaveRequestId = leaveinfo.LeaveRequestId,
                    UserName = leaveinfo.FirstName,
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
        public string Email { get; set; }
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