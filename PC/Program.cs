using Autofac;
using Autofac.Extensions.DependencyInjection;
using Common;
using Data;
using Entities.Role;
using Entities.User;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.OData;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Services.WebFramework.CustomMapping;
using WebFrameworks.Configurations;
using WebFrameworks.Middlewares;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory())
    .ConfigureContainer<ContainerBuilder>(ConfigureContainer);
void ConfigureContainer(ContainerBuilder containerBuilder) => containerBuilder.AddServices();
var configuration = builder.Configuration;
var siteSettings = configuration.GetSection(nameof(SiteSettings)).Get<SiteSettings>();
builder.Services.Configure<SiteSettings>(configuration.GetSection(nameof(SiteSettings)));
builder.Services.InitializeAutoMapper();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(configuration.GetConnectionString("SqlServer"));
});
builder.Services.AddCustomIdentity(siteSettings.IdentitySettings);

builder.Services.AddControllersWithViews()
    .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<ApplicationDbContext>())
    .AddNewtonsoftJson();


builder.Services.AddControllers(options =>
    {
        options.Filters.Add(new AuthorizeFilter());
    })
    .AddOData(options =>
        options.Select()
            .Filter()
            .OrderBy()
            .SetMaxTop(20)
            .Count()
            .Expand()
    );

builder.Services.AddSpaStaticFiles(configure =>
{
    configure.RootPath = "clientapp/build";
});

builder.Services.AddRazorPages();

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});
// Add services to the container.

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerServices();

builder.Services.AddJwtAuthentication(siteSettings.JwtSettings);

builder.Services.AddCors();

var app = builder.Build();

app.UseCustomExceptionHandler();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();


app.UseAuthentication();

app.UseAuthorization();

app.UseCors(config => config.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.UseStaticFiles();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        if (context.Database.IsSqlServer()) context.Database.Migrate();
        var roleManager = services.GetRequiredService<RoleManager<RoleEntity>>();
        var userManager = services.GetRequiredService<UserManager<UserEntity>>();
        await ApplicationDbContextSeed.SeedDefaultRolesAsync(roleManager);
        await ApplicationDbContextSeed.SeedDefaultUserAsync(userManager);
    }
    catch (Exception ex)
    {
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while migrating or seeding the database.");
    }
}

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "clientapp";
    if (app.Environment.IsDevelopment())
    {
        spa.UseReactDevelopmentServer("start");
    }
});

app.Run();
