//FUNCION PARA OBTENER TODOS LOS DATOS
const loadAll= async() => {
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
        const title = producto.name;
        const description = producto.description;
        const categoria = producto.categoryId;
        const precio = (producto.price).toLocaleString('es-CL');
        const id = producto.id;
        cartas +=  `
          <tr data-product-id="${id}"> 
            <td><input class="form-control" type="text" id="nombre${id}" placeholder="${title}" style="color: #e5466b"></td>
            <td><input class="form-control" type="number" id="precio${id}" placeholder="${precio}" style="color: #e5466b"></td>
            <td>
              <select class="form-select" id="opcion-actualizar" style="color: #e5466b">
                <option value="1" ${categoria == '1' ? 'selected' : ''}>Tortas</option>
                <option value="2" ${categoria == '2' ? 'selected' : ''}>Cinnamon rolls</option>
                <option value="3" ${categoria == '3' ? 'selected' : ''}>Cupcakes</option>
                <option value="4" ${categoria == '4' ? 'selected' : ''}>Pies</option>
              </select>
            </td>
            <td>
              <textarea id="descripcion${id}" class="form-control" style="color: #e5466b" rows="3" placeholder="${description}"></textarea>
            </td>
            <td><button class="btn btn-danger deleteProduct">Eliminar</button></td>
            <td><button class="btn btn-danger actualizar-producto" data-product-id="${id}">Actualizar</button></td>
        </tr>`;
        });

        $(document).on("click", ".actualizar-producto", function() {
            var productId = $(this).data("product-id");
            actualizarProducto(productId);
        });

        function actualizarProducto(productId) {
            var v_nombre =$("#nombre"+productId).val()
            var v_precio =$("#precio"+productId).val()
            var Elemento = document.getElementById("opcion-actualizar");
            var v_opcion = Elemento.value;
            var ElementoText = document.getElementById("descripcion"+productId);
            var v_descripcion = ElementoText.value;
            
            if (/\d/.test(v_nombre)==true || v_nombre=="" || /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(v_nombre)){ 
              alert("Nombre invalido");
            }else if (/\s/g.test(v_precio)==true || /[a-zA-Z]/.test(v_precio) || v_precio=="" || /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(v_precio)){ 
              alert("precio invalido");
            }else{
              if(v_opcion==1){
                alert("opcion tortas");
              }else if (v_opcion==2) {
                alert("opcion cinnamon rolls");
              }else if (v_opcion==3) {
                alert("opcion cupcakes");
              }else if (v_opcion==4) {;
                alert("opcion pies");
              };
        
              var nuevoProducto = {
                name: v_nombre,
                description: v_descripcion,
                price: v_precio,
                categoryId: v_opcion
                
            };
        
              $.ajax({
                type: "PUT",
                url: "http://localhost:3000/products/"+productId,
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
        };
        
  
        $('#info-table').html(cartas);
        //ELIMINAR PRODUCTO DE LA API
        const btnDelete = document.querySelectorAll('.deleteProduct');
        btnDelete.forEach(btn => {
          btn.addEventListener('click', () => {
            const row = btn.closest('tr'); // Obtener la fila actual
            const productId = row.dataset.productId; // Obtener el ID del producto

            fetch("http://localhost:3000/products/" + productId, {
              method: 'DELETE'
            })
            .then(response => {
              if (response.ok) {
                row.remove(); // Eliminar la fila si la eliminación en la API es exitosa
                console.log("Eliminación exitosa");
                window.location.href = "Administracion.html";
              } else {
                throw new Error("Error al eliminar los datos");
              }
            })
            .catch(error => {
              console.log("Error al eliminar los datos:", error);
            });
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

  $("#agregarProducto").click(function(){
    var v_nombre =$("#agregar-producto-nombre").val()
    var v_precio =$("#agregar-producto-precio").val()
    var Elemento = document.getElementById("agregar-producto-opcion");
    var v_opcion = Elemento.value;
    var ElementoText = document.getElementById("agregar-producto-descripcion");
    var v_descripcion = ElementoText.value;
    
    
  
    if (/\d/.test(v_nombre)==true || v_nombre=="" || /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(v_nombre)){ 
      alert("Nombre invalido");
    }else if (/\s/g.test(v_precio)==true || /[a-zA-Z]/.test(v_precio) || v_precio=="" || /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(v_precio)){ 
      alert("precio invalido");
    }else{
      if(v_opcion==1){
        alert("opcion tortas");
      }else if (v_opcion==2) {
        alert("opcion cinnamon rolls");
      }else if (v_opcion==3) {
        alert("opcion cupcakes");
      }else if (v_opcion==4) {;
        alert("opcion pies");
      };

      var nuevoProducto = {
        name: v_nombre,
        description: v_descripcion,
        price: v_precio,
        categoryId: v_opcion,
        image: "Images/Ima_Nuestro_Productos/cakes/2-torta-red-velvet.jpg"
        
    };

      $.ajax({
        type: "POST",
        url: "http://localhost:3000/products",
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

  
  
  
  
  
  });

}
//FUNCION PARA POBLAR TABLA DE TODOS LOS PRODUCTOSS
loadAll();

