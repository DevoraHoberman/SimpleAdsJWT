using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SimpleAdsJWT.Data;
using SimpleAdsJWT.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleAdsJWT.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class HomeController : ControllerBase
    {
        private readonly string _connectionString;

        public HomeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getads")]
        public List<Ad> GetAds()
        {
            var repo = new AdRepo(_connectionString);
            return repo.GetAds();
        }

        [HttpPost]
        [Authorize]
        [Route("addad")]
        public void AddAd(Ad ad)
        {
            var repo = new AdRepo(_connectionString);
            var userRepo = new UserRepo(_connectionString);
            var email = User.FindFirst("user")?.Value;
            var user = userRepo.GetByEmail(email);
            ad.Name = user.Name;
            ad.UserId = user.Id;
            ad.Date = DateTime.Now;
            repo.AddAd(ad);
        }

        [Authorize]
        [HttpPost]
        [Route("deletead")]
        public void DeleteAd(int id)
        {
            var repo = new AdRepo(_connectionString);
            repo.DeleteAd(id);
        }

        [Authorize]
        [HttpGet]
        [Route("getadsforuser")]
        public List<Ad> GetAdsForUser(int id)
        {
            var repo = new AdRepo(_connectionString);
            return repo.GetAdForUser(id);
        }
    }
}
