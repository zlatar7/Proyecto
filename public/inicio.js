const socket = io.connect();;

  function realtime(){
   const fecha = Date.now();
   const hoy = new Date(fecha).toISOString();
   const formato = hoy.slice(0, -2);
   return formato
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

  function renderTable(data){
    let productos = data.map(item =>{ item
       return(`<tr> 
        <td>${item.price}</td>
        <td>${item.title}</td>
        <td><img src="${item.thumbnail}" alt="foto" height="50px"></td>
      </tr>`)})

      document.getElementById("table").innerHTML = productos;
      console.log(productos)
}
  
  function addMessage(event) { 
      event.preventDefault();
      
      const hora = realtime()
      const correo = document.getElementById('email').value
     
      if (correo.includes("@")){
  
        let mensaje = { 
          email: document.getElementById('email').value,
          hora: hora, 
          text: document.getElementById('texto').value,
        }; 
        socket.emit('new-message', mensaje);
    
        document.getElementById('texto').value = ''
        document.getElementById('texto').focus()
     
    
        return false;
      }
      else{
          document.getElementById("contenedor").innerHTML = `ingrese un E-mail válido <button onclick="location.reload()">Aceptar</button>`
      }
    }

  function addProduct(event) {
    event.preventDefault();
    let producto = { 
      price: parseInt(document.getElementById('input1').value), 
      title: document.getElementById('input2').value,
      thumbnail: document.getElementById('input3').value
    }; 
    socket.emit('msj', producto);

    return false;
}