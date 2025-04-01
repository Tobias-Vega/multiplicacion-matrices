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

  if (matriz1Columna.value !== matriz2Fila.value) {
    alert("El número de filas de la primera matriz debe ser igual al número de columnas de la segunda")
    return null;
  }

  return valores;
}

const generarMatriz = (filas1, columnas1, filas2, columnas2) => {

  for (let i = 1; i <= filas1; i++) {
    for (let j = 1; j <= columnas1; j++) {
      matriz1.appendChild(crearInputs(`m1-${i}-${j}`))
    }
    matriz1.appendChild(document.createElement("br"))
  }

  contenedor.appendChild(matriz1);

  for (let i = 1; i <= filas2; i++) {
    for (let j = 1; j <= columnas2; j++) {
      matriz2.appendChild(crearInputs(`m2-${i}-${j}`))
    }
    matriz2.appendChild(document.createElement("br"))
  }

  contenedor.appendChild(matriz2);

  const button = document.createElement("button");
  button.innerText = "Sumar matrices";
  button.addEventListener("click", () => guardarValorMatrices(filas1, columnas1, filas2, columnas2))
  contenedor.appendChild(button);
}


const crearInputs = (id) => {
  const input = document.createElement("input");
  input.id = id
  input.type = 'number';
  return input;
}

const guardarValorMatrices = (filas1 , columnas1, filas2, columnas2) => {
  const matriz1 = [];
  const matriz2 = [];

  for (let i = 1; i <= filas1; i++) {
    const fila1 = [];

    for (let j = 1; j <= columnas1; j++) {
      const valor1 = Number(document.getElementById(`m1-${i}-${j}`).value);

      fila1.push(valor1);
    }

    matriz1.push(fila1)

    console.log(matriz1)
  }

  for (let i = 1; i <= filas2; i++) {
    const fila2 = [];

    for (let j = 1; j <= columnas2; j++) {
      const valor2 = Number(document.getElementById(`m2-${i}-${j}`).value);

      fila2.push(valor2);
    }

    matriz2.push(fila2)

    console.log(matriz2)
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
  resultadoEl.innerHTML = "";

  resultado.forEach(fila => {
    const filaDiv = document.createElement("div");
    filaDiv.style.display = "flex";

    fila.forEach(valor => {
      const celda = document.createElement("div");
      celda.textContent = valor;
      celda.style.border = "1px solid black";
      celda.style.padding = "10px";
      celda.style.margin = "2px";
      celda.style.width = "40px";
      celda.style.textAlign = "center";
      celda.style.fontWeight = "bold";

      filaDiv.appendChild(celda);
    });

    resultadoEl.appendChild(filaDiv);
  });


  contenedor.appendChild(resultadoEl);
};


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const datos = validarInputs();

  if (!datos) return;

  generarMatriz(datos[0], datos[1], datos[2], datos[3])
})