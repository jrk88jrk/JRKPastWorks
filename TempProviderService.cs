using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;

namespace Sabio.Services
{
	public class TempProviderService : ITempProviderService 
	{

		IDataProvider _data = null;
		public TempProviderService(IDataProvider data)
		{
            _data = data;
        }
        public List<TempProvider> GetTop()
        {

            string procName = "[dbo].[TempProvider_SelectAll]";
            List<TempProvider> list = null;

            _data.ExecuteCmd(procName, inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {

                    TempProvider aProvider = MapProvider(reader, out int startingIndex);

                    if (list == null)
                    {
                        list = new List<TempProvider>();
                    }

                    list.Add(aProvider);
                }

            );
            return list;
        }

        public int Add(UserAddRequest model)
        {
            int id = 0;

            string password = model.Password;
            string salt = BCrypt.BCryptHelper.GenerateSalt(10);
            string hashedPassword = BCrypt.BCryptHelper.HashPassword(password, salt);

            string procName = "[dbo].[TempProvider_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@Email", model.Email);
                    collection.AddWithValue("@Password", hashedPassword);
                    collection.AddWithValue("@Practice", model.Practice);
                    collection.AddWithValue("@FirstName", model.FirstName);
                    collection.AddWithValue("@LastName", model.LastName);
                    collection.AddWithValue("@NPI", model.NPI);
                    collection.AddWithValue("@Role", model.Role);
                    collection.AddWithValue("@Contact", model.Contact);

                    SqlParameter idOut = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                    idOut.Direction = System.Data.ParameterDirection.Output;

                    collection.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCol)
                {
                    object oId = returnCol["@Id"].Value;
                    Int32.TryParse(oId.ToString(), out id);
                });

            return id;
        }
        private static TempProvider MapProvider(IDataReader reader, out int startingIndex)
        {
            TempProvider aProvider = new TempProvider();

            startingIndex = 0;

            aProvider.Id = reader.GetSafeInt32(startingIndex++);
            aProvider.Email = reader.GetSafeString(startingIndex++);
            aProvider.IsConfirmed = reader.GetSafeBool(startingIndex++);
            aProvider.UserStatusId = reader.GetSafeInt32(startingIndex++);
            aProvider.FirstName = reader.GetSafeString(startingIndex++);
            aProvider.LastName = reader.GetSafeString(startingIndex++);
            aProvider.Contact = reader.GetSafeString(startingIndex++);
            aProvider.PracticeName = reader.GetSafeString(startingIndex++);
            aProvider.NPI = reader.GetSafeInt32(startingIndex++);
            aProvider.TempProviderId = reader.GetSafeInt32(startingIndex++);

            return aProvider;
        }
    }
}
