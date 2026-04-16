//  function mostrarVista(vista){
//     document.getElementById("view-home").classList.remove("active");
//     document.getElementById("view-menu").classList.remove("active");
//     document.getElementById("view-contact").classList.remove("active");

// document.getElementById("view-" + vista).classList.add("active");

const enlaces = document.querySelectorAll(".nav-link");

enlaces.forEach(function (enlace) {
  enlace.addEventListener("click", function (evento) {
    evento.preventDefault();

    const vista = enlace.dataset.view;

    document.querySelectorAll(".view").forEach(function (seccion) {
      seccion.classList.remove("active");
    });

    document.getElementById("view-" + vista).classList.add("active");
  });
});



const productos = [
  {
    id: 1,
    nombre: "Torta de Selva Negra",
    Image: "img/selva-negra.jpg",
    descripcion: "Bizcocho de chocolate con crema chantilly y cerezas.",
    precio: 12,
  },
  {
    id: 2,
    nombre: "Red Velvet",
    descripcion: "Bizcocho de color rojo intenso y crema de queso.",
    precio: 12,
  },
  {
    id: 3,
    nombre: "Torta De Tres Leches",
    descripcion: "Bizcocho suave relleno de manjar blanco tradicional.",
    precio: 10,
  },
  {
    id: 4,
    nombre: "Torta De Pistacho",
    descripcion: "Una combinación elegante de bizcocho verde con frutos rojos.",
    precio: 15,
  },
  {
    id: 5,
    nombre: "Torta De chocolate",
    descripcion: "Una combinación elegante de bizcocho verde con frutos rojos.",
    precio: 15,
  },
    {
    id: 6,
    nombre: "Torta De frutilla",
    descripcion: "Una combinación elegante de bizcocho verde con frutos rojos.",
    precio: 15,
  },
    {
    id: 7,
    nombre: "Torta De coco",
    descripcion: "Una combinación elegante de bizcocho verde con frutos rojos.",
    precio: 15,
  },
    {
    id: 8,
    nombre: "Torta De Nueces",
    descripcion: "Una combinación elegante de bizcocho verde con frutos rojos.",
    precio: 15,
  },
];

/*---------------Contenedor de cada Producto-------------*/
function renderizarProductos () {
const contenedor = document.getElementById("products-container");
contenedor.innerHTML= "";
productos.forEach(function (producto) {
  contenedor.innerHTML += `<div class="product-card"> 
<img>${producto.imagen}</img>
<h3>${producto.nombre}</h3>
<p>${producto.descripcion}</p>
<span class="product-price">${producto.precio}</span>
<br>
<button class="btn-add" data-id="${producto.id}">Agregar al carrito</button>
<button class="btn-add detalle" data-id="${producto.id}">Detalles</button>
</div>`;
  });
  /*---------funcionamiento botones-----------*/
  /*------------btn agregar carrito---------*/
const botones = document.querySelectorAll(".btn-add");
console.log(botones);
botones.forEach(function (boton){
  boton.addEventListener("click", function() {
    const id = this.dataset.id;
    alert("Producto agregado:", + id  );
  })
});

// // // /*-----------------btn detalles--------------*/
//  const botonesdetalles = document.querySelectorAll(".btn-add detalle");
//  console.log(botones);
//  botones.forEach(function (boton){
//    boton.addEventListener("click", function() {
//      const id = this.dataset.id;
//      alert("Detalles:", + id  );
//    })
//  });
}
renderizarProductos(); 