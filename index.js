//VARIABLES
let carrito = [];
var a = 2; 
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
                      <a href="#" id="${id}" class="btn btn-success btn-agregar">Agregar al carrito</a>
                  </div>
              </div>
          </div>`  
        ;
        $('#info-cards-all').html(cartas);
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
};
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
          $('#info-cards-cinnamon').html(cartas);
      });
      
      const btnAgregar = document.querySelectorAll('#btn-agregar')
      btnAgregar.forEach(product =>{
        product.addEventListener('click',clickAgregar)
      })

      function clickAgregar(event){
        const tarjeta = event.target;
        const item = tarjeta.closest('.card-body');
        const id_producto = item.querySelector('.id-product').textContent;
        fetch('http://localhost:3000/products/'.concat(id_producto))
        .then(async (respuesta1) => {
          if (respuesta1.status === 200) {
            const datos = await respuesta1.json();
            carrito.push(datos);
            console.log(carrito);
            console.log(datos);
          }
        })
      }
      
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
        cartas +=  `
          <div class="col-12 col-md-3 col-sm-6 col-lg-3 mb-4">
              <div class="card">
                  <img src="${image}" id="card-img" alt="...">
                  <div class="card-body">
                      <h5 class="card-title">${title}</h5>
                      <p class="card-text">${description}</p>
                      <a href="#" id="btn-agregar" class="btn btn-success">Agregar al carrito</a>
                  </div>
              </div>
          </div>`  
        ;
        $('#info-cards-tortas').html(cartas);
    
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
        cartas +=  `
          <div class="col-12 col-md-3 col-sm-6 col-lg-3 mb-4">
              <div class="card">
                  <img src="${image}" id="card-img" alt="...">
                  <div class="card-body">
                      <h5 class="card-title">${title}</h5>
                      <p class="card-text">${description}</p>
                      <a href="#" id="btn-agregar" class="btn btn-success">Agregar al carrito</a>
                  </div>
              </div>
          </div>`  
        ;
        $('#info-cards-cupcakes').html(cartas);
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
                    </div>
                </div>
            </div>`  
        ;
        $('#info-cards-pie').html(cartas);
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

const loadProduct = async()=> {
  try{
    const respuesta = await fetch('http://localhost:3000/products/1');


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
document.addEventListener('DOMContentLoaded', function() {
  const btnCart = document.querySelector('.icon-cart');
  const containerCartProducts = document.querySelector('.container-cart-products');
  btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
    let cartas='';
    carrito.forEach((producto, i) => {
      const image = producto.image;
      image.src = producto.image;
      const title = producto.name;
      const precio = producto.price;
      const id = producto.id;
      cartas +=  `
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
      </div>`  
      ;
      $('#cart-cards').html(cartas);
    })
  });
});


