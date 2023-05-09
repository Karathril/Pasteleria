$.validator.addMethod("terminaPor",function(value, element, parametro){

    if(value.endsWith(parametro)){
        return true;
    }

    return false;

},"Debe terminar en {0}")

$("#registro").validate({
    rules: {
        nombre: {
            required: true,
            minlenght: 3,
            maxlenght: 40
        },
        email: {
            required: true,
            email: true,
            terminaPor: "@gmail.com"
        },
        password: {
            required: true,
            minlenght: 6,
            maxlenght: 15,
            password: true
        }

    }
})

$("#guardar").click(function(){
    let nombre =$("nombre").val()
    let email =$("email").val()
    let password =$("password").val()
})

