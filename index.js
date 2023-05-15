//VARIABLES
let carrito = [];
var id=0;

//FUNCION AGREGAR LOCALSTORAGE
const clickAgregar = async (event) => {
  const tarjeta = event.target;
  const item = tarjeta.closest('.card-body');
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
function mostrarProductosEnCarrito(datosArray) {
  let cartas = '';
  datosArray.forEach(element => {
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>                    
        </div>
      </div>`;
  });
  let divFinal =`
    <div class="cart-total">
      <h3>Total:</h3>
      <span class="total-pagar"></span>
    </div>` 
  ;
  $('#cart-cards').html(cartas);
  $('#cart-cards').append(divFinal);

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
        cartas +=  `
          <div class="col-12 col-md-3 col-sm-6 col-lg-3 mb-4">
              <div class="card">
                  <img src="${image}" id="card-img" alt="...">
                  <div class="card-body">
                      <h5 class="card-title">${title}</h5>
                      <p class="card-text">${description}</p>
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
      const cards = document.querySelectorAll('.card');
      let cartas = '';
      datos.forEach((producto, i) => {
          const image = producto.image;
          image.src = producto.image;
          const title = producto.name;
          const description = producto.description;
          const id = producto.id;
          cartas +=  `
            <div class="col-12 col-md-3 col-sm-6 col-lg-3 mb-4">
                <div class="card">
                    <img src="${image}" id="card-img" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${description}</p>
                        <a href="#" id="btn-agregar" class="btn btn-success">Agregar al carrito</a>
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
      const cards = document.querySelectorAll('.card');
      let cartas = '';
      datos.forEach((producto, i) => {
          const image = producto.image;
          image.src = producto.image;
          const title = producto.name;
          const description = producto.description;
          const id = producto.id;
          cartas +=  `
            <div class="col-12 col-md-3 col-sm-6 col-lg-3 mb-4">
                <div class="card">
                    <img src="${image}" id="card-img" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${description}</p>
                        <a href="#" id="btn-agregar" class="btn btn-success">Agregar al carrito</a>
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
        cartas +=  `
          <div class="col-12 col-md-3 col-sm-6 col-lg-3 mb-4">
              <div class="card">
                  <img src="${image}" id="card-img" alt="...">
                  <div class="card-body">
                      <h5 class="card-title">${title}</h5>
                      <p class="card-text">${description}</p>
                      <a href="#" id="btn-agregar" class="btn btn-success">Agregar al carrito</a>
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
        cartas +=  `
            <div class="col-12 col-md-3 col-sm-6 col-lg-3 mb-4">
                <div class="card">
                    <img src="${image}" id="card-img" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${description}</p>
                        <a href="#" id="btn-agregar" class="btn btn-success">Agregar al carrito</a>
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
//FUNCION CARRITO COMPRA
/*MOSTRAR CARRITO*/

const btnCart = document.querySelector('.icon-cart');
const containerCartProducts = document.querySelector('.container-cart-products');
btnCart.addEventListener('click', () => {
  containerCartProducts.classList.toggle('hidden-cart');
})