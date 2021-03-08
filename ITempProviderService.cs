using System;
using System.Collections.Generic;
using System.Text;
using Sabio.Models.Domain;
using Sabio.Models.Requests;

namespace Sabio.Services.Interfaces
{
	public interface ITempProviderService
	{
		public List<TempProvider> GetTop();
        int Add(UserAddRequest model);
    }
}
