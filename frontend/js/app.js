// ==========================
// NAVEGACIÓN SPA
// ==========================
const enlaces = document.querySelectorAll(".nav-link");

enlaces.forEach(function (enlace) {
  enlace.addEventListener("click", function (evento) {
    evento.preventDefault();

    const vista = enlace.dataset.view;

    document.querySelectorAll(".view").forEach(function (seccion) {
      seccion.classList.remove("active");
    });

    const targetView = document.getElementById("view-" + vista);
    if (targetView) {
      targetView.classList.add("active");
    }
  });
});

// ==========================
// PRODUCTOS
// ==========================
const productos = [
  { id: 1, 
    nombre: "Torta de Selva Negra", 
    imagen: "img/selva-negra.jpg", 
    descripcion: "Bizcocho de chocolate con crema chantilly y cerezas.", 
    precio: 12 },
  { id: 2, 
    nombre: "Red Velvet", 
    imagen: "img/red-velvet.jpg", 
    descripcion: "Bizcocho de color rojo intenso y crema de queso.", 
    precio: 12 },
  { id: 3, 
    nombre: "Torta De Tres Leches", 
    imagen: "img/tres-leches.jpg", 
    descripcion: "Bizcocho suave relleno de manjar blanco tradicional.", 
    precio: 10 },
  { id: 4, 
    nombre: "Torta De Pistacho", 
    imagen: "img/pistacho.jpg", 
    descripcion: "Una combinación elegante de bizcocho verde con frutos rojos.", 
    precio: 15 },
  { id: 5, 
    nombre: "Torta De chocolate", 
    imagen: "img/chocolate.jpg", 
    descripcion: "Clásica torta de chocolate con cobertura de fudge.", 
    precio: 15 },
  { id: 6, 
    nombre: "Torta De frutilla", 
    imagen: "img/frutilla.jpg", 
    descripcion: "Bizcocho de vainilla con trozos de frutilla fresca.", 
    precio: 15 },
  { id: 7, 
    nombre: "Torta De coco", 
    imagen: "img/coco.jpg", 
    descripcion: "Deliciosa torta con ralladura de coco tostado.", 
    precio: 15 },
  { id: 8, 
    nombre: "Torta De Nueces", 
    imagen: "img/nueces.jpg", 
    descripcion: "Bizcocho crocante con nueces seleccionadas.", 
    precio: 15 },
];

// ==========================
// ESTADO DEL CARRITO
// ==========================
let carrito = [];

