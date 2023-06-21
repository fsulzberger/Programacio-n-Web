
const baseDeDatos = [
    {
      id: 1,
      nombre: 'Tour por Múnich',
      descripcion: 'Disfruta de un recorrido gratuito por los principales lugares de interés de Múnich.',
      precio: 10,
      imagen: 'munich.jpg'
    },
    {
      id: 2,
      nombre: 'Excursión Castillo Neuschwanstein y Palacio Linderhof',
      descripcion: "En esta excursión desde Múnich al castillo de Neuschwanstein y al palacio de Linderhof descubriremos todos los enigmas que rodean a la figura del 'rey loco' y los bellos parajes de Baviera.",
      precio: 20,
      imagen: 'neuschwanstein.jpg'
    },
    {
      id: 3,
      nombre: 'Excursión al campo de concentración de Dachau',
      descripcion: "La excursión al campo de concentración de Dachau desde Múnich es un Paseo por la terrible historia del siglo XX. Allí conoceremos de forma detallada la parte más oscura de un gobierno dictatorial.",
      precio: 10,
      imagen: "dachau.jpg"
    },
    {
      id: 4,
      nombre: 'Visita guiada por la Residencia de Múnich',
      descripcion: "¿Conoces los secretos de la familia Wittelsbach? Te los desvelaremos con esta visita guiada por la Residencia de Múnich, el palacio urbano más grande de Alemania.",
      precio: 10,
      imagen: 'residenz.jpg'
    },
    {
      id: 5,
      nombre: 'Tour de la cerveza por Múnich',
      descripcion: "En este tour de la cerveza por Múnich descubriremos los secretos de la bebida más popular en Alemania. Conoceremos la arraigada tradición cervecera de Baviera y disfrutaremos de una cata.",
      precio: 10,
      imagen: 'oktober.jpg'
    },
    {
      id: 6,
      nombre: 'Visita guiada por el Olympiapark y el Jardín Inglés',
      descripcion: "Explora dos lugares con mucha historia en la ciudad de Múnich con esta visita guiada por el Olympiapark y el Jardín Inglés. Descubrirás los secretos de los Juegos Olímpicos de 1972, ¡no pierdas detalles!",
      precio: 10,
      imagen: 'olympia2.jpeg'
    }
  ];
  
let carrito = [];
const divisa = '€';
const DOMproductos = document.querySelector('#productos');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DOMbotonFinalizar = document.querySelector('#boton-finalizar');
const DOMbotonSeguirComprando = document.querySelector('#boton-seguir-comprando');


DOMbotonSeguirComprando.addEventListener('click', function() {
  window.location.href = 'carrito.html'; 
});

function guardarCarritoEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDesdeLocalStorage() {
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    renderizarCarrito();
  }
}

function renderizarProductos() {
  baseDeDatos.forEach((info) => {
    const miNodo = document.createElement('div');
    miNodo.classList.add('card');
    miNodo.style.flexBasis = '30%';
    miNodo.dataset.id = info.id;

    const miNodoImagen = document.createElement('img');
    miNodoImagen.classList.add('card-img-top');
    miNodoImagen.setAttribute('src', info.imagen);
    miNodoImagen.style.height = '200px';
    miNodoImagen.style.width = '100%';

    const miNodoCardBody = document.createElement('div');
    miNodoCardBody.classList.add('card-body');

    const miNodoTitle = document.createElement('h5');
    miNodoTitle.classList.add('card-title');
    miNodoTitle.textContent = info.nombre;

    const miNodoDescripcion = document.createElement('p');
    miNodoDescripcion.classList.add('card-text');
    miNodoDescripcion.textContent = info.descripcion;

    const miNodoPrecio = document.createElement('p');
    miNodoPrecio.classList.add('card-text');
    miNodoPrecio.textContent = divisa + info.precio;

    const miNodoBoton = document.createElement('button');
    miNodoBoton.classList.add('btn', 'btn-primary');
    miNodoBoton.textContent = 'Agregar al carrito';
    miNodoBoton.style.marginRight = '5px';
    miNodoBoton.setAttribute('marcador', info.id);
    miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);

    miNodoCardBody.appendChild(miNodoTitle);
    miNodoCardBody.appendChild(miNodoDescripcion);
    miNodoCardBody.appendChild(miNodoPrecio);
    miNodoCardBody.appendChild(miNodoBoton);
    miNodo.appendChild(miNodoImagen);
    miNodo.appendChild(miNodoCardBody);
    DOMproductos.appendChild(miNodo);
  });
}

function renderizarCarrito() {
  DOMcarrito.textContent = '';

  carrito.forEach((item) => {
    const miNodo = document.createElement('li');
    miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
    miNodo.textContent = `${item.nombre} - ${divisa}${item.precio} x ${item.cantidad}`;
    miNodo.style.marginTop = '10px';
    miNodo.style.marginBottom = '10px';

    const miNodoBoton = document.createElement('button');
    miNodoBoton.classList.add('btn', 'btn-danger', 'mx-5');
    miNodoBoton.textContent = 'X';
    miNodoBoton.style.marginRight = '5px';
    miNodoBoton.dataset.item = item.id;
    miNodoBoton.addEventListener('click', borrarItemCarrito);

    miNodo.appendChild(miNodoBoton);
    DOMcarrito.appendChild(miNodo);
  });

  const total = carrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0);
  DOMtotal.textContent = 'Total: ' + divisa + total.toFixed(2);
}

function anyadirProductoAlCarrito(evento) {
  const idProducto = evento.target.getAttribute('marcador');
  const productoEnCarrito = carrito.find((item) => item.id === parseInt(idProducto));

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({
      id: baseDeDatos[idProducto - 1].id,
      nombre: baseDeDatos[idProducto - 1].nombre,
      precio: baseDeDatos[idProducto - 1].precio,
      cantidad: 1
    });
  }

  guardarCarritoEnLocalStorage();
  renderizarCarrito();
}

function borrarItemCarrito(evento) {
  const idProducto = evento.target.dataset.item;
  const productoEnCarrito = carrito.find((item) => item.id === parseInt(idProducto));

  if (productoEnCarrito.cantidad > 1) {
    productoEnCarrito.cantidad--;
  } else {
    carrito = carrito.filter((item) => item.id !== parseInt(idProducto));
  }

  guardarCarritoEnLocalStorage();
  renderizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  guardarCarritoEnLocalStorage();
  renderizarCarrito();
}

function finalizarCompra() {
  vaciarCarrito();
  alert('¡Gracias por tu compra!');
}

DOMbotonVaciar.addEventListener('click', vaciarCarrito);
DOMbotonFinalizar.addEventListener('click', finalizarCompra);

cargarCarritoDesdeLocalStorage();
renderizarProductos();
renderizarCarrito();
