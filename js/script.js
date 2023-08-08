/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * navbar toggle
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 * header sticky & back top btn active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
};

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
};

addEventOnElem(window, "scroll", headerSticky);

/**
 * scroll reveal effect
 */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
};

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

class Producto {
  constructor(
    idProducto,
    nombreProducto,
    precioProducto,
    unaImagen,
    cantidadProducto
  ) {
    this.id = idProducto;
    this.nombre = nombreProducto;
    this.precio = precioProducto;
    this.imagen = unaImagen;
    this.cantidad = cantidadProducto;
  }
}
class Sistema {
  constructor() {
    this.productos = [];
    this.agregarRegistro(1, "limpiador facial", 39.99, "./img/product-01.jpg");
    this.agregarRegistro(
      2,
      "Bio-shroom Rejuvenecimiento",
      39.99,
      "./img/product-02.jpg"
    );
    this.agregarRegistro(
      3,
      "Crema para ojos con cafeína en grano de café",
      39.99,
      "./img/product-03.jpg"
    );
    this.agregarRegistro(4, "limpiador de pies", 39.99, "./img/product-04.jpg");
    this.agregarRegistro(
      5,
      "Crema para oidos con cafeína en grano de café",
      39.99,
      "./img/product-05.jpg"
    );
    this.agregarRegistro(
      6,
      "limpiador de manos",
      39.99,
      "./img/product-06.jpg"
    );
    this.productos2 = [];
    this.agregarRegistro2(
      7,
      "limpiador de nariz",
      39.99,
      "./img/product-07.jpg"
    );
    this.agregarRegistro2(8, "crema para uñas", 39.99, "./img/product-08.jpg");
    this.agregarRegistro2(
      9,
      "perfume fragancia Coco",
      39.99,
      "./img/product-09.jpg"
    );
    this.agregarRegistro2(10, "gotas canabicas", 39.99, "./img/product-10.jpg");
    this.agregarRegistro2(
      11,
      "aromatizador fragancia Natural",
      39.99,
      "./img/product-11.jpg"
    );
    this.agregarRegistro2(
      12,
      "aromatizado fragancia Naranja",
      39.99,
      "./img/product-15.jpg"
    );
    this.agregarRegistro2(
      12,
      "gotas de jengibre para el pelo",
      39.99,
      "./img/product-16.jpg"
    );
    this.agregarRegistro2(
      12,
      "perfume de ropa fragancia Frutilla",
      39.99,
      "./img/product-17.jpg"
    );
  }
  agregarRegistro(id, nombre, precio, imagen) {
    const producto = new Producto(id, nombre, precio, imagen);
    this.productos.push(producto);
  }
  agregarRegistro2(id, nombre, precio, imagen) {
    const producto = new Producto(id, nombre, precio, imagen);
    this.productos2.push(producto);
  }

  darProductos() {
    return this.productos;
  }
}
let sistema = new Sistema();

const productos = sistema.darProductos();
function registrosPorId(id) {
  return productos.filter((producto) => producto.id == id);
}