// funcion para guardar datos del carrito
function guardarCarrito () {
  localStorage.setItem("aroma_carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("aroma_carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
}

// ==========================
// RENDER PRODUCTOS
// ==========================
function renderizarProductos() {
  const contenedor = document.getElementById("products-container");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  productos.forEach(function (producto) {
    contenedor.innerHTML += `
      <div class="product-card">
        <h3>${producto.nombre}</h3>
        <img class="imagen" src="${producto.imagen}" alt="${producto.nombre}">
        <p>${producto.descripcion}</p>
        <span class="product-price">Bs. ${producto.precio}</span>
        <button class="btn-add" data-id="${producto.id}">Agregar al carrito</button>
        <button class="btn-detalle" data-id="${producto.id}">Detalles</button>
      </div>
    `;
  });

  // Eventos botones agregar
  const botonesAdd = document.querySelectorAll(".btn-add");
  botonesAdd.forEach(function (boton) {
    boton.addEventListener("click", function () {
      const id = parseInt(this.dataset.id);
      const producto = productos.find((p) => p.id === id);
      const existente = carrito.find((p) => p.id === id);

      if (existente) {
        existente.cantidad += 1;
      } else {
        carrito.push({ ...producto, cantidad: 1 });
      }

      guardarCarrito();
      actualizarContador();
      renderizarCarrito();
    });
  });

  // Botón detalles
  const botonesDetalle = document.querySelectorAll(".btn-detalle");
  botonesDetalle.forEach(function (boton) {
    boton.addEventListener("click", function () {
      const id = this.dataset.id;
      const producto = productos.find((p) => p.id == id);
      alert("Detalles del producto: " + producto.nombre + " - " + producto.descripcion);
    });
  });
}

// ==========================
// CONTADOR CARRITO
// ==========================
function actualizarContador() {
  const contador = document.getElementById("cart-count");
  if (contador) {
    const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    contador.textContent = totalItems;
  }
}

// ==========================
// RENDER CARRITO
// ==========================
function renderizarCarrito() {
  const contenedor = document.getElementById("cart-container");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>El carrito está vacío</p>";
    return;
  }

  // Renderizar cada ítem con botones de cantidad
  carrito.forEach(function (producto) {
    contenedor.innerHTML += `
      <div class="cart-item">
        <p>${producto.nombre}</p>
        <div class="qty-controls">
            <button class="qty-btn" data-id="${producto.id}" data-action="decrease">-</button>
            <span>${producto.cantidad}</span>
            <button class="qty-btn" data-id="${producto.id}" data-action="increase">+</button>
        </div>
        <span>Bs. ${producto.precio * producto.cantidad}</span>
      </div>
    `;
  });

  // Calcular total
  const total = carrito.reduce((acc, producto) => {
    return acc + producto.precio * producto.cantidad;
  }, 0);

  // Resumen y botón de checkout
  contenedor.innerHTML += `
    <div class="cart-summary">
      <div class="cart-summary-row">
        <span>Subtotal</span>
        <span>Bs. ${total.toFixed(2)}</span>
      </div>
      <div class="cart-summary-row">
        <span>Envío</span>
        <span>Gratis 🎉</span>
      </div>
      <div class="cart-total-row">
        <span class="cart-total-label">Total</span>
        <span class="cart-total-amount">Bs. ${total.toFixed(2)}</span>
      </div>
      <button class="btn-checkout" id="btn-confirmar">
        🛍️ Confirmar Pedido
      </button>
    </div>
  `;

  // Evento para el botón de confirmar pedido
  document.getElementById("btn-confirmar").addEventListener("click", () => {
      alert('¡Pedido confirmado! Gracias por tu compra 🎉');
  });

  // Eventos para los botones + y − (ahora sí existen en el DOM)
  contenedor.querySelectorAll(".qty-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const id = parseInt(this.dataset.id);
      const accion = this.dataset.action;
      const item = carrito.find((p) => p.id === id);

      if (!item) return;

      if (accion === "increase") {
        item.cantidad += 1;
      } else if (accion === "decrease") {
        item.cantidad -= 1;
        if (item.cantidad <= 0) {
          carrito = carrito.filter((p) => p.id !== id);
        }
      }

      actualizarContador();
      renderizarCarrito();
    });
  });
}



function inicializarFormularioContacto() {
  const form = document.getElementById("contact-form");
  if(!form) return;


form.addEventListener("submit", function (e) {
  e.preventDefault();
const nombre = document.getElementById("contact-name");
const email = document.getElementById("contact-email");
const mensaje = document.getElementById("contact-message");

const errorNombre = document.getElementById("error-name");
const errorEmail = document.getElementById ("error-email");
const errorMensaje = document.getElementById("error-message");

const exito = document.getElementById("form-success");

errorNombre.textContent = "";
errorEmail.textContent = "";
errorMensaje.textContent = "";
exito.textContent = "";

nombre.classList.remove("input-error");
email.classList.remove("input-error");
mensaje.classList.remove("input-error");


let valido = true;

if(nombre.value.trim() ===""){
  errorNombre.textContent = "El nombre es obligatorio";
  nombre.classList.add("input-error");
  valido = false;
}
if(email.value.trim() ===""){
  errorEmail.textContent = "El email es obligatorio";
  email.classList.add("input-error");
  valido = false
}
if(mensaje.value.trim() ==="") {
  errorMensaje.textContent = "Introduce un mensaje";
  mensaje.classList.add("input-error");
  valido = false;
} 

if (!valido) return;

exito.textContent = "Mensaje enviado";
form.reset();
});

}


// ==========================
// INICIALIZAR
// ==========================
cargarCarrito();
renderizarProductos();
renderizarCarrito();
actualizarContador();
inicializarFormularioContacto();