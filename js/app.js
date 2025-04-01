import express from 'express';

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post("/matrices", async (req, res) => {
  
  const { matriz1, matriz2 } = req.body;
  try {
  
    const resultado = await matriz1.map((fila, i) => fila.map((valor, j) => valor + matriz2[i][j]));

    console.log(resultado)
    
    res.json(resultado);
    
  } catch (error) {
    console.log(error)
  }
})

const PORT = 4500;

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))