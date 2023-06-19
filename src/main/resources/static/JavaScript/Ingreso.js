$("#login").click(function() {
  var ingreso_email = $("#ingreso_email").val();
  var ingreso_password = $("#ingreso_password").val();
  
  
  $.getJSON('http://localhost:3000/users', function(data) {
    function verificarUsuario(ingreso_email, ingreso_password, productos) {
      for (let i = 0; i < productos.length; i++) {
        if (productos[i].email === ingreso_email && productos[i].password === ingreso_password) {
          return true;
        }
      }
      return false;
    }
    
    if (verificarUsuario(ingreso_email, ingreso_password, data)) {
      localStorage.setItem('correo', ingreso_email);
      if (ingreso_email === 'admin@gmail.com' && ingreso_password === 'a@1a@1'){
        alert("Entro como Administrador");
        window.location.href = "Administracion.html";
      }else{
        alert("Entro como "+ingreso_email);
        window.location.href = "index.html";
      };
    } else {
      alert("Usuario incorrecto");
      localStorage.removeItem('correo');

    }
  });
});

$("#regresar").click(function() {
  localStorage.removeItem('correo');
  window.location.href = "index.html";
});
