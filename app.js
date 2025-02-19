
$(document).ready(Start);
let nombre;

function Start(){
  nombre=prompt("Dime tu nombre");
  let config = {
    apiKey: "AIzaSyAs0RA1QU7I8jpuhi3wPCWxOiCuC00ZK08",
    authDomain: "chat-7d403.firebaseapp.com",
    databaseURL: "https://chat-7d403.firebaseio.com",
    projectId: "chat-7d403",
    storageBucket: "chat-7d403.appspot.com",
    messagingSenderId: "826560982809"
  };
  firebase.initializeApp(config);
  let db=firebase.database();
  db.ref("mensajes").on("child_added",mostrar);
  
  $("#boton").click(enviar);

  $("#mensaje").keypress(
    (e)=>{
      let tecla = e.keyCode;
      if (tecla==13){
        let mensaje=$("#mensaje").val(); 
        let db=firebase.database();
        $("#mensaje").val("");
        db.ref("mensajes").push({"mensaje":{"contenido":mensaje,"usuario":nombre}});
        $(document).scrollTop(document.documentElement.scrollHeight);
      } 
    })
}

function mostrar(datos){
  if(datos.val()["mensaje"]["usuario"]==nombre)
  {
	    $("body").append("<p class='izq-cuadrado'><b>Yo:</b> "+datos.val()["mensaje"]["contenido"]+"</p>");
  }else{
      $("body").append("<p class='der-cuadrado'><b>"+datos.val()["mensaje"]["usuario"]+":</b> "+datos.val()["mensaje"]["contenido"]+"</p>");
  }
  $(document).scrollTop(document.documentElement.scrollHeight);
}

function enviar(){
  let mensaje=$("#mensaje").val(); 
  let db=firebase.database();
  $("#mensaje").val("");
  db.ref("mensajes").push({"mensaje":{"contenido":mensaje,"usuario":nombre}});
  $(document).scrollTop(document.documentElement.scrollHeight);
}
