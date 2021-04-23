using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactWithBackend.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactWithBackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;
        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpGet]
        [Route("GetPeople")]
        public List<Person> GetPeople()
        {
            var repo = new PeopleRepository(_connectionString);
           return repo.GetAll();
        }
        [HttpPost]
        [Route("AddPerson")]
        public void AddPerson(Person p)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.AddPerson(p);
        }
        [HttpPost]
        [Route("UpdatePerson")]
        public void UpdatePerson(Person p)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.UpdatePerson(p);
        }
        [HttpPost]
        [Route("DeletePerson")]
        public void DeletePerson(Person p)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Delete(p.Id);
        }
        [HttpPost]
        [Route("DeleteAll")]
        public void DeleteAll(List<int> ids)
        {
            var repo = new PeopleRepository(_connectionString);
            ids.ForEach(i => repo.Delete(i));
        }

    }
}
