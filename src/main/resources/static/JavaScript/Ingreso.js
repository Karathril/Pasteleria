$("#login").click(function() {
  var v_email = $("#ingreso_email").val();
  var v_password = $("#ingreso_password").val();
  var userList = [];


    fetch('/users')
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error en la respuesta del servidor');
            }
        })
        .then(function(data) {
            // Almacenar los datos de los usuarios en la lista userList
            userList = data.users;
            console.log(userList); // Mostrar los datos en la consola (opcional)

                // Iterar sobre la lista de usuarios y comparar email y contraseña
                for (var i = 0; i < userList.length; i++) {
                    var user = userList[i];
                    if (user.email === v_email && user.password === v_password) {
                        console.log("Credenciales correctas");

                        localStorage.setItem('correo', v_email);
                        if (v_email === 'admin@gmail.com' && v_password === 'a@1a@1'){
                            alert("Entro como Administrador");
                            window.location.href = "administracion.html";
                        }else{
                            alert("Entro como "+v_email);
                            window.location.href = "index.html";
                        };

                    }else {
                        console.log("Credenciales incorrectas");
                    }
                }




        })
        .catch(function(error) {
            console.error('Error:', error);
        });
});

$("#regresar").click(function() {
    window.location.href = "index.html";

});
