const form = document.getElementById("form");

const matriz1Fila = document.getElementById("m1-f");
const matriz1Columna = document.getElementById("m1-c");
const matriz2Fila = document.getElementById("m2-f");
const matriz2Columna = document.getElementById("m2-c");

const contenedor = document.querySelector('.contenedor');
const matriz1 = document.querySelector('.matriz-1');
const matriz2 = document.querySelector('.matriz-2');
const resultadoEl = document.querySelector('.resultado');

const inputs = [matriz1Fila, matriz1Columna, matriz2Fila, matriz2Columna];

const validarInputs = () => {
  const valores = inputs.map(el => Number(el.value));

  if (valores.some(valor => !valor)) {
    alert("Todos los inputs son obligatorios");
    return null;
  }

  if (matriz1Fila.value !== matriz2Fila.value || matriz1Columna.value !== matriz1Columna.value) {
    alert("Las matrices deben tener el mismo número de filas y columnas")
    return null;
  }

  return valores;
}

const generarMatriz = (filas, columnas) => {

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      matriz1.appendChild(crearInputs(`m1-${i}-${j}`))
      matriz2.appendChild(crearInputs(`m2-${i}-${j}`))
    }
    matriz1.appendChild(document.createElement("br"))
    matriz2.appendChild(document.createElement("br"))
  }

  contenedor.appendChild(matriz1);
  contenedor.appendChild(matriz2);

  const button = document.createElement("button");
  button.innerText = "Sumar matrices";
  button.addEventListener("click", () => guardarValorMatrices(filas, columnas))
  contenedor.appendChild(button);
}


const crearInputs = (id) => {
  const input = document.createElement("input");
  input.id = id
  input.type = 'number';
  return input;
}

const guardarValorMatrices = (filas, columnas) => {
  const matriz1 = [];
  const matriz2 = [];

  for (let i = 0; i < filas; i++) {
    const fila1 = [];
    const fila2 = [];

    for (let j = 0; j < columnas; j++) {
      const valor1 = Number(document.getElementById(`m1-${i}-${j}`).value);
      const valor2 = Number(document.getElementById(`m2-${i}-${j}`).value);


      fila1.push(valor1);
      fila2.push(valor2)
    }

    matriz1.push(fila1)
    matriz2.push(fila2)
  }

  fetch("http://localhost:4500/matrices", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ matriz1, matriz2 })
  })
    .then(respuesta => respuesta.json())
    .then(resultado => mostrarResultado(resultado))
    .catch(error => console.log(error))
}

const mostrarResultado = (resultado) => {
  resultado.forEach(fila => {
    fila.forEach(valor => {
      const span = document.createElement("span");
      span.textContent = valor;
      resultadoEl.appendChild(span);
    })
    resultadoEl.appendChild(document.createElement("br"))
  });

  contenedor.appendChild(resultado)
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const datos = validarInputs();

  if (!datos) return;

  generarMatriz(datos[0], datos[1])
})