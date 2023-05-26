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
            <td><input class="form-control" type="text" placeholder="${title}" style="color: #e5466b"></td>
            <td><input class="form-control" type="number" placeholder="${precio}" style="color: #e5466b"></td>
            <td>
              <select class="form-select" style="color: #e5466b">
                <option value="1" ${categoria == '1' ? 'selected' : ''}>Tortas</option>
                <option value="2" ${categoria == '2' ? 'selected' : ''}>Cinnamon rolls</option>
                <option value="3" ${categoria == '3' ? 'selected' : ''}>Cupcakes</option>
                <option value="4" ${categoria == '4' ? 'selected' : ''}>Pies</option>
              </select>
            </td>
            <td>
              <textarea class="form-control" style="color: #e5466b" rows="3" placeholder="${description}"></textarea>
            </td>
            <td><input class="form-control" type="file" style="color: #e5466b"></td>
            <td><button class="btn btn-danger deleteProduct">Eliminar</button></td>
          </tr>`;
        });
  
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
}
//FUNCION PARA POBLAR TABLA DE TODOS LOS PRODUCTOSS
loadAll();