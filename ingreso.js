$.validator.addMethod("terminaPor",function(value, element, parametro){

    if(value.endsWith(parametro)){
        return true;
    }

    return false;

},"Debe terminar en {0}")

$("#registro").validate({
    rules: {
        email: {
            required: true,
            email: true,
            terminaPor: "@gmail.com"
        },
        password: {
            required: true,
            minlength: 6,
            maxlength: 15,
            password: true
        }

    }
})

$("#ingresar").click(function(){
    let nombre =$("#nombre").val()
    let email =$("#email").val()
    let password =$("#password").val()
})

