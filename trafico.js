
const semaforo_imagen = document.getElementById("semaforo_imagen")

const numero_semaforo_label = document.getElementById("countdown_number")

const semaforo_countdown = document.getElementById("semaforo_countdown")

const main_div = document.getElementById("main_div")

function random (max, min) {
    return Math.floor(  Math.random() * ( max - min) + min ) ;
}

let = color_autos = ["morado", "azul", "azul", "azul", "rojo", "rojo", "amarillo", "verde", "negro", "negro", "negro", "negro", "negro", "negro", "negro", "blanco", "blanco", "blanco", "blanco", "celeste", "marron"]
let = color_random = 0;
const autos = [];

let auto_coordenadas = [];


semaforo_tiempo = 10;
let semaforo_ciclo = 1;
let numero_semaforo = semaforo_tiempo;

let back_color = "rgb(47, 54, 64)";
let color_count = "rgb(0, 255, 0)";
let color_count_start = 0;

let red = 0;
let green = 255;

function cambio_semaforo () {
    if (semaforo_ciclo == 1) {
        semaforo_ciclo = 2;
    }
    else{
        semaforo_ciclo = 1;
    }

    semaforo_imagen.src = `/imagenes/semaforo_ciclo_${semaforo_ciclo}.png`
    numero_semaforo = semaforo_tiempo



    /*console.log(`${semaforo_ciclo}`)*/
}

function cambio_numero() {

    if (numero_semaforo == 1) {
        numero_semaforo = semaforo_tiempo;
        color_count_start = 0;
        color_count = "rgb(0, 255, 0)"
        red = 0
        green = 255
    }
    else{
        numero_semaforo -= 1;
    }

    /*console.log(numero_semaforo)*/

    numero_semaforo_label.textContent = numero_semaforo

}

function cambio_countdown() {

    if (numero_semaforo > (semaforo_tiempo / 2)) {
        red += (2.55 / (semaforo_tiempo / 2))
    } else {
        green -= (2.55 / (semaforo_tiempo / 2))
    }

    color_count_start += (100 / semaforo_tiempo) / 100
    color_count = `rgb(${red},${green},0)`

    semaforo_countdown.style.backgroundImage = `conic-gradient(${back_color} 0% , ${back_color} ${color_count_start}% , ${color_count} ${color_count_start}%, ${color_count} 100%)`

}

class Auto {

    constructor(id, origen, destino){
        this.id = id;
        this.origen = origen;
        this.destino = destino;
        this.velocidad = 0
        

        this.element = document.createElement("img");
        this.element.classList.add('auto');

        
        this.element.style.position = "absolute";

        main_div.appendChild(this.element);
    }

    ubicar() {

                this.velocidad = random(3,9)

                color_random = color_autos[random(0,color_autos.length)]
                this.element.src = `/imagenes/autos/${color_random}.png`;

                if (this.origen == "izquierda") {
                    this.x = -200;
                    this.y = 478;
                    this.element.style.top = `${this.y}px`;
                    this.element.style.left = `${this.x}px`;
                    this.element.style.transform = `rotate(90deg)`;
                }

                if (this.origen == "derecha") {
                    this.x = 1000;
                    this.y = 362;
                    this.element.style.top = `${this.y}px`;
                    this.element.style.left = `${this.x}px`;
                    this.element.style.transform = `rotate(-90deg)`;
                }

                if (this.origen == "arriba") {
                    this.x = 367;
                    this.y = -200;
                    this.element.style.top = `${this.y}px`;
                    this.element.style.left = `${this.x}px`;
                    this.element.style.transform = `rotate(180deg)`;
                }

                if (this.origen == "abajo") {
                    this.x = 477;
                    this.y = 1000;
                    this.element.style.top = `${this.y}px`;
                    this.element.style.left = `${this.x}px`;
                    this.element.style.transform = `rotate(0deg)`;
                }

            }
    mover(){

        if ( this.origen == "izquierda" && this.destino == "recto"){
            if ((this.x < 75 || this.x > 85) || semaforo_ciclo == 2) {
                this.x += this.velocidad
            this.element.style.left = `${this.x}px`;
            }

            if (this.x >= 1000){
                this.ubicar()
            }
            
        }

        if ( this.origen == "derecha" && this.destino == "recto"){

            if ((this.x < 755 || this.x > 765) || semaforo_ciclo == 2) {
                this.x -= this.velocidad
            this.element.style.left = `${this.x}px`;
            }

            if (this.x <= -200){
                this.ubicar()
            }
            
        }

        if ( this.origen == "arriba" && this.destino == "recto"){
            if ((this.y < 75 || this.y > 85) || semaforo_ciclo == 1) {
                this.y += this.velocidad
            this.element.style.top = `${this.y}px`;
            }

            if (this.y >= 1000){
                this.ubicar()
            }
            
        }

        if ( this.origen == "abajo" && this.destino == "recto"){

            if ((this.y < 755 || this.y > 765) || semaforo_ciclo == 1) {
                this.y -= this.velocidad
            this.element.style.top = `${this.y}px`;
            }

            if (this.y <= -200){
                this.ubicar()
            }
        }
        

    }

}



setInterval(cambio_numero, 1000);

setInterval(cambio_countdown, 10);

setInterval(cambio_semaforo, (semaforo_tiempo * 1000));

numero_semaforo_label.innerText = semaforo_tiempo

function crear_autos() {

    console.log("aa")
}

const nuevoAuto = new Auto("1","izquierda", "recto")
const nuevoAuto2 = new Auto("2","derecha", "recto")
const nuevoAuto3 = new Auto("3","arriba", "recto")
const nuevoAuto4 = new Auto("4","abajo", "recto")
autos.push(nuevoAuto)
autos.push(nuevoAuto2)
autos.push(nuevoAuto3)
autos.push(nuevoAuto4)
nuevoAuto.ubicar()
nuevoAuto2.ubicar()
nuevoAuto3.ubicar()
nuevoAuto4.ubicar()

function actualizar() {
    autos.forEach(auto => {

            if (0 == 0) {
                auto.mover();
            }
            
        
      
    });
    
    requestAnimationFrame(actualizar); // Llamada recursiva para seguir actualizando
  }
  
  actualizar(); // Iniciar el bucle