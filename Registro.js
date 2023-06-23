$(document).ready(function() {
  $("#guardar").click(function(){
    var v_nombre =$("#nombre").val()
    var v_email =$("#email").val()
    var v_password =$("#password").val()
    var v_compro_email =$("#compro_email").val()
    var v_compro_password =$("#compro_password").val()
    var v_Apellido_Paterno =$("#Apellido_Paterno").val()
    comprobar_datos (v_nombre,v_email,v_password,v_compro_email,v_compro_password,v_Apellido_Paterno);

    //FUNCIÓN COMPROBAR NOMBRE
    function Comprobar_nombre_apellido (variable){
      //COMPROBAR CARACTER VACÍO
      if (variable=="") {
        alert('Esta vacío');
        return true;
      }
      //COMPROBAR ESPACIOS
      if (/\s/g.test(variable)==true) {
        alert('No se permiten espacios');
        return true;
      }
      //COMPROBAR CARACTERES NÚMERICOS
      if (/\d/.test(variable)==true) {
        alert('No se permiten números');
        return true;
      }
      //COMPROBAR CARACTER ESPECIAL
      if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(variable)) {
        alert('No se permiten caracteres especiales');
        return true;
      }  

      return false;
    
    };

    //FUNCIÓN COMPROBAR CORREO ELECTRONICO
    function Comprobar_correo(variable_correo){
      //COMPROBAR CARACTER VACÍO
      if (variable_correo=="") {
        alert('Esta vacío');
        return true;
      }
      //COMPROBAR ESPACIOS
      if (/\s/g.test(variable_correo)==true) {
        alert('No se permiten espacios');
        return true;
      }
      //COMPROBAR CARACTER ESPECIAL
      if (/[ `!#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/.test(variable_correo)) {
        alert('No se permiten caracteres especiales');
        return true;
      }  
      //COMPROBAR SI ES "@gmail.com"
      if (false==(variable_correo.indexOf("@gmail.com") !== -1)) {
        alert('Tiene que ser un correo "@gmail.com"');
        return true;
      };
      
      return false;
    };
    
    //FUNCIÓN COMPROBAR CONTRASEÑA
    function comprobar_password (password){
      //COMPROBAR CARACTER VACÍO
      if (password=="") {
        alert('Esta vacío');
        return true;
      }
      //COMPROBAR CARACTERES NÚMERICOS
      if (/\d/.test(password)==false) {
        alert('La contraseña debe tener al menos 1 número');
        return true;
      }
      //COMPROBAR CARACTERES ESPECIALES
      if (false==/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
        alert('La contraseña debe tener al menos 1 caracter especial');
        return true;
      }
      //COMPROBAR EL LARGO DE CARACTERES
      if (password.length < 5) {
        alert('La contraseña debe tener un minímo de 6 caracteres');
        return true;
      }

      return false;
    
    };
    
    //FUNCION PARA COMPREOBAR TODOS LOS DATOS
    function comprobar_datos(nombre,email,password,c_correo,c_password,apellido){
      
      if (Comprobar_nombre_apellido(nombre)==true) {
        return false;
      };
      
      if (Comprobar_correo(email)==true) {
          return false;
      };
      
      if (comprobar_password(password)==true) {
          return false;
      };
      
      if (Comprobar_nombre_apellido(apellido)==true) {
        return false;
      };
      
      if (email != c_correo) {
        alert('Correo electronico no coincide');
        return false;
      };
      
      if (password != c_password) {
        alert('Contraseña no copincide');
        return false;
      };
      
      $.getJSON('Content-jsonServer/db.json', function(data) {
    
        var nuevoUser = {
            name: v_nombre,
            email: v_email,
            password: v_password,
            categoryId: 5
        };
      
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/users",
            data: JSON.stringify(nuevoUser),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("El nuevo producto se ha agregado con éxito.");
            },
            error: function (xhr, status, error) {
                console.error("Ha ocurrido un error al intentar agregar el nuevo producto: " + error);
            }
        });
      
        window.location.href = "index.html";
    
      });
    };
  });
});




/* if (/\s/g.test(v_nombre)==true || /\d/.test(v_nombre)==true || v_nombre=="" || /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(v_nombre)){ 
  alert("Nombre invalido");
}else if (/\s/g.test(v_Apellido_Paterno)==true || /\d/.test(v_Apellido_Paterno)==true || v_Apellido_Paterno=="" || /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(v_Apellido_Paterno)){ 
  alert("Apellido invalido");
}else if (/\s/g.test(v_email)==true || v_email=="" || /[ `!#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/.test(v_email) || false==(v_email.indexOf("@gmail.com") !== -1)){ 
  alert("El correo electronico solo acepta '. y _' y solo debe ser '@gmail.com'");
}else if (v_compro_email!==v_email){
  alert("Correo electronico no coincide");
}else if (/\s/g.test(v_password)==true || /\d/.test(v_password)==false || v_password=="" || false==/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(v_password) || v_password.length < 5){ 
  alert("la contraseña necesita minimo un número, un caracter especial y 6 caracteres mínimo");
}else if (v_compro_password!==v_password){
  alert("contraseña no coincide");
}else{
$.getJSON('Content-jsonServer/db.json', function(data) {
    
  var nuevoUser = {
      name: v_nombre,
      email: v_email,
      password: v_password,
      categoryId: 5
  };

  $.ajax({
      type: "POST",
      url: "http://localhost:3000/users",
      data: JSON.stringify(nuevoUser),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
          console.log("El nuevo producto se ha agregado con éxito.");
      },
      error: function (xhr, status, error) {
          console.error("Ha ocurrido un error al intentar agregar el nuevo producto: " + error);
      }
  });

  window.location.href = "index.html";
});
}; */