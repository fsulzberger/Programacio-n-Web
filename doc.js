let edad = 0
edad = document.getElementById("Age").value
localStorage.setItem("edad_usuario", edad);
localStorage.clear();
localStorage.removeItem("edad_usuario")