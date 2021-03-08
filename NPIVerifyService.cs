using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Users;
using Sabio.Services.Interfaces;

namespace Sabio.Services
{
	public class NPIVerifyService : INPIVerifyService
	{
		IDataProvider _dataProvider = null;
		private readonly HttpClient client;
		public NPIVerifyService(IDataProvider dataProvider)
		{
			_dataProvider = dataProvider;
			client = new HttpClient();
			client.BaseAddress = new Uri("https://npiregistry.cms.hhs.gov/api/?number=");
		}
		public void Update(UserStatusUpdateRequest model)
		{
			string procName = "[dbo].[TempProvider_UpdateStatus_deleteTemp]";
			_dataProvider.ExecuteNonQuery(procName,
				inputParamMapper: delegate (SqlParameterCollection col)
				{
					col.AddWithValue("@Id", model.Id);
				},
				returnParameters: null);
		}
		public async Task<NPIBaseResult> SearchProvider(int NPI)
		{
			string url = "https://npiregistry.cms.hhs.gov/api/?number=";

			var responseString = await client.GetAsync($"{url}{NPI}&version=2.0");
			var result = await responseString.Content.ReadAsStringAsync();
			return JsonConvert.DeserializeObject<NPIBaseResult>(result);
		}
	}
}
