using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Juegos.ViewModels
{
    public class JuegoViewModel
    {
        [Required]
        [StringLength(40)]
        public string Nombre { get; set; }

        [Required]
        [StringLength(300)]
        public string Sinopsis { get; set; }

        [Required]
        [Range(1, 10, ErrorMessage = "La Calificacion ser una entre {1} y {2}")]
        public int Calificacion { get; set; }
    }
}