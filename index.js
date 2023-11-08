document.addEventListener("DOMContentLoaded", function() {
  const inputTarea = document.querySelector(".inputtarea");
  const publicarButton = document.querySelector(".publicar");
  const todoContainer = document.getElementById("todo");
  const doingContainer = document.getElementById("doing");
  const doneContainer = document.getElementById("done");

  publicarButton.addEventListener("click", function() {
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

    const tareaId = tarea.texto;

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

    if (tarea.estado === "todo") {
      todoContainer.appendChild(tareaContainer);
    } else if (tarea.estado === "doing") {
      doingContainer.appendChild(tareaContainer);
    } else if (tarea.estado === "done") {
      doneContainer.appendChild(tareaContainer);
    }

    tareaContainer.querySelector(".X").addEventListener("click", function () {
      tareaContainer.remove();
      
      const tareas = JSON.parse(localStorage.getItem("tareas")) || {};
      delete tareas[tareaId];
      localStorage.setItem("tareas", JSON.stringify(tareas));
    });

  
    const tareas = JSON.parse(localStorage.getItem("tareas")) || {};
    tareas[tareaId] = tarea;
    localStorage.setItem("tareas", JSON.stringify(tareas));

    tareaContainer.querySelector(".rojo").addEventListener("click", function () {
      if (tarea.estado === "doing") {

        // Mover tarea de Doing a To Do
        tarea.estado = "todo";
        todoContainer.appendChild(tareaContainer);
      }
      actualizarEstadoTarea(tarea);

      if (tarea.estado === "done") {
        // Mover tarea de Done a Doing
        tarea.estado = "doing";
        doingContainer.appendChild(tareaContainer);
      }
      actualizarEstadoTarea(tarea);
    });

    tareaContainer.querySelector(".azul").addEventListener("click", function () {
      if (tarea.estado === "todo") {

        // Mover tarea de To Do a Doing
        tarea.estado = "doing";
        doingContainer.appendChild(tareaContainer);
      } else if (tarea.estado === "doing") {

        // Mover tarea de Doing a Done
        tarea.estado = "done";
        doneContainer.appendChild(tareaContainer);
      }
      actualizarEstadoTarea(tarea);
    });
  }

  function actualizarEstadoTarea(tarea) {

    const tareas = JSON.parse(localStorage.getItem("tareas")) || {};
    tareas[tarea.texto] = tarea;
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }


  const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || {};

  for (const tareaId in tareasGuardadas) {
    agregarTarea(tareasGuardadas[tareaId]);
  }
});
