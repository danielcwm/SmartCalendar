using Microsoft.EntityFrameworkCore.Migrations;

namespace Smart_Calendar.Persistence.Migrations
{
    public partial class updatedleavemodal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "IsApproved",
                table: "LeaveRequests",
                nullable: false,
                oldClrType: typeof(bool));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "IsApproved",
                table: "LeaveRequests",
                nullable: false,
                oldClrType: typeof(int));
        }
    }
}
