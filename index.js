
document.addEventListener("DOMContentLoaded", function () {
    const inputTarea = document.querySelector(".inputtarea");
    const publicarButton = document.querySelector(".publicar");
  
    publicarButton.addEventListener("click", function () {
      const tareaTexto = inputTarea.value.trim();
      if (tareaTexto !== "") {
        const tarea = {
          texto: tareaTexto,
          estado: "todo",
        };
        agregarTarea(tarea);
        inputTarea.value = "";
      }
    });
  
    function agregarTarea(tarea) {
      const tareaContainer = document.createElement("div");
      tareaContainer.classList.add("tarea");
      tareaContainer.innerHTML = `
        <div class="arriba">
          <button class="X"> X </button>
        </div>
        <div class="cajatexto">
          <p class="texto">${tarea.texto}</p>
        </div>
        <div class="abajo">
          <button class="rojo"></button>
          <button class="azul"></button>
        </div>
      `;
  
      const estadoContainer = document.getElementById(tarea.estado);
      estadoContainer.appendChild(tareaContainer);
  
      tareaContainer.querySelector(".X").addEventListener("click", function () {
        tareaContainer.remove();
  
        // Eliminar la tarea
        const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
        const tareaIndex = tareas.findIndex((t) => t.texto === tarea.texto);
        if (tareaIndex !== -1) {
          tareas.splice(tareaIndex, 1);
          localStorage.setItem("tareas", JSON.stringify(tareas));
        }
      });

      // Almacenar la tarea en el localStorage
      const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
      tareas.push(tarea);
      localStorage.setItem("tareas", JSON.stringify(tareas));
      tareaContainer.querySelector(".rojo").addEventListener("click", function () {
        if (tarea.estado === "doing") {

          // Mover tarea de Doing a To Do
          tarea.estado = "todo";
          const estadoContainer = document.getElementById("todo");
          estadoContainer.appendChild(tareaContainer);
        }
        actualizarEstadoTarea(tarea);

        if (tarea.estado === "done") {
            // Mover tarea de Done a Doing
            tarea.estado = "doing";
            const estadoContainer = document.getElementById("doing");
            estadoContainer.appendChild(tareaContainer);
          }
          actualizarEstadoTarea(tarea);
      });
      
      tareaContainer.querySelector(".azul").addEventListener("click", function () {
        if (tarea.estado === "todo") {

          // Mover tarea de To Do a Doing
          tarea.estado = "doing";
          const estadoContainer = document.getElementById("doing");
          estadoContainer.appendChild(tareaContainer);
        } else if (tarea.estado === "doing") {
          
          // Mover tarea de Doing a Done
          tarea.estado = "done";
          const estadoContainer = document.getElementById("done");
          estadoContainer.appendChild(tareaContainer);
        }
        actualizarEstadoTarea(tarea);
      });
      
      
    }
  
    function actualizarEstadoTarea(tarea) {
        // Actualizar la tarea en el localStorage
        const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
        const tareaIndex = tareas.findIndex((t) => t.texto === tarea.texto);
        if (tareaIndex !== -1) {
          tareas[tareaIndex] = tarea;
          localStorage.setItem("tareas", JSON.stringify(tareas));
        }
      }
      

    // Cargar las tareas desde el localStorage al inicio
    const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareasGuardadas.forEach((tarea) => {
      agregarTarea(tarea);
    });
  });
  