$(document).ready(function() {
    var usuarios = [];
    /* función del botón usado desde registro.html */
    $("#guardar").click(function(){
        var v_nombre =$("#nombre").val()
        var v_email =$("#email").val()
        var v_password =$("#password").val()
        var v_compro_email =$("#compro_email").val()
        var v_compro_password =$("#compro_password").val()
        var v_Apellido_Paterno =$("#Apellido_Paterno").val()
        var v_id =(1);

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
            usuarios.push({id: v_id, email: v_email, password: v_password});
            v_id ++;
            alert(usuarios[0].email);
        };

    });

    /* función del botón usado desde ingreso.html (para probarlo con el array se uso un apartado en la pagina registro.html) */
    $("#login").click(function( ){
        var ingreso_email =$("#ingreso_email").val()
        var ingreso_password =$("#ingreso_password").val()
        
        function verificarUsuario(ingreso_email, ingreso_password, usuarios) {
            for (let i = 0; i < usuarios.length; i++) {
                if (usuarios[i].email === ingreso_email && usuarios[i].password === ingreso_password) {
                    return true;
                };
            };
            return false;
        };

        if (verificarUsuario(ingreso_email, ingreso_password, usuarios)) {
            alert("correcto");
        }else{
            alert("malo");
        };
    });

});




