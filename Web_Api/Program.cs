using Juegos.Modelo;
using Juegos.Persistencia;
using Juegos.ViewModels;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionstring = builder.Configuration.GetConnectionString("juegos_db");

var mysqlVersion = new MySqlServerVersion("8.0.30");

builder.Services.AddDbContext<JuegosDbContext>(opciones => opciones.UseMySql(connectionstring, mysqlVersion));

builder.Services.AddScoped<JuegosDbContext>();

var opcionesContext = new DbContextOptionsBuilder<JuegosDbContext>();

opcionesContext.UseMySql(connectionstring, mysqlVersion);

var dbJuegos = new JuegosDbContext(opcionesContext.Options);

dbJuegos.Database.EnsureCreated();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("appPolicy",
                    builder =>
                    {
                        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("appPolicy");

app.MapGet("/juegos", async (JuegosDbContext db) =>
{
    var juegos = await db.Juegos.ToListAsync();
    var random = new Random();
    foreach (var juego in juegos)
    {
        juego.Color = String.Format("#{0:X6}", random.Next(0x1000000)); // = "#A197B9"
    }
    return Results.Ok(juegos);
});

app.MapGet("/juegos/{nombre}", async (JuegosDbContext db, string nombre) =>
{
    return Results.Ok(await db.Juegos.FirstOrDefaultAsync(x => x.Nombre == nombre));
});

app.MapPost("/juegos", async (JuegosDbContext db, JuegoViewModel juego) =>
{
    var nuevoJuego = new Juego
    {
        Nombre = juego.Nombre,
        Sinopsis = juego.Sinopsis,
        Calificacion = juego.Calificacion,
        Color = ""
    };
    await db.Juegos.AddAsync(nuevoJuego);
    await db.SaveChangesAsync();
    return Results.Created($"/juegos/{nuevoJuego.Nombre}", nuevoJuego);
});

app.MapPut("/juegos/{nombre}", async (JuegosDbContext db, JuegoViewModel juego, string nombre) =>
{
    var juegoActual = await db.Juegos.FirstOrDefaultAsync(x => x.Nombre == nombre);
    juegoActual.Sinopsis = juego.Sinopsis;
    juegoActual.Calificacion = juego.Calificacion;
    db.Juegos.Update(juegoActual);
    await db.SaveChangesAsync();
    return Results.Ok(await db.Juegos.FirstOrDefaultAsync(x => x.Nombre == nombre));
});

app.MapDelete("/juegos/{nombre}", async (JuegosDbContext db, string nombre) =>
{
    var juegoActual = await db.Juegos.FirstOrDefaultAsync(x => x.Nombre == nombre);
    db.Juegos.Remove(juegoActual);
    await db.SaveChangesAsync();
    return Results.Ok(db.Juegos);
});

app.Run();
