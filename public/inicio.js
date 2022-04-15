const socket = io.connect();
const input1 = document.getElementById("input1").value;
const input2 = document.getElementById("input2").value;
const input3 = document.getElementById("input3").value;

  function realtime(){
   const fecha = Date.now();
   const hoy = new Date(fecha).toISOString();
   const formato = hoy.slice(0, -2);
   const respuesta = formato.toString();
   return respuesta
  }

socket.on('messages', function(data) { 
    console.log(data);
    render(data);
  });

  socket.on('msj', function(data) { 
    console.log(data);
    renderTable(data);
  });
  
  function render(data) { 
      let html = data.map(function(elem, index){ 
        return(`<div>
              <strong style="color: blue">${elem.email}</strong>:
              <em style="color:brown">${elem.hora}</em> 
              <em style="color: green; font: italic">${elem.text}</em> </div>`) 
      }).join(" "); 
      document.getElementById('messages').innerHTML = html; 
  }

/*   function renderTable(data){
    let html = data.map(function(elem, index){ 
        return(`<div>
              <strong style="color: blue">${elem.price}</strong>:
              <em style="color:brown">${elem.title}</em> 
              <em>${elem.thumbnail}</em> </div>`) 
      }).join(" "); 
      document.getElementById('').innerHTML = html;
  } */
  
  function addMessage() { 
   
    const hora = realtime()
    const correo = document.getElementById('email').value
   
    if (correo.includes("@")){

      let mensaje = { 
        email: document.getElementById('email').value,
        hora: hora, 
        text: document.getElementById('texto').value,
      }; 
      socket.emit('new-message', mensaje); // new-message es el nombre del evento (recordatorio)
  
      document.getElementById('texto').value = ''
      document.getElementById('texto').focus()
  
      return false;
    }
    else{
        document.getElementById("contenedor").innerHTML = `ingrese un E-mail válido <button onclick="location.reload()">Aceptar</button>`
    }
  }

  function addProduct() { 
    let producto = { 
      price: document.getElementById('input1').value, 
      title: document.getElementById('input2').value,
      thumbnail: document.getElementById('input3').value
    }; 
    socket.emit('msj', producto);

    return false;
}