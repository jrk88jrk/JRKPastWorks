using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Models.Enums;
using Sabio.Models.Requests;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;

namespace Sabio.Web.Api.Controllers
{
	[Route("api/tempproviders")]
	[ApiController]
	public class TempProviderApiController : BaseApiController
	{
        private ITempProviderService _service = null;
        private IAuthenticationService<int> _authService = null;
        private ITokenService _tokService = null;
        private IEmailService _eService = null;

        public TempProviderApiController(ITempProviderService service
            , ILogger<TempProviderApiController> logger
            , IAuthenticationService<int> authService, ITokenService tokService, IEmailService eService) : base(logger)
        {
            _service = service;
            _tokService = tokService;
            _eService = eService;
            _authService = authService;
        }
        [HttpGet]
        public ActionResult<ItemsResponse<TempProvider>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<TempProvider> list = _service.GetTop();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not Found.");
                }
                else
                {
                    response = new ItemsResponse<TempProvider> { Items = list };
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

        [HttpPost("register")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<int>> Create(UserAddRequest model)
        {
            int iCode = 201;
            BaseResponse response = null;

            try
            {
                int id = _service.Add(model);
                if (id > 0)
                {
                    _eService.CreatePendingEmail(model);
                }
                response = new ItemResponse<int>() { Item = id };
            }
            catch (Exception ex)
            {
                iCode = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }
    }

    
}


