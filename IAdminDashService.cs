using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Sabio.Models;
using Sabio.Models.Domain;

namespace Sabio.Services
{
	public interface IAdminDashService
	{
		Paged<UserDetail> GetAll(int pageIndex, int pageSize);
		Paged<UserDetail> GetbyRole(int pageIndex, int pageSize, string role);

		List<UserRole> GetAllRoles();
		public void Update(UserStatusUpdateRequest model);



	}
}