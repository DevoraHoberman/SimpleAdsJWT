using Microsoft.EntityFrameworkCore.Migrations;

namespace SimpleAdsJWT.Data.Migrations
{
    public partial class More : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PosterName",
                table: "Ads",
                newName: "Name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Ads",
                newName: "PosterName");
        }
    }
}
