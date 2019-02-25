using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Smart_Calendar.Domain.Entities;

namespace Smart_Calendar.Persistence.Configurations
{
    internal class UserShiftConfiguration : IEntityTypeConfiguration<UserShift>
    {
        public void Configure(EntityTypeBuilder<UserShift> builder)
        {
            builder.HasOne(s => s.Shift).WithMany(uf => uf.UserShift).HasForeignKey(fk => fk.ShiftId);
            builder.HasOne(s => s.User).WithMany(uf => uf.UserShift).HasForeignKey(fk => fk.UserId).OnDelete(DeleteBehavior.Cascade);
           
        }

    }

}

