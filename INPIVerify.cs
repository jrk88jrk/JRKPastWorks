using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Users;

namespace Sabio.Services.Interfaces
{
	public interface INPIVerifyService
	{
		Task<NPIBaseResult> SearchProvider(int NPI);

		void Update(UserStatusUpdateRequest model);

	}
}
