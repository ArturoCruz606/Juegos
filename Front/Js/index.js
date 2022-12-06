let baseUrl = "https://localhost:7194"

document.addEventListener("DOMContentLoaded", () => {
    actualizarJuegos()
    console.log(traerCalificacionesJuegos())
    console.log(traerNombresJuegos())
})

function traerCalificacionesJuegos() {
    let juegosDataCalificacion = []
    axios.get(baseUrl + '/juegos')
    .then(function (response) {
        let juegosData = response.data
            for (let i = 0; i < juegosData.length; i++)
            {
                juegosDataCalificacion.push(juegosData[i].calificacion)
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        return juegosDataCalificacion
}

function traerNombresJuegos() {
    let juegosDataNombre = []
    axios.get(baseUrl + '/juegos')
        .then(function (response) {
            let juegosData = response.data
            for (let i = 0; i < juegosData.length; i++)
            {
                juegosDataNombre.push(juegosData[i].nombre)
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        return juegosDataNombre
}

function actualizarJuegos() {
    axios.get(baseUrl + '/juegos')
        .then(function (response) {
            let juegos = document.getElementById("juegos")
            let juegosData = response.data
            console.log(juegosData)
            let juegosHtml = ''
            for (let i = 0; i < juegosData.length; i++) {
                juegosHtml += `<tr><td>${juegosData[i].id}</td> <td>${juegosData[i].nombre}</td> <td>${juegosData[i].sinopsis}</td> <td>${juegosData[i].calificacion}</td></tr>\n`
            }
            juegos.innerHTML = juegosHtml
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

let labels = traerNombresJuegos()

let calificaciones = traerCalificacionesJuegos()

let data = {
    labels: labels,
    datasets: [
        {
            label: 'Juegos',
            data: calificaciones
        }
    ]
};


var grafico = new Chart(calificacionesJuegos,{
    type: 'polarArea',
    data: data,
})
