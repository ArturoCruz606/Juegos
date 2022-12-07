let baseUrl = "https://localhost:7194"

document.addEventListener("DOMContentLoaded", () => {
    actualizarJuegos()
    actualizarGrafico()
})

function actualizarJuegos() {
    axios.get(baseUrl + '/juegos')
        .then(function (response) {
            let juegos = document.getElementById("juegos")
            let juegosData = response.data
            console.log(juegosData)
            let juegosHtml = ''
            for (let i = 0; i < juegosData.length; i++) {
                juegosHtml += `<tr><td>${juegosData[i].nombre}</td> <td>${juegosData[i].sinopsis}</td> <td>${juegosData[i].calificacion}</td></tr>\n`
            }
            juegos.innerHTML = juegosHtml
            actualizarGrafico()
        })
        .catch(function (error) {
            console.log(error);
        })
}

let btn_GuardarJuego = document.getElementById("btn_Guardar")

btn_GuardarJuego.addEventListener('click', () => {
    let nombreJuego = document.getElementById("nombre_Juego")
    let sinopsisJuego = document.getElementById("sinopsis_Juego")
    let calificacionJuego = document.getElementById("calificacion_Juego")
    if (calificacionJuego.value <= 0 || calificacionJuego.value > 10) {
        alert("La calificacion no puede ser menor a 1 ni mayor a 10")
        return
    }
    let juego = {
        nombre: nombreJuego.value,
        sinopsis: sinopsisJuego.value,
        calificacion: calificacionJuego.value,
    }
    if (juego.nombre !== '' && juego.nombre !== null && juego.sinopsis !== ''
        && juego.sinopsis !== null && juego.calificacion !== 0 && juego.calificacion !== null) {
        axios.post(baseUrl + "/juegos", juego)
            .then(function (response) {
                console.log(response)
                actualizarJuegos()
            })
            .catch(function (error) {
                alert(error)
            })
        nombreJuego.value = ''
        sinopsisJuego.value = ''
        calificacionJuego.value = ''
    } else {
        alert('Verificar campos')
    }
})

const calificacionesJuegos = document.getElementById("graficoCalificaciones")

let data = {
    labels: [],
    datasets: [
        {
            label: 'Calificación',
            data: []
        }
    ],
    backgroundColor: []
};

var grafico = new Chart(calificacionesJuegos, {
    type: 'polarArea',
    data: data,
})

function actualizarGrafico() {
    calificacionesJuegos.innerHTML = ""
    axios.get(baseUrl + '/juegos')
        .then(function (response) {
            let calificaciones = response.data;
            console.log(calificaciones)
            grafico.data.labels = calificaciones.map(x => x.nombre)
            grafico.data.datasets[0].data = calificaciones.map(x => x.calificacion)
            grafico.data.datasets[0].backgroundColor = calificaciones.map(x => x.color)
            grafico.update()
        })
        .catch(function (error) {
            console.log(error);
        })
}
