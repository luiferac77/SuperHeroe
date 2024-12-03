document.addEventListener('DOMContentLoaded', () => {
    console.log("Dashboard cargado con éxito");
    //script para agregar poderes
    let contadorDePoderes = 1;
    document.getElementById('agregarPoder').addEventListener('click', () => {
        contadorDePoderes++;
        const poderesContenedor = document.getElementById('poderes');
        const nuevoPoderContenedor = document.createElement('div');
        nuevoPoderContenedor.classList.add('poder-container');
        nuevoPoderContenedor.innerHTML = `
            <input type="text" name="poderes[]" id="poder${contadorDePoderes}" required>
        `;

        poderesContenedor.appendChild(nuevoPoderContenedor);
    });
});