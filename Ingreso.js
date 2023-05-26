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
      alert("correcto");
      window.location.href = "index.html";
    } else {
      alert("malo");
    }
  });
});

