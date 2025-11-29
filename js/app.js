document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.botonAgregar');
    const productosCarrito = document.getElementById('productosCarrito');
    const totalCompra = document.getElementById('totalCompra');
    const totalProductos = document.getElementById('totalProductos');
    const vaciarCarritoBtn = document.getElementById('vaciarCarrito');

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const actualizarCarrito = () => {
        productosCarrito.innerHTML = '';
        let total = 0;
        let totalProd = 0;

        carrito.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto-en-carrito');
            productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="">
                <p>${producto.descripcion}</p>
                <p>${producto.precio}</p>
            `;
            productosCarrito.appendChild(productoDiv);
            total += parseInt(producto.precio.replace('$', '').replace('.', ''));
            totalProd += 1;
        });

        totalCompra.textContent = total.toLocaleString();
        totalProductos.textContent = totalProd;
    };

    const guardarCarrito = () => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    };

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const producto = e.target.closest('.producto');
            const descripcion = producto.querySelector('p').textContent;
            const precio = producto.querySelector('.precio').textContent;
            const imagen = producto.querySelector('img').src;

            carrito.push({ descripcion, precio, imagen });
            guardarCarrito();
            actualizarCarrito();

            alert('Se agregó al carrito');
        });
    });

    vaciarCarritoBtn.addEventListener('click', () => {
        carrito = [];
        guardarCarrito();
        actualizarCarrito();
    });

    actualizarCarrito();
});


//boton barra lateral tres rayas
function showSilebar(){
    const sidebar = document.querySelector('#silebar')
    sidebar.style.display = 'flex'
}
// boton barra lateral menu x
function hideSilebar(){
    const sidebar = document.querySelector('#silebar')
    sidebar.style.display = 'none'

}
//busqueda de la barra de busqueda 
document.getElementById('input_buscar').addEventListener('keyup', function() {
    let filter = this.value.toLowerCase();
    let productos = document.querySelectorAll('.producto');
    productos.forEach(function(producto) {
        let texto = producto.textContent.toLowerCase();
        if (texto.includes(filter)) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
});
// busqueda de coleccion
document.querySelectorAll('.coleccion-opciones a').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        let filter = this.getAttribute('data-filter');
        let productos = document.querySelectorAll('.producto');
        productos.forEach(function(producto) {
            if (producto.getAttribute('data-category').includes(filter)) {
                producto.style.display = 'block';
            } else {
                producto.style.display = 'none';
            }
        });
    });
});

//botones contactenenos preguntas frecuentes
function mostrarcontenido(id) {
    let elemento = document.getElementById(id);
    if (elemento.style.display === "none" || elemento.style.display === "") {
        elemento.style.display = "block";
    } else {
        elemento.style.display = "none";
    }
}
//formulario contactenos
function mostrarFomulario1() {
    const formSection = document.getElementById('contactenos-fomulario');
    if (formSection.style.display === 'none' || formSection.style.display === '') {
        formSection.style.display = 'block';
    } else {
        formSection.style.display = 'none';
    }
}
//boton registrarme
function btnregistrame(){
    alert('Tes has registrado exitosamente')
}
//boton compra
function btnCompra(){
    alert('Registro de compra exitoso')
}
//boton solicitud contactenos
function btnEnviar(){
    alert('Solicitud exitosa')
}

        
    




