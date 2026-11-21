//menu hamburguesa celular
const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu");

btnMenu.addEventListener("click", function () {
    menu.classList.toggle("abierto");
});
//año automatico
document.getElementById("anio").textContent = new Date().getFullYear();


//comentarios
const formComentario = document.getElementById("form-comentario");

if (formComentario) {
    const listaComentarios = document.getElementById("lista-comentarios");
    const clave = "comentarios-" + formComentario.dataset.episodio;
    let comentarios = JSON.parse(localStorage.getItem(clave)) || [];

    function mostrarComentarios() {
        listaComentarios.innerHTML = "";

        if (comentarios.length === 0) {
            listaComentarios.innerHTML = "<p>Aún no hay comentarios. ¡Sé el primero!</p>";
            return;
        }

        comentarios.forEach(function (c) {
            const caja = document.createElement("div");
            caja.className = "comentario";

            const autor = document.createElement("strong");
            autor.textContent = c.nombre;

            const texto = document.createElement("p");
            texto.textContent = c.texto;

            caja.appendChild(autor);
            caja.appendChild(texto);
            listaComentarios.appendChild(caja);
        });
    }

    formComentario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombre = document.getElementById("nombre-comentario").value.trim() || "Anónimo";
        const texto = document.getElementById("texto-comentario").value.trim();

        if (texto === "") return;

        comentarios.unshift({ nombre: nombre, texto: texto });
        localStorage.setItem(clave, JSON.stringify(comentarios));

        formComentario.reset();
        mostrarComentarios();
    });

    mostrarComentarios();
}
