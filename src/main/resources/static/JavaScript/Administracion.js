//FUNCION PARA OBTENER TODOS LOS DATOS
const loadAll= async() => {
  //VERIFICACION
  try{
    const respuesta = await fetch('http://localhost:8081/products');
    //FILTRANDO TIPO DE STATUS
    if(respuesta.status===200){
      const datos = await respuesta.json();
      //FOREACH PARA RECORRER EL ARRAY DEL API
      let cartas = '';
      datos.products.forEach((producto, i) => {
        const image = producto.image;
        const title = producto.name;
        const description = producto.description;
        const categoria = producto.categoryId;
        const precio = (producto.price).toLocaleString('es-CL');
        const id = producto.id;
        cartas +=  `
          <tr data-product-id="${id}"> 
            <td><input id="input-nombre" class="form-control" type="text" placeholder="${title}" style="color: #e5466b"></td>
            <td><input id="input-precio" class="form-control" type="number" placeholder="${precio}" style="color: #e5466b"></td>
            <td>
              <select id="input-categoria" class="form-select" style="color: #e5466b">
                <option value="1" ${categoria == '1' ? 'selected' : ''}>Tortas</option>
                <option value="2" ${categoria == '2' ? 'selected' : ''}>Cinnamon rolls</option>
                <option value="3" ${categoria == '3' ? 'selected' : ''}>Cupcakes</option>
                <option value="4" ${categoria == '4' ? 'selected' : ''}>Pies</option>
              </select>
            </td>
            <td>
              <textarea id="input-descripcion" class="form-control" style="color: #e5466b" rows="3" placeholder="${description}"></textarea>
            </td>
            <td class="text-center"><button class="btn btn-danger updateProduct">Actualizar</button></td>
            <td class="text-center"><button class="btn btn-danger deleteProduct">Eliminar</button></td>
          </tr>`;
      });

      $('#info-table').html(cartas);
      //ELIMINAR PRODUCTO DE LA API
      const btnDelete = document.querySelectorAll('.deleteProduct');
      btnDelete.forEach(btn => {
        btn.addEventListener('click', () => {
          const row = btn.closest('tr'); // Obtener la fila actual
          const productId = row.dataset.productId; // Obtener el ID del producto

          fetch("http://localhost:8081/products/" + productId, {
            method: 'DELETE'
          })
              .then(response => {
                if (response.ok) {
                  row.remove(); // Eliminar la fila si la eliminación en la API es exitosa
                  console.log("Eliminación exitosa");
                } else {
                  throw new Error("Error al eliminar los datos");
                }
              })
              .catch(error => {
                console.log("Error al eliminar los datos:", error);
              });
        });
      });

      //ACTUALIZAR PRODUCTO
      const btnUpdate = document.querySelectorAll('.updateProduct');
      btnUpdate.forEach(btn => {
        btn.addEventListener('click', async () => {
          const row = btn.closest('tr'); // Obtener la fila actual
          const productId = row.dataset.productId; // Obtener el ID del producto

          const v_nombre = row.querySelector('#input-nombre').value;
          const v_precio = row.querySelector('#input-precio').value;
          const v_categoria = row.querySelector('#input-categoria').value;
          const v_descripcion = row.querySelector('#input-descripcion').value;
          if (/\d/.test(v_nombre)==true || v_nombre=="" || /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(v_nombre)){
            alert("Nombre invalido");
          }else if (/\s/g.test(v_precio)==true || /[a-zA-Z]/.test(v_precio) || v_precio=="" || /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/.test(v_precio)){
            alert("precio invalido");
          } else if (v_descripcion==""){
            alert("descripcion invalida");
          }else{
            const respuesta = await fetch("http://localhost:8081/products/" + productId);
            const datos = await respuesta.json();
            const v_image = datos.image;
            var nuevoProducto = {
              id: productId,
              name: v_nombre,
              description: v_descripcion,
              price: v_precio,
              categoryId: v_categoria,
              image: v_image
            }
            var result = confirm("¿Estás seguro de actualizar el producto?");
            //SE CONFIRMA LA ACTUALIZACION DE DATOS
            if (result) {
              const updateResponse = await fetch("http://localhost:8081/products/" + productId, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoProducto)
              });
              if (!updateResponse.ok) {
                throw new Error("Error al actualizar los datos");
              }
              alert("Actualización exitosa");
              //CANCELACION DE ACTUALIZACION
            } else{
              alert("Se ha cancelado la Actualización");
            }

          }
        });
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

//AGREGAR PRODUCTO A API 
document.addEventListener('DOMContentLoaded', function() {
  const addProduct = document.getElementById('btn-agregarProducto');
  addProduct.addEventListener('click', () => {
    var result = confirm("¿Estás seguro de que quieres agregar el producto?");
    if (result) {
      var v_nombre =$("#agregar-producto-nombre").val()
      var v_precio =$("#agregar-producto-precio").val()
      var Elemento = document.getElementById("agregar-producto-opcion");
      var v_opcion = Elemento.value;
      var ElementoText = document.getElementById("agregar-producto-descripcion");
      var v_descripcion = ElementoText.value;
      //VERIFICACION DE DATOS INGRESADOS
      if (/\d/.test(v_nombre)==true || v_nombre=="" || /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(v_nombre)){
        alert("Nombre invalido");
      }else if (/\s/g.test(v_precio)==true || /[a-zA-Z]/.test(v_precio) || v_precio=="" || /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(v_precio)){
        alert("precio invalido");
      }else{
        //DAR FORMATO JSON
        var nuevoProducto = {
          name: v_nombre,
          description: v_descripcion,
          price: v_precio,
          categoryId: v_opcion,
          image: "Images/Ima_Nuestro_Productos/imagen-Pronto.jpg"

        };
        //DATOS ENVIADOS PARA AGREGAR A JSON
        $.ajax({
          type: "POST",
          url: "http://localhost:8081/products",
          data: JSON.stringify(nuevoProducto),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (data) {
            console.log("El nuevo producto se ha agregado con éxito.");
            window.location.href = "Administracion.html";
          },
          error: function (xhr, status, error) {
            console.error("Ha ocurrido un error al intentar agregar el nuevo producto: " + error);
          }
        });
      };
    } else {
      // Código a ejecutar si el usuario hace clic en "Cancelar"
      console.log("El usuario ha cancelado.");
    }
  });
});

//FUNCION PARA POBLAR TABLA DE TODOS LOS PRODUCTOSS
loadAll();