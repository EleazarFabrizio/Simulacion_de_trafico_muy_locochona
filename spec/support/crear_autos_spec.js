
posibles_origenes = ["izquierda","derecha","arriba","abajo"]
lista_autos = []

function revisar_colision(){

    lista_autos.forEach(thiss => {

        lista_autos.forEach(auto => {

            if (thiss.x == auto.x && thiss.y == auto.y && thiss.id != auto.id) { thiss.ubicar(); auto.ubicar()}
        })
        
    })
    
}

class Auto {
    constructor(id) {
        this.id = id;
        this.x = 0;
        this.y = 0
        this.origen = posibles_origenes[0]

        this.ubicar();
        lista_autos.push(this);
     };
    

    ubicar() {
        if (this.origen == "izquierda") { this.x = -200; this.y = 50 }
        if (this.origen == "derecha") { this.x = 800; this.y = 100 }
    }

    mover() {

        
        
        if (this.origen == "izquierda") { this.x += 500}
        if (this.origen == "derecha") { this.x -= 500}

        if (this.x >= 1000 || this.x < -500) { this.ubicar() }
        
    }
}

describe("Pruebas de la clase Auto", function() {
    it("Debería crear un auto con un id único", function() {
        const auto = new Auto(1);
        expect(auto.id).toBe(1);
        expect(lista_autos.includes(auto)).toBe(true);
    });

    it("Debería ubicar el auto en la posición correcta", function() {
        const auto = new Auto(2);
        const auto2 = new Auto(3);
        auto2.origen = posibles_origenes[1]

        auto2.ubicar()
        auto.ubicar()
        expect(auto.x).toBe(-200);
        expect(auto.y).toBe(50);

        expect(auto2.x).toBe(800);
        expect(auto2.y).toBe(100);
    });

    it("Debería mover el auto correctamente", function() {
        const auto = new Auto(4);
        const auto2 = new Auto(5);
        
        auto.x = 0;
        auto2.x = 0;
        auto2.origen = "derecha"

        auto.mover()
        auto2.mover()

        if (auto.origen == "izquierda") {

        expect(auto.x).toBe(500);
        expect(auto.y).toBe(50);

        }

        if (auto2.origen == "derecha") {

            expect(auto2.x).toBe(-500);
            expect(auto2.y).toBe(50);
    
            }
    });

    it("Debería detener el auto y restablecer su posición", function() {
        const auto = new Auto(6);
        auto.x = 1200;
        auto.y = 100;
        auto.mover()
        expect(auto.x).toBe(-200);
        expect(auto.y).toBe(50);
    });

    it("Deberia reubicarse cuando hay otro auto muy cerca", function() {
        const auto = new Auto(7);
        const auto2 = new Auto(8)
        auto.x = 100;
        auto.y = 100;

        auto2.x = 100;
        auto2.y = 100;

        revisar_colision()

        expect(auto.x).toBe(-200);
        expect(auto.y).toBe(50);

        expect(auto2.x).toBe(-200);
        expect(auto2.y).toBe(50);
    });
});
