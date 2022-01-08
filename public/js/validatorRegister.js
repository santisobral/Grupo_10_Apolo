window.addEventListener("load", (e) =>{ 
    let name = document.querySelector(".name");
    console.log(name)
    name.focus()
     
    let form = document.querySelector(".form-register");
    console.log(form)
   
   form.addEventListener("submit", (e) => {

     
  let errores = [];
   let fieldName = document.querySelector(".name"); // primero seleccionamos el input
  
   const containerName =document.querySelector("#div-name");
        containerName.innerHTML = ""
        if(fieldName.value.length == 0 ) { // si el input es vacio entonces, le vamos a agregar a mano contenido html al contenedor
         containerName.innerHTML += '<div class="text-danger"> El nombre debe estar completo </div>' // += es para concatenar
         errores.push("El nombre debe estar completo")  // esta linea se relaciona if(errores.length > 0) y se activa el prevent default
     } else{
       if(fieldName.value.length < 2){
         containerName.innerHTML += '<div class="text-danger"> El campo debe tener al menos 2 caracteres </div>'
         errores.push("El campo debe tener al menos 2 caracteres")  
      }
    }
     let fieldLastName = document.querySelector(".lastName");
     const containerSurname =document.querySelector("#div-surname");
     containerSurname.innerHTML = ""
     if(fieldLastName.value == "" ) {
        
         containerSurname.innerHTML += '<div class="text-danger"> El apellido debe estar completo </div>'
         errores.push("El apellido debe estar completo")  
     } else{
       if(fieldLastName.value.length < 2){
       
         containerSurname.innerHTML += '<div class="text-danger"> El campo debe tener al menos 2 caracteres </div>'
         errores.push("El campo debe tener al menos 2 caracteres")  
       }
     }
     let fieldDate = document.querySelector(".date");
     const containerDate =document.querySelector("#div-Date");
     containerDate.innerHTML = ""

     if(fieldDate.value == "" ) {
       
      containerDate.innerHTML += '<div class="text-danger"> El campo Fecha debe estar completo </div>'
         errores.push("El campo Fecha debe estar completo")
     }
       let fieldemail = document.querySelector(".email");
       const containerEmail =document.querySelector("#div-email");
       containerEmail.innerHTML = ""
       if(fieldemail.value == "" ) {
         
        containerEmail.innerHTML += '<div class="text-danger"> El email debe estar completo </div>'
           errores.push("El email debe estar completo")  
       } else{
         if(!fieldemail.value.isEmail()){
         
          containerEmail.innerHTML += '<div class="text-danger"> El campo debe tener al menos 2 caracteres </div>'
           errores.push("Debe ser un email valido")  
         }
     }
     let fieldPassword = document.querySelector(".pass");
     const containerPass =document.querySelector("#div-pass")
     containerPass.innerHTML = ""
     if(fieldPassword.value == "" ) {
        
      containerPass.innerHTML += '<div class="text-danger"> La contraseña es obligatoria </div>'
         errores.push("La contraseña es obligatoria ")  
     } else{
       if(fieldPassword.value.length < 8){
        containerPass.innerHTML += '<div class="text-danger"> El campo debe tener al menos 8 caracteres </div>'
         errores.push("El campo debe tener al menos 8 caracteres")  
       }
     }
      let fieldImage =  document.querySelector(".control");
      const containerImage =document.querySelector("#div-image");
      containerImage.innerHTML = ""
       if(fieldImage.value == ""){ 
        containerImage.innerHTML += '<div class="text-danger"> Debes subir una imagen </div>'
          errores.push("Debes subir una imagen")  
      } else {
        let acceptedExtensions = ['jpeg', 'jpg', 'gif', 'png'];
        let parts =  fieldImage.value.split('.');
        console.log(parts)
        let extension = parts[parts.length-1];
        if (!acceptedExtensions.includes(extension)){   
         containerImage.innerHTML = containerImage.innerHTML + '<div class="text-danger"> Las extensiones de archivo permitidas son: ' + acceptedExtensions.join(', ') + '</div>'
            errores.push ('Las extensiones de archivo permitidas son ' + acceptedExtensions.join(', '));
        }
      }
     

  
     console.log(errores)
     if(errores.length > 0) { // si hay errores cancelas el envio del form
         e.preventDefault();
       
        
       
     }
 })

})