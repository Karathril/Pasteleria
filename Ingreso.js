<<<<<<< HEAD
$("#login").click(function( ){
    $.getJSON('Content-jsonServer/db.json', function(data) {
        var ingreso_email =$("#ingreso_email").val()
        var ingreso_password =$("#ingreso_password").val()
        var productos = data.users;
        
        function verificarUsuario(ingreso_email, ingreso_password, productos) {
            for (let i = 0; i < productos.length; i++) {
                if (productos[i].email === ingreso_email && productos[i].password === ingreso_password) {
                    return true;
                };
            };
            return false;
        };
        
        if (verificarUsuario(ingreso_email, ingreso_password, productos)) {
            alert("correcto");
<<<<<<< HEAD
=======
            window.location.href = "index.html";
>>>>>>> user-principal
        }else{
            alert("malo");
        };   
    });    
=======
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
      localStorage.setItem('sesionIniciada', ingreso_email);
      localStorage.setItem('verificacion', 'si');
      window.location.href = "index.html";
    } else {
      alert("malo");
      localStorage.setItem('verificacion', 'no');

    }
  });
>>>>>>> user-principal
});

$("#regresar").click(function() {
  localStorage.setItem('verificacion', 'no');
  window.location.href = "index.html";
});
