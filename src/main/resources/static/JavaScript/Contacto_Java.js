$("#enviar").click(function(){
    var v_nombre =$("#nombre").val()
    var v_email =$("#email").val()
    var v_asunto =$("#asunto").val()
    var v_mensaje =$("#mensaje").val()
    comprobar_datos (v_nombre,v_email);

    //FUNCIÓN COMPROBAR NOMBRE
    function Comprobar_nombre_apellido (variable){
        //COMPROBAR CARACTER VACÍO
        if (variable=="") {
            alert('El nombre esta vacío');
            return true;
        }
        //COMPROBAR CARACTERES NÚMERICOS
        if (/\d/.test(variable)==true) {
            alert('No se permiten números en el nombre');
            return true;
        }
        //COMPROBAR CARACTER ESPECIAL
        if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(variable)) {
            alert('No se permiten caracteres especiales en el nombre');
            return true;
        }

        return false;

    };

    //FUNCIÓN COMPROBAR CORREO ELECTRONICO
    function Comprobar_correo(variable_correo){
        //COMPROBAR CARACTER VACÍO
        if (variable_correo=="") {
            alert('El correo esta vacío');
            return true;
        }
        //COMPROBAR ESPACIOS
        if (/\s/g.test(variable_correo)==true) {
            alert('No se permiten espacios en el correo');
            return true;
        }
        //COMPROBAR CARACTER ESPECIAL
        if (/[ `!#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/.test(variable_correo)) {
            alert('No se permiten ciertos caracteres especiales');
            return true;
        }
        //COMPROBAR SI ES "@gmail.com"
        if (false==(variable_correo.indexOf("@gmail.com") !== -1)) {
            alert('Tiene que ser un correo "@gmail.com"');
            return true;
        };

        return false;
    };


    function comprobar_datos(nombre,email) {
        if (Comprobar_nombre_apellido(nombre) == true) {
            return false;
        }
        ;

        if (Comprobar_correo(email) == true) {
            return false;
        }
        ;


    var nuevoContacto = {
        name: v_nombre,
        email: v_email,
        asunto: v_asunto,
        mensaje: v_mensaje
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:8081/contactos",
        data: JSON.stringify(nuevoContacto),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log("El nuevo producto se ha agregado con éxito.");
        },
        error: function (xhr, status, error) {
            console.error("Ha ocurrido un error al intentar agregar el nuevo producto: " + error);
        }
    });

    alert("Mensaje enviado, se regresará al inicio")
    window.location.href = "index.html";

    };
});
