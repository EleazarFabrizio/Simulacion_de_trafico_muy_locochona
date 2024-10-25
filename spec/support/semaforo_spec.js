const semaforo = {
    semaforo_estado: "rojo",
    cambio_semaforo: function() {
        this.semaforo_estado = this.semaforo_estado === "rojo" ? "verde" : "rojo";
    }
};

describe("Pruebas de funcionamiento del semáforo", function() {

    it("Debería cambiar el color del semáforo", function() {

        semaforo.cambio_semaforo();
        expect(semaforo.semaforo_estado).toBe("verde");
    });
});
