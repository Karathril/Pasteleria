
//FUNCION AGREGAR LOCALSTORAGE
const clickAgregar = async (event) => {
  const tarjeta = event.target;
  const item = tarjeta.closest('.card-footer');
  const id_producto = item.querySelector('.id-product').textContent;
  try {
    const respuesta1 = await fetch('http://localhost:3000/products/'.concat(id_producto));
    if (respuesta1.status === 200) {
      const datos = await respuesta1.json();
      let datosArray = JSON.parse(localStorage.getItem('carrito')) || [];
      datosArray.push(datos);
      let datosJson = JSON.stringify(datosArray);
      localStorage.setItem('carrito', datosJson);
      mostrarProductosEnCarrito(datosArray);
    }
  } catch (error) {
    console.log(error);
  }
};

//FUNCION PARA MOSTRAR PRODUCTOS ELEGIDOS EN CARRITO
function mostrarProductosEnCarrito() {
  const datosArray = obtenerDatosDelCarrito();
  let cartas = '';
  let total = 0;
  datosArray.forEach(element=> {
    let title = element.name;
    let precio = element.price;
    let image = element.image;
    cartas += `
      <div class="cart-product">
        <div class="info-cart-product">
          <span class="count-cart-product">1</span>
          <img src="${image}" alt="" style="width: 80px; height: 80px;">
          <p class="title-cart-product">${title}</p>
          <span id="price-cart-product">${precio}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" id="icon-close" class="icon-close">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>                    
        </div>
      </div>`;
    total += parseFloat(precio);
  });
  let divFinal =`
    <div class="cart-total">
      <h3>Total: $${total}</h3>
      <button type="button" id="btn-pagar" class="btn btn-warning">Realizar Compra</button>
    </div>` 
  ;
  
  $('#cart-cards').html(cartas);
  $('#cart-cards').append(divFinal);
  EliminarDatoCarrito();
  agregarCantCart();

  const pagar = document.querySelector('#btn-pagar');
  if(datosArray.length==0){
    pagar.style.display = 'none';
  }
  
  pagar.addEventListener('click', () => {
    alert('¡Compra realizada!');
    eliminarTodosLosElementos();
  });
}
//OBTENER DATOS DEL LOCALSTORAGE A CARRITO
function obtenerDatosDelCarrito() {
  const datosString = localStorage.getItem('carrito');
  if (datosString) {
    return JSON.parse(datosString);
  } else {
    return [];
  }
}
//GUARDAR DATOS DEL CARRITO AL LOCALSTORAGE
function guardarDatosDelCarrito() {
  const datosString = JSON.stringify();
  localStorage.setItem('carrito', datosString);
}
// MOSTRAR CARRITO CON EVENTO CLICK
const btnCart = document.querySelector('.icon-cart');
const containerCartProducts = document.querySelector('.container-cart-products');
btnCart.addEventListener('click', () => {
  containerCartProducts.classList.toggle('hidden-cart');
  mostrarProductosEnCarrito();
});

//FUNCION PARA AGREGAR CONTADOR DE PRODUCTO AL CARRITO
function agregarCantCart(){
    dato = document.querySelectorAll('.cart-product');
    const cantidad = dato.length; 
    localStorage.setItem('cantCart',cantidad);
    $('.contador-productos').html(cantidad);
}
//RECUPERACION DE CONTADOR POR LOCALSTORAGE
function recuperarCantCart(){
  const cantidadStorage = localStorage.getItem('cantCart');
  $('.contador-productos').html(cantidadStorage);
}
// RECUPERAR AL CARGAR PAGINA
window.addEventListener('load', () => {
  mostrarProductosEnCarrito();
  recuperarCantCart();
});

