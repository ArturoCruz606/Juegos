// import axios from "axios"
let baseUrl = "https://localhost:7194"

document.addEventListener("DOMContentLoaded", () => {
    actualizarJuegos()
})

function actualizarJuegos() {
    axios.get(baseUrl + '/juegos')
        .then(function (response) {
            let juegos = document.getElementById("juegos")
            let juegosData = response.data
            var juegosHtml = ''
            for (let i = 0; i < juegosData.length; i++) {
                juegosHtml += `${juegosData[i].nombre} ${juegosData[i].sinopsis} ${juegosData[i].calificacion} <br/> `
            }
            juegos.innerHTML = juegosHtml
        })
        .catch(function (error) {
            console.log(error);
        })
}




let btn_GuardarJuego = document.getElementById("btn_Guardar")
console.log(btn_GuardarJuego)
btn_GuardarJuego.addEventListener('click', () => {
    console.log('hgh')
    let nombreJuego = document.getElementById("nombre_Juego")
    let sinopsisJuego = document.getElementById("sinopsis_Juego")
    let calificacionJuego = document.getElementById("calificacion_Juego")
    console.log(nombreJuego)
    console.log(sinopsisJuego)
    console.log(calificacionJuego)
    let juego = {
        nombre: nombreJuego.value,
        sinopsis: sinopsisJuego.value,
        calificacion: calificacionJuego.value,
    }
    console.log(juego)
    if (juego.nombre !== '' && juego.nombre !== null && juego.sinopsis !== ''
        && juego.sinopsis !== null && juego.calificacion !== 0 && juego.calificacion !== null) {
        axios.post(baseUrl + "/juegos", juego)
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