class Carrito {
  constructor() {
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
    this.carrito = carritoStorage || [];
    this.total = 0;
    this.totalProductos = 0;
    this.listar();
  }
  agregarProductoCarrito(producto) {
    const productoEnCarrito = this.estaEnCarrito(producto);
    if (productoEnCarrito) {
      productoEnCarrito.cantidad++;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
    this.listar();
  }
  vaciar() {
    this.carrito = [];
    localStorage.removeItem("carrito");
    this.listar();
  }

  estaEnCarrito({ id }) {
    return this.carrito.find((producto) => producto.id === id);
  }

  listar() {
    this.total = 0;
    this.totalProductos = 0;
    const divCarrito = document.querySelector("#divCarro");
    divCarrito.innerHTML = "";
    for (const producto of this.carrito) {
      divCarrito.innerHTML += `
         
          <div class="producto">
          <div class="lista_de_productos">
            <img src= ${producto.imagen} />
            <p>${producto.nombre}</p>
            <p>$${producto.precio}</p>
            <p >${producto.cantidad}</p>
            <a href="#" data-id="${producto.id}" class="btn btnQuitar">X</a>
          </div>
          <a 
            data-id="${producto.id}"
            class="button-vaciarCarrito"
            id="botonvaciarCarrito"
          >
            Vaciar Carrito
          </a>
        </div>`;

      this.total += producto.precio * producto.cantidad;
      this.totalProductos += producto.cantidad;
    }
    divCarrito.innerHTML += `<button id="botonComprar" class="btn">Comprar</button>`;
    if (this.totalProductos > 0) {
      botonComprar.classList.remove("oculto");
    } else {
      botonComprar.classList.add("oculto");
    }
    const botonesQuitar = document.querySelectorAll(".btnQuitar");
    for (const boton of botonesQuitar) {
      boton.onclick = (event) => {
        event.preventDefault();
        this.quitar(boton.dataset.id);
      };
    }
    document.getElementById("cantidadProductos").innerText =
      "Cantidad de productos: " + this.totalProductos;
    document.getElementById("totalCarrito").innerText = +this.total;
  }
  quitar(id) {
    const indice = this.carrito.findIndex((producto) => producto.id === id);
    if (this.carrito[indice].cantidad > 1) {
      this.carrito[indice].cantidad--;
    } else {
      this.carrito.splice(indice, 1);
    }
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
    this.listar();
    document
      .getElementById("botonComprar")
      .addEventListener("click", (event) => {
        event.preventDefault();

        // Vacíamos el carrito
        carrito.vaciar();
      });
  }
}

function cargarProductos(productos) {
  let divProductos = document.getElementById("contenedor-productos");
  divProductos.innerHTML = "";
  for (const producto of productos) {
    divProductos.innerHTML += `  <li class="scrollbar-item">
      <div class="shop-card">
        <div
          class="card-banner img-holder"
          style="--width: 540; --height: 720"
        >
          <img
            src="${producto.imagen}"
            width="540"
            height="720"
            loading="lazy"
            alt="Facial cleanser"
            class="img-cover"
          />

          <span class="badge" aria-label="20% off">-20%</span>

          <div class="card-actions">
            <button class="action-btn carrito botonAgregar" aria-label="add to cart" data-id="${producto.id}">
              <ion-icon
                name="bag-handle-outline"
                aria-hidden="true"
              ></ion-icon>
            </button>

            <button class="action-btn carrito" aria-label="add to whishlist">
              <ion-icon
                name="star-outline"
                aria-hidden="true"
              ></ion-icon>
            </button>

            <button class="action-btn carrito" aria-label="compare">
              <ion-icon
                name="repeat-outline"
                aria-hidden="true"
              ></ion-icon>
            </button>
          </div>
        </div>

        <div class="card-content">
          <div class="price">
            <del class="del">$${producto.precio}</del>  

            <span class="span">$29.00</span> 
          </div>

          <h3>
            <a href="#" class="card-title"> ${producto.nombre}</a>
          </h3>

          <div class="card-rating">
            <div class="rating-wrapper" aria-label="5 start rating">
              <ion-icon name="star" aria-hidden="true"></ion-icon>
              <ion-icon name="star" aria-hidden="true"></ion-icon>
              <ion-icon name="star" aria-hidden="true"></ion-icon>
              <ion-icon name="star" aria-hidden="true"></ion-icon>
              <ion-icon name="star" aria-hidden="true"></ion-icon>
            </div>

            <p class="rating-text">5170 reviews</p>
          </div>
        </div>
      </div>
    </li>`;
  }
  const botonesAgregar = document.querySelectorAll(".botonAgregar");
  for (const boton of botonesAgregar) {
    boton.addEventListener("click", (e) => {
      e.preventDefault();
      const id = boton.dataset.id;
      const producto = registrosPorId(id);
      carrito.agregarProductoCarrito(producto[0]);
    });
  }
}

function cargarProductos2(productos) {
  let divProductos = document.getElementById("contenedor-productos2");
  divProductos.innerHTML = "";
  for (const producto of productos) {
    divProductos.innerHTML += `  <li class="scrollbar-item">
      <div class="shop-card">
        <div
          class="card-banner img-holder"
          style="--width: 540; --height: 720"
        >
          <img
            src="${producto.imagen}"
            width="540"
            height="720"
            loading="lazy"
            alt="Facial cleanser"
            class="img-cover"
          />

          <span class="badge" aria-label="20% off">-20%</span>

          <div class="card-actions">
            <button class="action-btn carrito botonAgregar" aria-label="add to cart" data-id="${producto.id}">
              <ion-icon
                name="bag-handle-outline"
                aria-hidden="true"
              ></ion-icon>
            </button>

            <button class="action-btn carrito" aria-label="add to whishlist">
              <ion-icon
                name="star-outline"
                aria-hidden="true"
              ></ion-icon>
            </button>

            <button class="action-btn carrito" aria-label="compare">
              <ion-icon
                name="repeat-outline"
                aria-hidden="true"
              ></ion-icon>
            </button>
          </div>
        </div>

        <div class="card-content">
          <div class="price">
            <del class="del">$${producto.precio}</del>  

            <span class="span">$29.00</span> 
          </div>

          <h3>
            <a href="#" class="card-title"> ${producto.nombre}</a>
          </h3>

          <div class="card-rating">
            <div class="rating-wrapper" aria-label="5 start rating">
              <ion-icon name="star" aria-hidden="true"></ion-icon>
              <ion-icon name="star" aria-hidden="true"></ion-icon>
              <ion-icon name="star" aria-hidden="true"></ion-icon>
              <ion-icon name="star" aria-hidden="true"></ion-icon>
              <ion-icon name="star" aria-hidden="true"></ion-icon>
            </div>

            <p class="rating-text">5170 reviews</p>
          </div>
        </div>
      </div>
    </li>`;
  }
}
let carrito = new Carrito();

cargarProductos(sistema.productos);
cargarProductos2(sistema.productos2);
