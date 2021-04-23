using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReactWithBackend.Data
{
    public class PeopleRepository
    {
        private readonly string _connectionString;
        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Person> GetAll()
        {
            using var context = new PeopleDbContext(_connectionString);
            return context.People.ToList();
        }
        public void AddPerson(Person p)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Add(p);
            context.SaveChanges();
        }
        public void UpdatePerson(Person p)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Attach(p);
            context.Entry(p).State = EntityState.Modified;
            context.SaveChanges();
        }
        public void Delete(int id)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id={id}");
        }             
    }
}
