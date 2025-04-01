import express from 'express';

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/matrices', (req, res) => {
  const { matriz1, matriz2 } = req.body;
  try {

    const filas1 = matriz1.length;
    const columnas1 = matriz1[0].length;
    const filas2 = matriz2.length;
    const columnas2 = matriz2[0].length;

    if (columnas1 !== filas2) {
      return res.status(400).json({ error: "El número de columnas de la primera matriz debe ser igual al número de filas de la segunda matriz." });
    }


    let resultado = Array.from({ length: filas1 }, () => Array(columnas2).fill(0));

    for (let i = 0; i < filas1; i++) {
      for (let j = 0; j < columnas2; j++) {
        for (let k = 0; k < columnas1; k++) {
          resultado[i][j] += matriz1[i][k] * matriz2[k][j];
        }
      }
    }

    res.json(resultado)
  } catch (error) {
    console.log(error);
  }
});

const PORT = 4500;

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
