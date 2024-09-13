const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const totalPrecio = document.getElementById('total-precio'); 

let total = 0; 


cargarEventListeners();

function cargarEventListeners() {
  elementos1.addEventListener('click', comprarElemento);
  carrito.addEventListener('click', eliminarElemento);
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}


function comprarElemento(e) {
  e.preventDefault();
  if (e.target.classList.contains('agregar-carrito')) {
    const elemento = e.target.parentElement.parentElement;
    leerDatosElemento(elemento);
  }
}


function leerDatosElemento(elemento) {
  const infoElemento = {
    imagen: elemento.querySelector('img').src,
    titulo: elemento.querySelector('h3').textContent,
    precio: parseFloat(elemento.querySelector('.precio').textContent.replace('€', '')),
    id: elemento.querySelector('a').getAttribute('data-id')
  };
  insertarCarrito(infoElemento);
}


function insertarCarrito(elemento) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><img src="${elemento.imagen}" width=100></td>
    <td>${elemento.titulo}</td>
    <td>${elemento.precio} €</td>
    <td><a href="#" class="borrar" data-id="${elemento.id}">X</a></td>
  `;
  lista.appendChild(row);

 
  total += elemento.precio;
  actualizarTotal();
}


function eliminarElemento(e) {
  e.preventDefault();
  if (e.target.classList.contains('borrar')) {
    const elemento = e.target.parentElement.parentElement;
    const precio = parseFloat(elemento.querySelector('td:nth-child(3)').textContent.replace('€', ''));
    
   
    total -= precio;
    actualizarTotal();

    elemento.remove();
  }
}


function vaciarCarrito() {
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
  total = 0; 
  actualizarTotal();
}


function actualizarTotal() {
  totalPrecio.textContent = total.toFixed(2);
}