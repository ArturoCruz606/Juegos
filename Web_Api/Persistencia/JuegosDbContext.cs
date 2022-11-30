using Juegos.Modelo;
using Microsoft.EntityFrameworkCore;

namespace Juegos.Persistencia;

public class JuegosDbContext : DbContext
{
    public DbSet<Juego> Juegos { get; set; }

    public JuegosDbContext(DbContextOptions<JuegosDbContext> opciones) : base(opciones) { }
}