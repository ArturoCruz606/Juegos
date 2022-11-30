let baseurl = "https://localhost:7194"

document.addEventListener("DOMContentLoaded", () => {
    actualizarJuegos()
})

function actualizarJuegos() {
    axios.get(baseUrl + '/juegos')
        .then(function (response) {
            let juegos = document.getElementById("juegos")
            juegosData = response.data
            var juegosHtml = ''
            for (let i = 0; i < juegosData.length; i++) {
                juegosHtml += `${juegosData[i].nombre} ${juegosData[i].apellido} - ${juegosData[i].tarjeta} <br/> `
            }
            juegos.innerHTML = juegosHtml
        })
        .catch(function (error) {
            console.log(error);
        })
}




let btn_GuardarJuego = document.getElementById("btn_Guardar")

btn_GuardarJuego.addEventListener('click', (e) => {
    let nombreJuego = document.getElementById("nombre_Juego")
    let sinopsisJuego = document.getElementById("sinopsis_Juego")
    let calificacionJuego = document.getElementById("calificacion_Juego")
    let juego = {
        nombre: nombreJuego.value,
        sinopsis: sinopsisJuego.value,
        calificacion: calificacionJuego.value,
    }
    if (juego.nombre !== '' && juego.nombre !== null && juego.sinopsis !== ''
        && juego.sinopsis !== null && juego.calificacion !== 0 && juego.calificacion !== null) {
        axios.post(baseurl + "/juegos", juego)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
        actualizarJuegos()
        nombreJuego.value = ''
        sinopsisJuego.value = ''
        calificacionJuego.value = ''
    } else {
        alert('Verificar campos')
    }
})