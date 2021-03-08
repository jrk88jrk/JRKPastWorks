using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain
{
	public class NPIProviderResult
	{
		public string Enumeration_type { get; set; }

		public int Number { get; set; }

		public NPIProviderBasic Basic { get; set;  }

		public List<NPIProviderAddress> Addresses { get; set; }

		public List<NPIProviderTaxonomy> Taxonomies { get; set; }


		public class NPIProviderBasic
		{
			public string Name_Prefix { get; set; }
			public string First_Name { get; set; }
			public string Last_Name { get; set; }
			public string Middle_Name { get; set; }
			public string Credential { get; set; }
			public string Sole_Proprietor { get; set; }
			public string Gender { get; set; }
			public string Status { get; set; }
		}

		public class NPIProviderAddress
		{
			public string Country_Code { get; set; }
			public string Country_Name { get; set; }
			public string Address_Purpose { get; set; }
			public string Address_Type { get; set; }
			public string City { get; set; }
			public string State { get; set; }
			public int Postal_Code { get; set; }
			public string Telephone_Number { get; set; }
			public string Fax_Number { get; set; }
		}


		public class NPIProviderTaxonomy
		{
			public string Code { get; set; }
			public string Desc { get; set; }
			public string Primary { get; set; }
			public string State { get; set; }
			public string License { get; set; }

		}

	}
}
