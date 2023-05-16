$(document).ready(function() {
    $("#guardar").click(function(){
        var v_nombre =$("#nombre").val()
        var v_email =$("#email").val()
        var v_password =$("#password").val()
        var v_compro_email =$("#compro_email").val()
        var v_compro_password =$("#compro_password").val()
        var v_Apellido_Paterno =$("#Apellido_Paterno").val()

        if (/\s/g.test(v_nombre)==true || /\d/.test(v_nombre)==true || v_nombre=="" || /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(v_nombre)){ 
            alert("error con el nombre");
        }else if (/\s/g.test(v_Apellido_Paterno)==true || /\d/.test(v_Apellido_Paterno)==true || v_Apellido_Paterno=="" || /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(v_Apellido_Paterno)){ 
            alert("error con el apellido");
        }else if (/\s/g.test(v_email)==true || v_email=="" || /[ `!#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/.test(v_email) || false==(v_email.indexOf("@gmail.com") !== -1)){ 
            alert("error con Correo electronico");
        }else if (v_compro_email!==v_email){
            alert("Correo electronico no coincide");
        }else if (/\s/g.test(v_password)==true || /\d/.test(v_password)==false || v_password=="" || false==/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(v_password)){ 
            alert("la contraseña necesita minimo un número y un caracter especial");
        }else if (v_compro_password!==v_password){
            alert("contraseña no coincide");
        }else{
            $.getJSON('Content-jsonServer/db.json', function(data) {
                
                var nuevoProducto = {
                    name: v_nombre,
                    email: v_email,
                    password: v_password,
                    categoryId: 5
                };

                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/users",
                    data: JSON.stringify(nuevoProducto),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        console.log("El nuevo producto se ha agregado con éxito.");
                    },
                    error: function (xhr, status, error) {
                        console.error("Ha ocurrido un error al intentar agregar el nuevo producto: " + error);
                    }
                });
            });
        };
    });
});




