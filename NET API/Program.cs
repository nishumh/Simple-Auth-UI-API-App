using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SimpleAuthAPI;
using SimpleAuthAPI.RequestModels;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();//Adding Global Exception Handler
builder.Services.AddProblemDetails();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowAngularLocalhost",
                      builder =>
                      {
                          builder.WithOrigins("http://localhost:4200", "https://localhost:4200")
                                 .AllowAnyHeader()
                                 .AllowAnyMethod();
                      });
});

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Add authentication and authorization services
// Configure JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(ConfigureJwtBearerOptions);

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("UserOrAdmin", policy => policy.RequireRole("User", "Admin"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowAngularLocalhost");

app.UseAuthentication();
app.UseAuthorization(); 

app.UseExceptionHandler();

app.MapPost("/login", ([FromBody] LoginRequest loginRequest) => 
    { 
        if(IsValidUser(loginRequest.UserName))
        {
            var token = GenerateJwtToken(loginRequest.UserName);
            //The role is same as username for simplicity, in real application it should be fetched from database or any other source
            return Results.Ok(new { Token = token, Role = loginRequest.UserName });
        }
        return Results.Unauthorized();
    })
    .WithDisplayName("Login").AllowAnonymous();

app.MapGet("/products", () => new string[] {"Product 1", "Product 2"})
    .RequireAuthorization("UserOrAdmin"); // Authenticated user policy

app.MapGet("/admin", () => "Welcome, Admin!")
    .RequireAuthorization("AdminOnly"); // Admin-only endpoint using policy

app.Run();

void ConfigureJwtBearerOptions(JwtBearerOptions jwtBearerOptions)
{     
    jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true, 
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])) 
    };
}


bool IsValidUser(string userName)
{
    //Read from database or any other source to validate the user
    return userName == "Admin" || userName == "User";
}

string GenerateJwtToken(string userName)
{
    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(app.Configuration.GetValue<string>("Jwt:Key")));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
    var claims = new[]
    {
            new Claim(ClaimTypes.Name, userName),            
            new Claim(ClaimTypes.Role, userName)
        };

    var token = new JwtSecurityToken(
        issuer: app.Configuration.GetValue<string>("Jwt:Issuer"),
        audience: app.Configuration.GetValue<string>("Jwt:Audience"),
        claims: claims,
        expires: DateTime.Now.AddMinutes(5),
        signingCredentials: credentials);

    return new JwtSecurityTokenHandler().WriteToken(token);
}