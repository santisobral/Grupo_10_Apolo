window.addEventListener("load", (e) =>{ 
  
    let name = document.querySelector("#name");
   
    name.focus()
     
     let form = document.querySelector("#id-formEdit");
     
   form.addEventListener("submit", (e) => {
   
    
  let errores = [];
 
      let fieldName = document.querySelector("#name");
     
      const containerName =document.querySelector("#div-nameEdit")
      containerName.innerHTML = ""
      if(fieldName.value.length == 0 ) {
          
          containerName.innerHTML += '<div class="text-danger"> El nombre debe estar completo </div>'
           errores.push("El nombre debe estar completo")  
       } else{
        if(fieldName.value.length < 5){
        
          containerName.innerHTML += '<div class="text-danger"> El campo debe tener al menos 5 caracteres </div>'
          errores.push("El campo debe tener al menos 5 caracteres")  
        }
        
    }
    // Validacion del campo
     let fieldDescription = document.querySelector("#description");
     const containerDescription =document.querySelector("#div-description")
     containerDescription.innerHTML = ""  // aca limpiamos al formulario para que cada vez que le doy guardar no me recargue los errores
  
       if(fieldDescription.value.length < 20){
      
         containerDescription.innerHTML += '<div class="text-danger"> El campo debe tener al menos 20 caracteres </div>'
         errores.push("El campo debe tener al menos 20 caracteres")  
       }

       let fieldImage =  document.querySelector("#image"); 
       const containerImage =document.querySelector("#div-image")
       containerImage.innerHTML = ""

       let file = req.file; // Solo validamos en caso de que se suba un archivo
       if (file) {
        let acceptedExtensions = ['jpeg', 'jpg', 'gif', 'png'];
        console.log(acceptedExtensions)
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