//ELIMINAR PRODUCTO DEL CARRITO
function EliminarDatoCarrito() {
  const btnEliminar = document.querySelectorAll('.icon-close');
  btnEliminar.forEach((element, i) => {
    element.addEventListener('click', function() {
      const datosArray = obtenerDatosDelCarrito();
      datosArray.splice(0, 1);
      const largo = btnEliminar.length;
      if(largo===0){
        localStorage.removeItem('carrito');
      }else{
        localStorage.setItem('carrito', JSON.stringify(datosArray))
      }
      //ELIMINAR ELEMENTO EN EL DOM
      const fila = element.parentNode.parentNode;
      fila.remove();
      agregarCantCart();
      mostrarProductosEnCarrito();
    });
  });
}
//ELIMINAR TODOS LOS PRODUCTOS POR REALIZAR PAGO
function eliminarTodosLosElementos() {
  const btnEliminar = document.querySelectorAll('.icon-close');
  btnEliminar.forEach((element, i) => {
    const datosArray = obtenerDatosDelCarrito();
    datosArray.splice(0, datosArray.length); // Eliminar todos los elementos del array

    // Actualizar el almacenamiento local
    localStorage.removeItem('carrito');

    // ELIMINAR ELEMENTO EN EL DOM
    const fila = element.parentNode.parentNode;
    fila.remove();
  });
  agregarCantCart();
  mostrarProductosEnCarrito();
}
//FUNCION PARA OBTENER TODOS LOS DATOS
const loadAllProducts = async() => {
  //VERIFICACION
  try{
    const respuesta = await fetch('http://localhost:3000/products');
    //FILTRANDO TIPO DE STATUS
    if(respuesta.status===200){
      const datos = await respuesta.json();
      //FOREACH PARA RECORRER EL ARRAY DEL API
      let cartas = '';
      datos.forEach((producto, i) => {  
        const image = producto.image;
        image.src = producto.image;
        const title = producto.name;
        const description = producto.description;
        const id = producto.id;
        const precio = (producto.price).toLocaleString('es-CL');
        cartas +=  `
        <div class="col-12 col-md-3 col-sm-6 col-lg-3 mb-4">
          <div class="card">
            <img src="${image}" id="card-img" alt="...">
              <div class="card-body">
                  <h4 class="card-title">${title}</h4><br>
                  <p class="card-text">${description}</p>
                  <h5 class="card-title">$${precio}</h5>
              </div>
              <div class="card-footer">
                  <a href="#" id="btn-agregar" class="btn btn-success btn-agregar">Agregar al carrito</a>
                  <div class="id-product" style="display:none;">${id}</div>
              </div>  
          </div>
        </div>`
        ;
      });

      $('#info-cards-all').html(cartas);
      //AGREGAR ACCION BTN A TODOS LOS PRODUCTOS GENERADOS
      const btnAgregar = document.querySelectorAll('#info-cards-all #btn-agregar');
      btnAgregar.forEach(product => {
        product.removeEventListener('click', clickAgregar);
        product.addEventListener('click', clickAgregar);
      });
      
    }else if (respuesta.status===401) {
      console.log('La url API Invalida!');
    }else if (respuesta.status===404){
      console.log('Error, dato no existe');
    }else{
      console.log('se ha generado un error!');
    }
  }catch(error){
    console.log(error);
  }
}
//FUNCION PARA CARGAR PRODUCTOS CINNAMON ROLL
const loadCinnamons = async() => {
  //VERIFICACION
  try{
    const respuesta = await fetch('http://localhost:3000/categories/2/products');
    //FILTRANDO TIPO DE STATUS
    if(respuesta.status===200){
      const datos = await respuesta.json();
      //FOREACH PARA RECORRER EL ARRAY DEL API
      let cartas = '';
      datos.forEach((producto, i) => {
          const image = producto.image;
          image.src = producto.image;
          const title = producto.name;
          const description = producto.description;
          const id = producto.id;
          const precio = (producto.price).toLocaleString('es-CL');
          cartas +=  `
          <div class="col-12 col-md-3 col-sm-6 col-lg-3 mb-4">
            <div class="card">
              <img src="${image}" id="card-img" alt="...">
                <div class="card-body">
                    <h4 class="card-title">${title}</h4><br>
                    <p class="card-text">${description}</p>
                    <h5 class="card-title">$${precio}</h5>
                </div>
                <div class="card-footer">
                    <a href="#" id="btn-agregar" class="btn btn-success btn-agregar">Agregar al carrito</a>
                    <div class="id-product" style="display:none;">${id}</div>
                </div>  
            </div>
          </div>`
        ;
      });
      $('#info-cards-cinnamon').html(cartas);
      const btnAgregar = document.querySelectorAll('#info-cards-cinnamon #btn-agregar');
      btnAgregar.forEach(product => {
        product.removeEventListener('click', clickAgregar);
        product.addEventListener('click', clickAgregar);
      });
    }else if (respuesta.status===401) {
      console.log('La url API Invalida!');
    }else if (respuesta.status===404){
      console.log('Error, dato no existe');
    }else{
      console.log('se ha generado un error!');
    }
  }catch(error){
    console.log(error);
  }
}
//FUNCION PARA CARGAR PRODUCTOS TORTAS
const loadTortas = async() => {
  //VERIFICACION
  try{
    const respuesta = await fetch('http://localhost:3000/categories/1/products');
    //FILTRANDO TIPO DE STATUS
    if(respuesta.status===200){
      const datos = await respuesta.json();
      //FOREACH PARA RECORRER EL ARRAY DEL API
      let cartas = '';
      datos.forEach((producto, i) => {
          const image = producto.image;
          image.src = producto.image;
          const title = producto.name;
          const description = producto.description;
          const id = producto.id;
          const precio = (producto.price).toLocaleString('es-CL');
          cartas +=  `
          <div class="col-12 col-md-3 col-sm-6 col-lg-3 mb-4">
            <div class="card">
              <img src="${image}" id="card-img" alt="...">
                <div class="card-body">
                    <h4 class="card-title">${title}</h4><br>
                    <p class="card-text">${description}</p>
                    <h5 class="card-title">$${precio}</h5>
                </div>
                <div class="card-footer">
                    <a href="#" id="btn-agregar" class="btn btn-success btn-agregar">Agregar al carrito</a>
                    <div class="id-product" style="display:none;">${id}</div>
                </div>  
            </div>
          </div>`
          ;
      });
      $('#info-cards-tortas').html(cartas);

      const btnAgregar = document.querySelectorAll('#info-cards-tortas #btn-agregar');
      btnAgregar.forEach(product => {
        product.removeEventListener('click', clickAgregar);
        product.addEventListener('click', clickAgregar);
      });
    }else if (respuesta.status===401) {
      console.log('La url API Invalida!');
    }else if (respuesta.status===404){
      console.log('Error, dato no existe');
    }else{
      console.log('se ha generado un error!');
    }
  }catch(error){
    console.log(error);
  }
}
//FUNCION PARA CARGAR PRODUCTOS CUPCAKES
const loadCupcakes = async() => {
  //VERIFICACION
  try{
    const respuesta = await fetch('http://localhost:3000/categories/3/products');
    //FILTRANDO TIPO DE STATUS
    if(respuesta.status===200){
      const datos = await respuesta.json();
      //FOREACH PARA RECORRER EL ARRAY DEL API
      let cartas = '';
      datos.forEach((producto, i) => {
        const image = producto.image;
        image.src = producto.image;
        const title = producto.name;
        const description = producto.description;
        const id = producto.id;
        const precio = (producto.price).toLocaleString('es-CL');
        cartas +=  `
        <div class="col-12 col-md-3 col-sm-6 col-lg-3 mb-4">
          <div class="card">
            <img src="${image}" id="card-img" alt="...">
              <div class="card-body">
                  <h4 class="card-title">${title}</h4><br>
                  <p class="card-text">${description}</p>
                  <h5 class="card-title">$${precio}</h5>
              </div>
              <div class="card-footer">
                  <a href="#" id="btn-agregar" class="btn btn-success btn-agregar">Agregar al carrito</a>
                  <div class="id-product" style="display:none;">${id}</div>
              </div>  
          </div>
        </div>`
        ;
      });
      $('#info-cards-cupcakes').html(cartas);

      const btnAgregar = document.querySelectorAll('#info-cards-cupcakes #btn-agregar');
      btnAgregar.forEach(product => {
        product.removeEventListener('click', clickAgregar);
        product.addEventListener('click', clickAgregar);
      });

    }else if (respuesta.status===401) {
      console.log('La url API Invalida!');
    }else if (respuesta.status===404){
      console.log('Error, dato no existe');
    }else{
      console.log('se ha generado un error!');
    }
  }catch(error){
    console.log(error);
  }
}
//FUNCION PARA CARGAR PRODUCTOS PIE
const loadPie = async() => {
  //VERIFICACION
  try{
    const respuesta = await fetch('http://localhost:3000/categories/4/products');
    //FILTRANDO TIPO DE STATUS
    if(respuesta.status===200){
      const datos = await respuesta.json();
      //FOREACH PARA RECORRER EL ARRAY DEL API
      let cartas = '';
      datos.forEach((producto, i) => {
        const image = producto.image;
        image.src = producto.image;
        const title = producto.name;
        const description = producto.description;
        const id = producto.id;
        const precio = (producto.price).toLocaleString('es-CL');
        cartas +=  `
        <div class="col-12 col-md-3 col-sm-6 col-lg-3 mb-4">
          <div class="card">
            <img src="${image}" id="card-img" alt="...">
              <div class="card-body">
                  <h4 class="card-title">${title}</h4><br>
                  <p class="card-text">${description}</p>
                  <h5 class="card-title">$${precio}</h5>
              </div>
              <div class="card-footer">
                  <a href="#" id="btn-agregar" class="btn btn-success btn-agregar">Agregar al carrito</a>
                  <div class="id-product" style="display:none;">${id}</div>
              </div>  
          </div>
        </div>`
        ;
      });
      $('#info-cards-pie').html(cartas);

      const btnAgregar = document.querySelectorAll('#info-cards-pie #btn-agregar');
      btnAgregar.forEach(product => {
        product.removeEventListener('click', clickAgregar);
        product.addEventListener('click', clickAgregar);
      });
    

    }else if (respuesta.status===401) {
      console.log('La url API Invalida!');
    }else if (respuesta.status===404){
      console.log('Error, dato no existe');
    }else{
      console.log('se ha generado un error!');
    }
  }catch(error){
    console.log(error);
  }
}
//FUNCIONES PARA CARGAR PRODUCTOS
loadAllProducts();
loadCupcakes();
loadCinnamons();
loadTortas();
loadPie();
//OBTENER DIV DE LOS BOTONES
var botoncerrarSesion = document.getElementById('btn-inicio');
var botones1 = document.getElementById('botones1');
var botones2 = document.getElementById('botones2');
var labelCorreo = document.getElementById('labelCorreo');

//FUNCION PARA EL CORREO CON LOCALSTORAGE
function obtenerCorreoLocalStorage() {
  return localStorage.getItem('correo');
};
var correo = obtenerCorreoLocalStorage();
//FUNCION PARA CERRAR SESION
botoncerrarSesion.addEventListener('click', function() {
  localStorage.removeItem('correo');
});
//FUNCION PARA CAMBIAR LOS BOTONES POR USUARIO
sesionUsuario(botones1, botones2, correo);
function sesionUsuario(botones1, botones2, correo) {
  if (correo !== null) {
    botones1.style.display = "none";
    botones2.style.display = "block";
    cambiarContenidoLabel(correo);
    function cambiarContenidoLabel(nuevoContenido) {
      if (labelCorreo) {
        labelCorreo.textContent = nuevoContenido;
      }
    }
  }else{
    botones1.style.display = "block";
    botones2.style.display = "none";
    botoncerrarAdminis.style.display = "none";
    cambiarContenidoLabel("");
    function cambiarContenidoLabel(nuevoContenido) {
      if (labelCorreo) {
        labelCorreo.textContent = nuevoContenido;
      }
    }
  }
};



