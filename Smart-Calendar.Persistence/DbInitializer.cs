using Smart_Calendar.Domain.Entities;
using Smart_Calendar.Domain.Enum;
using System;
using System.Linq;

namespace Smart_Calendar.Persistence
{
    public class DbInitializer
    {
        public static void Initialize(SmartCalendarDbContext context)
        {
            var initializer = new DbInitializer();
            initializer.SeedAllData(context);
        }

        public void SeedAllData(SmartCalendarDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Accounts.Any())
            {
                return;
            }
            SeedRole(context);
            SeedDepartment(context);
            SeedPosition(context);
            SeedLeaveCategory(context);
            SeedAccount(context);
            SeedUser(context);      
            SeedShift(context);
            SeedUserShift(context);
            SeedLeaveRequest(context);
        }
        private void SeedUserShift(SmartCalendarDbContext context)
        {
            var shift = new[]
            {
                new UserShift {UserId= new Guid("43f0fdea-2b4c-4af7-8389-f442deccef73"), ShiftId = 1, Day= "Monday"},
                new UserShift { UserId= new Guid("cb20b05f-0f53-4eea-9b92-2a2ccbd7468b"),ShiftId =2, Day= "Tuesday"},
                new UserShift { UserId= new Guid("c45d233c-a3b4-42b1-a91a-0d044a35c0f2"),ShiftId = 3, Day= "Wednesday"},
                new UserShift { UserId= new Guid("75840aef-451c-4f0e-ae80-bcd9d7897387"),ShiftId = 1, Day= "Thursday"},
            };

            context.UserShifts.AddRange(shift);

            context.SaveChanges();
        }
        private void SeedLeaveRequest(SmartCalendarDbContext context)
        {
            var request = new[]
            {
                new LeaveRequest {UserId= new Guid("43f0fdea-2b4c-4af7-8389-f442deccef73"), LeaveCategoryId= (int)LeaveTypeEunm.Sick, StartDate = DateTime.Parse("1 Feb, 2019"), EndDate= DateTime.Parse("2 Feb, 2019")},
                new LeaveRequest { UserId= new Guid("cb20b05f-0f53-4eea-9b92-2a2ccbd7468b"), LeaveCategoryId= (int)LeaveTypeEunm.Sick,StartDate = DateTime.Parse("4 Feb, 2019"), EndDate= DateTime.Parse("7 Feb, 2019")},
                new LeaveRequest { UserId= new Guid("c45d233c-a3b4-42b1-a91a-0d044a35c0f2"), LeaveCategoryId= (int)LeaveTypeEunm.Sick,StartDate = DateTime.Parse("5 Feb, 2019"), EndDate= DateTime.Parse("6 Feb, 2019")},
                new LeaveRequest { UserId= new Guid("75840aef-451c-4f0e-ae80-bcd9d7897387"), LeaveCategoryId= (int)LeaveTypeEunm.Sick,StartDate = DateTime.Parse("6 Feb, 2019"), EndDate= DateTime.Parse("9 Feb, 2019")},
            };

            context.LeaveRequests.AddRange(request);

            context.SaveChanges();
        }
        private void SeedAccount(SmartCalendarDbContext context)
        {
            var accounts = new[]
            {
                new Account { AccountId = new Guid("D03127C1-503B-4BF6-9C8D-0408A0587088"), Email = "1@gmail.com", RoleId = (int)RoleEnum.admin},
                new Account { AccountId = new Guid("4371CEA7-3434-471E-A876-14B05838D8C1"),Email = "2@gmail.com", RoleId = (int)RoleEnum.member},
                new Account { AccountId = new Guid("C63B76A7-7B29-4994-8F1C-29CA0E6B1549"),Email = "3@gmail.com", RoleId = (int)RoleEnum.admin},
                new Account { AccountId = new Guid("A01E3B80-371E-4FF6-A798-38A68872F611"),Email = "4@gmail.com", RoleId = (int)RoleEnum.member},
                new Account { AccountId = new Guid("50CCCC22-0D81-4BE4-A52F-3A41853D7F70"),Email = "5@gmail.com", RoleId = (int)RoleEnum.member},
                new Account { AccountId = new Guid("E71CB431-2904-47A1-9E5D-7600CC5DC7F2"),Email = "6@gmail.com", RoleId = (int)RoleEnum.member},
                new Account { AccountId = new Guid("26A7FFC4-0EA2-4645-ADAC-76FF228CC20E"),Email = "7@gmail.com", RoleId = (int)RoleEnum.member},
                new Account { AccountId = new Guid("AC8262A4-20D1-4642-95B1-A2AEFAF65AFA"),Email = "8@gmail.com", RoleId = (int)RoleEnum.member},
                new Account { AccountId = new Guid("60E2AFF0-3FE8-40B4-A20F-AAFD5C0CC253"),Email = "9@gmail.com", RoleId = (int)RoleEnum.member},

            };

            context.Accounts.AddRange(accounts);

            context.SaveChanges();
        }
        private void SeedShift(SmartCalendarDbContext context)
        {
            var shifts = new[]
            {
                new Shift { TimeSlot = "8:00am - 4:00pm"},
                new Shift { TimeSlot = "9:00am - 5:00pm"},
                new Shift { TimeSlot = "10:00am - 6:00pm"},
            };

            context.Shifts.AddRange(shifts);

            context.SaveChanges();
        }
        private void SeedLeaveCategory(SmartCalendarDbContext context)
        {

            var leave = new LeaveCategory { LeaveType = LeaveTypeEunm.Sick.ToString() };


            context.LeaveCategories.Add(leave);

            context.SaveChanges();
        }
        private void SeedRole(SmartCalendarDbContext context)
        {
            var roles = new[]
            {
                new Role { RoleName = RoleEnum.admin.ToString()},
                new Role { RoleName = RoleEnum.member.ToString()},
            };

            context.Roles.AddRange(roles);

            context.SaveChanges();
        }
        private void SeedPosition(SmartCalendarDbContext context)
        {
            var positions = new[]
            {
                new Position{  Name = PositionEnum.Manger.ToString() },
                new Position{  Name = PositionEnum.Lead.ToString() },
                new Position{Name = PositionEnum.Member.ToString() }
            };

            context.Positions.AddRange(positions);

            context.SaveChanges();
        }
        private void SeedDepartment(SmartCalendarDbContext context)
        {
            var department = new[]
            {
                new Department{  Name = DepartmentEnum.It.ToString() },
                new Department{ Name = DepartmentEnum.Marketing.ToString() },
                new Department{  Name = DepartmentEnum.Accounting.ToString() }
            };

            context.Departments.AddRange(department);

            context.SaveChanges();
        }
        private void SeedUser(SmartCalendarDbContext context)
        {
            var users = new[]
            {
                new User { UserId = new Guid("43f0fdea-2b4c-4af7-8389-f442deccef73"),
               AccountId = new Guid("D03127C1-503B-4BF6-9C8D-0408A0587088"),
                    FirstName = "firstname 1", LastName = "lastname 1" , Gender = "Male", DepartmentId = (int)DepartmentEnum.It, PositionId = (int)PositionEnum.Lead},
                new User { UserId = new Guid("cb20b05f-0f53-4eea-9b92-2a2ccbd7468b") ,
                 AccountId = new Guid("4371CEA7-3434-471E-A876-14B05838D8C1"),
                    FirstName = "firstname 2", LastName = "lastname 2" , Gender = "Male", DepartmentId = (int)DepartmentEnum.Accounting, PositionId = (int)PositionEnum.Lead},
                new User { UserId = new Guid("c45d233c-a3b4-42b1-a91a-0d044a35c0f2"),AccountId= new Guid("C63B76A7-7B29-4994-8F1C-29CA0E6B1549"),FirstName = "firstname 3", LastName = "lastname 3" , Gender = "Male", DepartmentId = (int)DepartmentEnum.Marketing, PositionId = (int)PositionEnum.Lead},
                new User { UserId = new Guid("f5132ee6-192d-4c03-a92f-156493ec1095"),  AccountId = new Guid("A01E3B80-371E-4FF6-A798-38A68872F611"), FirstName = "firstname 4", LastName = "lastname 4" , Gender = "Male", DepartmentId = (int)DepartmentEnum.It, PositionId = (int)PositionEnum.Member},
                new User { UserId = new Guid("75840aef-451c-4f0e-ae80-bcd9d7897387"),AccountId = new Guid("50CCCC22-0D81-4BE4-A52F-3A41853D7F70"), FirstName = "firstname 5", LastName = "lastname 5" , Gender = "Male", DepartmentId = (int)DepartmentEnum.Accounting, PositionId = (int)PositionEnum.Member},
                new User { UserId = new Guid("226223d8-78c6-40ac-8cbd-dfae4fc58a3f"),AccountId = new Guid("E71CB431-2904-47A1-9E5D-7600CC5DC7F2"), FirstName = "firstname 6", LastName = "lastname 6" , Gender = "Female", DepartmentId = (int)DepartmentEnum.Marketing, PositionId = (int)PositionEnum.Member},
                new User { UserId = new Guid("F9A6EEA1-1D7D-4ECA-9906-A3EF76A0DE4A"),AccountId = new Guid("26A7FFC4-0EA2-4645-ADAC-76FF228CC20E"),FirstName = "firstname 7", LastName = "lastname 7" , Gender = "Female", DepartmentId = (int)DepartmentEnum.It, PositionId = (int)PositionEnum.Member},
                new User { UserId = new Guid("88A38B02-8DAD-40C9-9856-5D13BE6BB2F2"),AccountId = new Guid("AC8262A4-20D1-4642-95B1-A2AEFAF65AFA"),FirstName = "firstname 8", LastName = "lastname 8" , Gender = "Female", DepartmentId = (int)DepartmentEnum.Accounting, PositionId = (int)PositionEnum.Manger},
                new User { UserId = new Guid("BAA26163-1CEB-43F4-B6C0-5BA3CA1B5AFD"), AccountId = new Guid("60E2AFF0-3FE8-40B4-A20F-AAFD5C0CC253"),FirstName = "firstname 9", LastName = "lastname 9" , Gender = "Female", DepartmentId = (int)DepartmentEnum.Marketing, PositionId = (int)PositionEnum.Manger},
            };

            context.Users.AddRange(users);

            context.SaveChanges();
        }
    }
}
