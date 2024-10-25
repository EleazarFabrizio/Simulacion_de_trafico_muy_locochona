
const semaforo_imagen = document.getElementById("semaforo_imagen")

const numero_semaforo_label = document.getElementById("countdown_number")

const semaforo_countdown = document.getElementById("semaforo_countdown")

const main_div = document.getElementById("main_div")

function random (max, min) {
    return Math.floor(  Math.random() * ( max - min) + min ) ;
}

let color_autos = ["morado", "azul", "azul", "azul","negro","celeste"]
let color_random = 0;
const autos = [];
let origenes_posibles = ["izquierda", "derecha", "arriba", "abajo"];
let destinos_posibles = ["izquierda", "derecha","arriba","abajo"];


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

    //console.log(autos)
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

    if (numero_semaforo == 3) {
        
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

class Explosion {

    constructor(x,y){

        this.x = x;
        this.y = y-130
    
        this.element = document.createElement("img");
        this.element.classList.add('explosion');

                        
        this.element.style.position = "absolute";

        main_div.appendChild(this.element);
        this.element.style.top = `${this.y}px`;
        this.element.style.left = `${this.x}px`;
        this.element.src = `/imagenes/explosion.gif`;
    }
    
    end_explosion(){
        this.element.remove();
    }
    end_explosion_trigger(){
        setTimeout(()=> this.end_explosion(),700);
    }
    
}

class Auto {

    constructor(id){
        this.id = id;
        this.origen = "";
        this.direccion = "";
        this.destino = "";
        this.velocidad = 0;
        this.green_flag_advance = 1;
        this.estado = "idle"

        this.peligro = "safe"
        

        this.element = document.createElement("img");
        this.element.classList.add('auto');

        
        this.element.style.position = "absolute";

        main_div.appendChild(this.element);
    }

    ubicar() {

                
                

                this.velocidad = random(3,9)
                this.estado = "idle"

                color_random = color_autos[random(0,color_autos.length)]
                this.element.src = `/imagenes/autos/${color_random}.png`;
                
                this.peligro = "safe"
                if (random(0,100) <= 50) { 
                    this.peligro = "maniac"
                    this.element.src = `/imagenes/autos/rojo.png`
                }

                if (this.peligro == "maniac"){
                    this.element.src = `/imagenes/autos/rojo.png`
                }

                
                this.origen = `${origenes_posibles[random(0,origenes_posibles.length)]}`;
                this.destino = ""/*`${destinos_posibles[random(0,destinos_posibles.length)]}`*/
                //this.origen = "izquierda"
                //this.destino = "arriba"
                

                let cantidad_en_fila = 0;
                autos.forEach(auto => {
                    if (auto.origen == this.origen) { cantidad_en_fila += 1}
                })

                if (this.origen == "izquierda") {
                    this.direccion = "derecha"
                    this.x = -200 - (300 * cantidad_en_fila);
                    this.y = 478;
                    this.element.style.transform = `rotate(90deg)`;
                }

                if (this.origen == "derecha") {
                    this.direccion = "izquierda"
                    this.x = 1000 + (150 * cantidad_en_fila);
                    this.y = 362;
                    this.element.style.transform = `rotate(-90deg)`;
                }

                if (this.origen == "arriba") {
                    this.direccion = "abajo"
                    this.x = 367;
                    this.y = -200 - (200 * cantidad_en_fila);
                    this.element.style.transform = `rotate(180deg)`;
                }

                if (this.origen == "abajo") {
                    this.direccion = "arriba"
                    this.x = 477;
                    this.y = 1000 + (200 * cantidad_en_fila);
                    this.element.style.transform = `rotate(0deg)`;
                }

                this.element.style.top = `${this.y}px`;
                this.element.style.left = `${this.x}px`;

            }
    mover(){

        autos.forEach(auto => {

            if ((  ((this.x < auto.x + 100) && (this.x > auto.x - 100)) && ((this.y < auto.y + 100) && (this.y > auto.y - 100))  ) && auto.id != this.id) {


                if (  (this.x >=-200 && this.x <= 1000) && (this.y >= -200 && this.y <= 1000)  ) {
                
                    const new_explosion = new Explosion(this.x,this.y)
                    const new_explosion2 = new Explosion(auto.x,auto.y)
                    new_explosion.end_explosion_trigger()
                    new_explosion2.end_explosion_trigger()
                }
                auto.ubicar()
                this.ubicar()

            }

            
            });

        if ( this.direccion == "derecha"){
            if ((this.x < 75 || this.x > 85) || semaforo_ciclo == 2) {

                this.green_flag_advance = 1;
                autos.forEach(auto => {
                    
                    if ( (auto.direccion == this.direccion) && this.x < auto.x && (this.x + (this.velocidad) >= (auto.x - 160)) && auto.id != this.id) { this.green_flag_advance = 0}
                    if (auto.estado == "cruzando_vertical" && (this.x > 75 && this.x < 85) && this.peligro == "safe") {this.green_flag_advance = 0}
                    
                })
                if (this.green_flag_advance == 1) {
                    this.x += this.velocidad
                }
                  
            this.element.style.left = `${this.x}px`;

            }
            //Voy a empezar a escribir comentarios pues ya me canse de perderme en el codigo XDD

            if ( ( this.x >= 75 && this.destino=="arriba" && this.estado == "idle" ) && semaforo_ciclo == 2) {
                this.distancia_girando_x = ( (477 - this.x) / 20);
                this.distancia_girando_y = ( (80 - this.y) / 20);

                console.log(this.distancia_girando_x , this.distancia_girando_y)
                this.estado = "girando"
                this.direccion = "idle"
            }
            
            // Esto se fija de que haya curzado el semaforo y que este se encuentre en verde. Entonces se considerara cruzando hasta que llegue al otro lado
            if ( this.x >= 85 && semaforo_ciclo == 2) { this.estado = "cruzando_horizontal"}
            // Ya paso? Pues ahora ya no se encuentra en estado cruzando
            if (this.x >= 760) {
                this.estado = "idle"
            }
            if (this.x >= 1000){
                this.ubicar()
            }
            
        }

        if ( this.direccion == "izquierda"){

            if ((this.x < 755 || this.x > 765) || semaforo_ciclo == 2) {

                this.green_flag_advance = 1;
                autos.forEach(auto => {
                    
                    if ( (auto.direccion == this.direccion) && this.x > auto.x && (this.x - (this.velocidad) <= (auto.x + 160)) && auto.id != this.id) { this.green_flag_advance = 0}
                    if (auto.estado == "cruzando_vertical" && (this.x > 755 && this.x < 765) && this.peligro == "safe") {this.green_flag_advance = 0}
                })
                if (this.green_flag_advance == 1) {
                this.x -= this.velocidad
                }

                this.element.style.left = `${this.x}px`;
            }

            if ( this.x <= 755 && semaforo_ciclo == 2) { this.estado = "cruzando_horizontal"}

            if (this.x <= 80) {
                this.estado = ""
            }
            if (this.x <= -200){
                this.ubicar()
            }
            
        }

        if ( this.direccion == "abajo"){
            if ((this.y < 75 || this.y > 85) || semaforo_ciclo == 1) {

                this.green_flag_advance = 1;
                autos.forEach(auto => {
                    
                    if ((auto.origen == this.origen && auto.direccion == this.direccion) && (this.y < auto.y) && ((this.y + this.velocidad) >= (auto.y - 170)) && (auto.id != this.id)) { this.green_flag_advance = 0}
                    if (auto.estado == "cruzando_horizontal" && (this.y > 75 && this.y < 85) && this.peligro == "safe") {this.green_flag_advance = 0}
                })
                if (this.green_flag_advance == 1) {
                    this.y += this.velocidad
                }
                
            this.element.style.top = `${this.y}px`;
            }

            if ( this.y >= 85 && semaforo_ciclo == 1) { this.estado = "cruzando_vertical"}

            if (this.y >= 765) {
                this.estado = "idle"
            }
            if (this.y >= 1000){
                this.ubicar()
            }
            
        }

        if ( this.direccion == "arriba"){

            if ((this.y < 755 || this.y > 765) || semaforo_ciclo == 1) {

                this.green_flag_advance = 1;
                autos.forEach(auto => {
                    
                    if ((auto.origen == this.origen && auto.direccion == this.direccion) && (this.y > auto.y) && ((this.y - this.velocidad) <= (auto.y + 170)) && auto.id != this.id) { this.green_flag_advance = 0}
                    if (auto.estado == "cruzando_horizontal" && (this.y > 755 && this.y < 765) && this.peligro == "safe") {this.green_flag_advance = 0}
                })
                if (this.green_flag_advance == 1) {
                    this.y -= this.velocidad
                }
            this.element.style.top = `${this.y}px`;
            }

            if ( this.y <= 755 && semaforo_ciclo == 1) { this.estado = "cruzando_vertical"}

            if (this.y <= 75) {
                this.estado = "idle"
            }

            if (this.y <= -200){
                this.ubicar()
            }
        }

        // LOGICA DE GIRAR HACIA ARRIBA
        if (this.destino == "arriba" && this.estado == "girando") {

            console.log(this.distancia_girando_x);
            this.x += this.velocidad;
            console.log(this.distancia_girando_y);
            this.y += this.velocidad;
            
            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;
            console.log(this)

            if (this.x == 477 && this.y == 80)
                console.log(this.distancia_girando_x , this.distancia_girando_y)
                this.direccion = "arriba"
                this.estado = "pollo"

        }

    }

}



setInterval(cambio_numero, 1000);

setInterval(cambio_countdown, 10);

setInterval(cambio_semaforo, (semaforo_tiempo * 1000));

numero_semaforo_label.innerText = semaforo_tiempo

function crear_autos(min,max) {

    for (let i = 0; i < random(min,max); i++){
        const nuevoAuto = new Auto(autos.length)
        autos.push(nuevoAuto)
        nuevoAuto.ubicar()
    }
}

crear_autos(20,20)



function actualizar() {
    autos.forEach(auto => {

            if (0 == 0) {
                auto.mover();
            }
            
    });
    
    requestAnimationFrame(actualizar); // Llamada recursiva para seguir actualizando
  }
  
  actualizar(); // Iniciar el bucle

  Object.defineProperty(window, 'aaa', {
    get: function () {
        console.log(autos)
    }
  });
