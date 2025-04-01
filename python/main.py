from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.staticfiles import StaticFiles

app = FastAPI()

class MatricesInput(BaseModel):
    matriz1: List[List[int]]
    matriz2: List[List[int]]

@app.post("/matrices")
async def multiplicar_matrices(datos: MatricesInput):
    try:
        matriz1 = datos.matriz1
        matriz2 = datos.matriz2

        filas1, columnas1 = len(matriz1), len(matriz1[0])
        filas2, columnas2 = len(matriz2), len(matriz2[0])

        if columnas1 != filas2:
            return {"error": "El número de columnas de la primera matriz debe ser igual al número de filas de la segunda matriz."}

        resultado = [[0] * columnas2 for _ in range(filas1)]

        for i in range(filas1):
            for j in range(columnas2):
                for k in range(columnas1):
                    resultado[i][j] += matriz1[i][k] * matriz2[k][j]

        return resultado

    except Exception as e:
        return {"error": f"Ocurrió un error: {str(e)}"}
    
app.mount("/", StaticFiles(directory="public", html=True))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, port=4500)
