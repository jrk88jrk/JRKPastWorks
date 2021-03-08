using Sabio.Data.Providers;
using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using Sabio.Data;
using Sabio.Models;

namespace Sabio.Services
{
	public class AdminDashService : IAdminDashService
	{
		IDataProvider _data = null;

		public AdminDashService(IDataProvider data)
		{
			_data = data;
		}
	
		public List<UserRole> GetAllRoles()
		{
			List<UserRole> rolesList = null;

			string procName = "[dbo].[Roles_SelectAll_V2]";
			_data.ExecuteCmd(procName, inputParamMapper: null
				, singleRecordMapper: delegate (IDataReader reader, short set)
				{
					UserRole userRole = new UserRole();
					int startingIndex = 0;

					userRole.Name = reader.GetSafeString(startingIndex++); 
					
					if (rolesList == null)
					{
						rolesList = new List<UserRole>();
					}
					rolesList.Add(userRole);
				});

			return rolesList;
		}
		public void Update(UserStatusUpdateRequest model)
		{
			string procName = "[dbo].[Users_UpdateStatus_V2]";
			_data.ExecuteNonQuery(procName,
				inputParamMapper: delegate (SqlParameterCollection col)
				{
					col.AddWithValue("@Id", model.Id);
					col.AddWithValue("@UserStatusId", model.UserStatusId);
				},
				returnParameters: null);
		}

		public Paged<UserDetail> GetAll(int pageIndex, int pageSize)
		{
			Paged<UserDetail> pagedList = null;
			List<UserDetail> list = null;
			int totalCount = 0;

			string procName = "[dbo].[UserRoles_SelectAllPaginated]";

			_data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection paramsCollection)
			{
				paramsCollection.AddWithValue("@pageIndex", pageIndex);
				paramsCollection.AddWithValue("@pageSize", pageSize);
			}, 
			singleRecordMapper: delegate (IDataReader reader, short set)
				{
					UserDetail aUser = mapUser(reader, out int index);
					if (totalCount == 0)
					{
					 totalCount = reader.GetSafeInt32(index);
					}
					if (list == null)
					{
						list = new List<UserDetail>();
					}
					list.Add(aUser);
				});
			if (list != null)
			{
				pagedList = new Paged<UserDetail>(list, pageIndex, pageSize, totalCount);
			}
			return pagedList;
		}

		public Paged<UserDetail> GetbyRole(int pageIndex, int pageSize, string role)
		{
			Paged<UserDetail> pagedList = null;
			List<UserDetail> list = null;
			int totalCount = 0;
			string procName = "[dbo].[UserRoles_AllByRole_Paginated]";
			_data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection paramCol)
			{
				paramCol.AddWithValue("@pageIndex", pageIndex);
				paramCol.AddWithValue("@pageSize", pageSize);
				paramCol.AddWithValue("@role", role);
			},
			singleRecordMapper: delegate (IDataReader reader, short set)
			{
				UserDetail aUser = mapUser(reader, out int index);
				if (totalCount == 0)
				{
					totalCount = reader.GetSafeInt32(index);
				}
				if (list == null)
				{
					list = new List<UserDetail>();
				}
				list.Add(aUser);
			});
			if (list != null)
			{
				pagedList = new Paged<UserDetail>(list, pageIndex, pageSize, totalCount);
			}
			return pagedList;

		}

		private static UserDetail mapUser(IDataReader reader, out int startingIndex)
		{
			UserDetail aUser = new UserDetail();
			startingIndex = 0;

			aUser.Id = reader.GetSafeInt32(startingIndex++);
			aUser.Email = reader.GetSafeString(startingIndex++);
			aUser.IsConfirmed = reader.GetSafeBool(startingIndex++);
			aUser.UserStatusId = reader.GetSafeInt32(startingIndex++);
			aUser.UserStatus = reader.GetSafeString(startingIndex++);
			aUser.DateCreated = reader.GetSafeDateTime(startingIndex++);
			aUser.DateModified = reader.GetSafeDateTime(startingIndex++);
			string rolesString = reader.GetSafeString(startingIndex++);
			if (!string.IsNullOrEmpty(rolesString))
			{
				List<UserRole> rolesList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<UserRole>>(rolesString);

				foreach (UserRole userRole in rolesList)
				{
					if (aUser.Roles == null)
					{
						aUser.Roles = new List<string>();
					}
					aUser.Roles.Add(userRole.Name);
				}
			}
			aUser.ProfileId = reader.GetSafeInt32(startingIndex++); 
			aUser.FirstName = reader.GetSafeString(startingIndex++);
			aUser.LastName = reader.GetSafeString(startingIndex++);
			aUser.Mi = reader.GetSafeString(startingIndex++);
			aUser.AvatarUrl = reader.GetSafeString(startingIndex++);

			return aUser;
		}


	}
}
