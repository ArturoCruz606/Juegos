using System.ComponentModel.DataAnnotations;

namespace Juegos.Modelo;

public class Juego
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    [StringLength(40)]
    public string Nombre { get; set; }

    [Required]
    [StringLength(300)]
    public string Sinopsis { get; set; }

    [Required]
    [Range(1, 10, ErrorMessage = "La Calificacion ser una entre {1} y {2}")]
    public int Calificacion { get; set; }

    public string Color { get; set; }
    public Juego() { }
}