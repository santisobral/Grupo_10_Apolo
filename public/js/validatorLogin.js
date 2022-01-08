window.addEventListener("load", (e) =>{ 
    let email = document.querySelector(".email");
    email.focus()
     
    let form = document.querySelector(".form-login");
   
  form.addEventListener("submit", (e) => {

     
 let errores = [];
 
      let fieldemail = document.querySelector(".email");
      if(fieldemail.value == "" ) {
          const container =document.querySelector(".usuario")
          container.innerHTML += '<div class="text-danger"> El email debe estar completo </div>'
          errores.push("El apellido debe estar completo")  
      } else{
        if(!fieldemail.value.isEmail()){
          const container =document.querySelector(".usuario")
          container.innerHTML += '<div class="text-danger"> El campo debe tener al menos 2 caracteres </div>'
          errores.push("Debe ser un email valido")  
        }
    }
    let fieldPassword = document.querySelector(".password");
    if(fieldPassword.value == "" ) {
        const container =document.querySelector(".pass")
        container.innerHTML += '<div class="text-danger"> La contraseña es obligatoria </div>'
        errores.push("La contraseña es obligatoria ")  
    } else{
      if(fieldPassword.value.length < 8){
        const container =document.querySelector(".pass")
        container.innerHTML += '<div class="text-danger"> El campo debe tener al menos 8 caracteres </div>'
        errores.push("El campo debe tener al menos 8 caracteres")  
      }
    }
   
  
    console.log(errores)
    if(errores.length > 0) { // si hay errores cancelas el envio del form
        e.preventDefault();
       
        
       
       }
})

})