using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Models.Enums;
using Sabio.Models.Requests;
using Sabio.Models.Requests.Users;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;

namespace Sabio.Web.Api.Controllers
{
	[Route("api/NPIVerify/")]
	[ApiController]
	public class NPIVerifyApiController : BaseApiController
	{
        private INPIVerifyService _service = null;
        private IAuthenticationService<int> _authService = null;
        private ITokenService _tokService = null;
        private IEmailService _eService = null;


        public NPIVerifyApiController(INPIVerifyService service
            , ILogger<NPIVerifyApiController> logger
            , IEmailService eService
            , ITokenService tokService
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
            _tokService = tokService;
            _eService = eService;
        }
        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(UserStatusUpdateRequest model)
        {

            int iCode = 200;
            BaseResponse response = null;
            try
            {
              _service.Update(model);
                if (model.Id > 0)
                {
                    Guid token = Guid.NewGuid();
                    UserTokensAddRequest tokenRequest = new UserTokensAddRequest();
                    tokenRequest.Token = token;
                    tokenRequest.UserId = model.Id;
                    tokenRequest.TokenType = (int)TokenType.NewProvider;
                    _tokService.AddToken(tokenRequest);

                    _eService.CreateProviderConfirmEmail(model, tokenRequest, model.Id);
                }
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);
        }




        [HttpGet("{npi:int}")]
        public async Task<ActionResult<ItemResponse<NPIBaseResult>>> Get(int NPI)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                NPIBaseResult regProvider = await _service.SearchProvider(NPI);

                if (regProvider == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not Found.");
                }
                else
                {
                    response = new ItemResponse<NPIBaseResult> { Item = regProvider };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

    }
}

