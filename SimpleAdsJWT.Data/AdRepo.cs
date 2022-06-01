using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SimpleAdsJWT.Data
{
    public class AdRepo
    {
        private readonly string _connectionString;

        public AdRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddAd(Ad ad)
        {
            using var ctx = new AdDataContext(_connectionString);
            ctx.Add(ad);
            ctx.SaveChanges();
        }

        public List<Ad> GetAds()
        {
            using var ctx = new AdDataContext(_connectionString);
            return ctx.Ads.Include(a=> a.User).OrderByDescending(a => a.Date).ToList();
        }
        public List<Ad> GetAdForUser(int id)
        {
            using var ctx = new AdDataContext(_connectionString);
            return ctx.Ads.Where(a => a.UserId == id).ToList();
        }
        public void DeleteAd(int id)
        {
            using var ctx = new AdDataContext(_connectionString);
            ctx.Database.ExecuteSqlInterpolated($"DELETE FROM Ads WHERE Id = {id}");
        }

    }
}
