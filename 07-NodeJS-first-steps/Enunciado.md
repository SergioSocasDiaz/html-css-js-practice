# Ejercicio: API REST de una biblioteca

## 1. Objetivo

Desarrolla una API para gestionar los libros de una pequeña biblioteca usando **Node.js nativo**, sin Express ni otros frameworks.

La API debe permitir:
- Consultar libros.
- Buscar por distintos criterios.
- Añadir nuevos libros.
- Modificar su información.
- Eliminarlos.

## 2. Estructura del proyecto

```
biblioteca-api/
├── data/
│   └── books.json
├── src/
│   ├── server.js
│   ├── routes.js
│   └── books.js
├── .env
└── package.json
```

**Responsabilidades:**

| Archivo | Responsabilidad |
|---|---|
| `server.js` | Crear el servidor HTTP y ponerlo en marcha. |
| `routes.js` | Gestionar las rutas, los métodos HTTP y las respuestas. |
| `books.js` | Almacenar los datos en memoria y realizar las operaciones sobre los libros. |
| `data/books.json` | Contener los datos iniciales. |
| `.env` | Definir el puerto del servidor. |

> Puedes modificar la estructura si lo necesitas, pero mantén separada la lógica del servidor, las rutas y la gestión de los libros.

## 3. Mock de datos

Crea el archivo `data/books.json` con este contenido:

```json
[
  {
    "id": "b001",
    "title": "El nombre del viento",
    "author": "Patrick Rothfuss",
    "genre": "fantasy",
    "publishedYear": 2007,
    "available": true,
    "createdAt": "2025-01-10T10:00:00.000Z"
  },
  {
    "id": "b002",
    "title": "1984",
    "author": "George Orwell",
    "genre": "dystopian",
    "publishedYear": 1949,
    "available": false,
    "createdAt": "2025-01-11T10:00:00.000Z"
  },
  {
    "id": "b003",
    "title": "Dune",
    "author": "Frank Herbert",
    "genre": "science-fiction",
    "publishedYear": 1965,
    "available": true,
    "createdAt": "2025-01-12T10:00:00.000Z"
  },
  {
    "id": "b004",
    "title": "Orgullo y prejuicio",
    "author": "Jane Austen",
    "genre": "romance",
    "publishedYear": 1813,
    "available": true,
    "createdAt": "2025-01-13T10:00:00.000Z"
  },
  {
    "id": "b005",
    "title": "Fundación",
    "author": "Isaac Asimov",
    "genre": "science-fiction",
    "publishedYear": 1951,
    "available": false,
    "createdAt": "2025-01-14T10:00:00.000Z"
  },
  {
    "id": "b006",
    "title": "El Hobbit",
    "author": "J.R.R. Tolkien",
    "genre": "fantasy",
    "publishedYear": 1937,
    "available": true,
    "createdAt": "2025-01-15T10:00:00.000Z"
  },
  {
    "id": "b007",
    "title": "Fahrenheit 451",
    "author": "Ray Bradbury",
    "genre": "dystopian",
    "publishedYear": 1953,
    "available": false,
    "createdAt": "2025-01-16T10:00:00.000Z"
  },
  {
    "id": "b008",
    "title": "Neuromante",
    "author": "William Gibson",
    "genre": "science-fiction",
    "publishedYear": 1984,
    "available": true,
    "createdAt": "2025-01-17T10:00:00.000Z"
  },
  {
    "id": "b009",
    "title": "Crónica de una muerte anunciada",
    "author": "Gabriel García Márquez",
    "genre": "drama",
    "publishedYear": 1981,
    "available": false,
    "createdAt": "2025-01-18T10:00:00.000Z"
  },
  {
    "id": "b010",
    "title": "Los juegos del hambre",
    "author": "Suzanne Collins",
    "genre": "young-adult",
    "publishedYear": 2008,
    "available": true,
    "createdAt": "2025-01-19T10:00:00.000Z"
  }
]
```

### Modelo de un libro

| Campo | Tipo | Obligatorio | Reglas |
|---|---|---|---|
| `id` | String | Sí | Identificador único generado por el servidor |
| `title` | String | Sí | No puede estar vacío ni contener solo espacios |
| `author` | String | Sí | No puede estar vacío ni contener solo espacios |
| `genre` | String | Sí | No puede estar vacío |
| `publishedYear` | Number | Sí | Entero entre 0 y el año actual |
| `available` | Boolean | Sí | Indica si el libro está disponible |
| `createdAt` | String | Sí | Fecha de creación en formato ISO |

## 4. Endpoints

### Endpoint 1: estado del servidor

**`GET /health`**

Devuelve el estado del servidor y el tiempo que lleva funcionando.

**Respuesta — 200 OK**

```json
{
  "status": "ok",
  "uptime": 123.45
}
```

> El valor de `uptime` dependerá del tiempo real de funcionamiento.

### Endpoint 2: obtener todos los libros

**`GET /books`**

Devuelve la lista de libros.

**Respuesta — 200 OK:** un array con los 10 libros del mock inicial.

### Endpoint 3: obtener un libro por ID

**`GET /books/:id`**

Devuelve un único libro cuyo identificador coincida con el proporcionado.

**Ejemplo:** `GET /books/b003`

**Respuesta — 200 OK**

```json
{
  "id": "b003",
  "title": "Dune",
  "author": "Frank Herbert",
  "genre": "science-fiction",
  "publishedYear": 1965,
  "available": true,
  "createdAt": "2025-01-12T10:00:00.000Z"
}
```

**Si el libro no existe:** `GET /books/b999`

**Respuesta — 404 Not Found**

```json
{
  "error": "Book not found"
}
```

### Endpoint 4: filtrar y paginar libros

**`GET /books`**

Debe permitir combinar varios filtros y paginar los resultados.

#### A. Filtrar por género (`genre`)

| Petición | Resultado esperado |
|---|---|
| `GET /books?genre=fantasy` | 2 libros |

#### B. Filtrar por disponibilidad (`available`)

| Petición | Resultado esperado |
|---|---|
| `GET /books?available=true` | 6 libros |
| `GET /books?available=false` | 4 libros |

#### C. Filtrar por autor (`author`)

Sin distinguir mayúsculas y minúsculas.

| Petición | Resultado esperado |
|---|---|
| `GET /books?author=George%20Orwell` | 1 libro |

#### D. Buscar por título (`title`)

Busca títulos que **contengan** el texto, sin distinguir mayúsculas y minúsculas.

| Petición | Resultado esperado |
|---|---|
| `GET /books?title=dune` | 1 libro |
| `GET /books?title=el` | Todos los títulos que contengan "el" |

#### E. Filtrar por año de publicación (`publishedYear`)

| Petición | Resultado esperado |
|---|---|
| `GET /books?publishedYear=1984` | 1 libro |

#### F. Combinar filtros

Todos los filtros deben poder combinarse.

| Petición | Resultado esperado |
|---|---|
| `GET /books?genre=science-fiction&available=true` | 2 libros |
| `GET /books?genre=dystopian&available=false` | 2 libros |
| `GET /books?author=Frank%20Herbert&available=true` | 1 libro |

#### G. Paginación

- `limit`: número máximo de libros que se devuelven.
- `offset`: número de libros que se omiten antes de empezar a devolver resultados.

| Petición | Comportamiento |
|---|---|
| `GET /books?limit=3` | Devuelve los primeros 3 libros. |
| `GET /books?offset=3&limit=2` | Devuelve el cuarto y el quinto libro del resultado original. |
| `GET /books?genre=science-fiction&limit=1&offset=1` | Aplica el filtro y devuelve el segundo libro de ese resultado. |

#### Reglas de validación de los filtros

- `available` solo acepta `true` o `false`.
- `publishedYear` debe ser un número entero válido.
- `limit` debe ser un entero mayor que cero.
- `offset` debe ser un entero mayor o igual que cero.
- Si un parámetro tiene un valor inválido, devuelve **400 Bad Request**.
- Si la consulta no encuentra resultados, devuelve **200 OK** con un array vacío: `[]`.
- Si se proporcionan varios filtros, deben cumplirse todos.

### Endpoint 5: crear un libro

**`POST /books`**

**Petición**

```http
POST /books
Content-Type: application/json
```

```json
{
  "title": "El camino de los reyes",
  "author": "Brandon Sanderson",
  "genre": "fantasy",
  "publishedYear": 2010,
  "available": true
}
```

#### Requisitos

1. Leer y procesar el cuerpo JSON de la petición.
2. Comprobar que están presentes los campos obligatorios.
3. Validar los tipos de datos y las restricciones del modelo.
4. Generar un identificador único en el servidor.
5. Generar la fecha de creación en el servidor.
6. Añadir el libro a la colección.
7. Devolver el libro creado.

> El cliente **no** debe decidir el `id` ni el `createdAt`.

**Respuesta — 201 Created**

```json
{
  "id": "identificador-generado",
  "title": "El camino de los reyes",
  "author": "Brandon Sanderson",
  "genre": "fantasy",
  "publishedYear": 2010,
  "available": true,
  "createdAt": "fecha-generada-por-el-servidor"
}
```

> Los valores de `id` y `createdAt` son ejemplos descriptivos: debes generar los valores reales.

#### Casos que debes controlar

Todos devuelven **400 Bad Request**:

**Falta el título**

```json
{
  "author": "Brandon Sanderson",
  "genre": "fantasy",
  "publishedYear": 2010,
  "available": true
}
```

**Título vacío**

```json
{
  "title": "   ",
  "author": "Brandon Sanderson",
  "genre": "fantasy",
  "publishedYear": 2010,
  "available": true
}
```

**Año inválido**

```json
{
  "title": "Libro de prueba",
  "author": "Autor de prueba",
  "genre": "fantasy",
  "publishedYear": "dos mil",
  "available": true
}
```

**Disponibilidad con tipo incorrecto**

```json
{
  "title": "Libro de prueba",
  "author": "Autor de prueba",
  "genre": "fantasy",
  "publishedYear": 2020,
  "available": "sí"
}
```

**JSON mal formado:** debe devolver 400 Bad Request y un mensaje de error en JSON.

### Endpoint 6: actualizar un libro

**`PATCH /books/:id`**

Actualiza parcialmente un libro existente.

**Campos modificables:** `title`, `author`, `genre`, `publishedYear`, `available`.

**No modificables:** `id`, `createdAt`.

#### Ejemplo 1: cambiar la disponibilidad

**Petición**

```http
PATCH /books/b001
Content-Type: application/json
```

```json
{
  "available": false
}
```

**Respuesta — 200 OK**

```json
{
  "id": "b001",
  "title": "El nombre del viento",
  "author": "Patrick Rothfuss",
  "genre": "fantasy",
  "publishedYear": 2007,
  "available": false,
  "createdAt": "2025-01-10T10:00:00.000Z"
}
```

#### Ejemplo 2: modificar varios campos

**Petición:** `PATCH /books/b003`

```json
{
  "title": "Dune: Edición revisada",
  "available": false
}
```

Debe modificar los campos enviados y conservar el resto de datos originales.

#### Ejemplo 3: libro inexistente

`PATCH /books/b999` → **404 Not Found**

#### Ejemplo 4: campo no permitido

```json
{
  "id": "otro-id"
}
```

→ **400 Bad Request**

#### Requisitos adicionales

- Comprobar que el libro existe.
- Validar los campos enviados.
- No permitir modificar `id` ni `createdAt`.
- Una petición vacía devuelve **400 Bad Request**.
- Si el JSON está mal formado, devuelve **400 Bad Request**.
- Si la actualización es correcta, devuelve el libro actualizado.

### Endpoint 7: eliminar un libro

**`DELETE /books/:id`**

**Si el libro existe** (`DELETE /books/b004`):
- Elimínalo de la colección.
- Devuelve **204 No Content**.
- No incluyas cuerpo en la respuesta.

**Si el libro no existe** (`DELETE /books/b999`):

**Respuesta — 404 Not Found**

```json
{
  "error": "Book not found"
}
```

Después de eliminar un libro, las siguientes consultas deben reflejar su ausencia.

## 5. Manejo de errores y métodos HTTP

| Situación | Código HTTP |
|---|---|
| Consulta correcta | 200 OK |
| Libro creado correctamente | 201 Created |
| Libro eliminado correctamente | 204 No Content |
| Petición con datos inválidos | 400 Bad Request |
| Ruta inexistente | 404 Not Found |
| Libro inexistente | 404 Not Found |
| Método HTTP no permitido | 405 Method Not Allowed |
| Error inesperado del servidor | 500 Internal Server Error |

### Requisitos generales

- Todas las respuestas con cuerpo usan JSON.
- Las respuestas de error tienen una propiedad `error` con un mensaje descriptivo.
- Las rutas que no existen responden con **404**.
- Si se usa un método no permitido en una ruta conocida, responde con **405**.
- Las respuestas 405 incluyen una cabecera `Allow` con los métodos permitidos.
- No devuelvas detalles internos del servidor en los mensajes de error.

**Ejemplo de error:**

```json
{
  "error": "Invalid request"
}
```

## 6. Configuración del servidor

Archivo `.env`:

```env
PORT=3000
```

- El servidor usa el puerto de la variable de entorno y **3000** si no está definida.
- Al arrancar debe mostrar un mensaje similar a:

```
Servidor escuchando en http://localhost:3000
```

## 7. Peticiones de prueba

Puedes probar con Postman, Insomnia, Thunder Client o curl.

| Método | Endpoint | Resultado esperado |
|---|---|---|
| GET | `/health` | Estado del servidor |
| GET | `/books` | 10 libros iniciales |
| GET | `/books/b001` | Un libro |
| GET | `/books/b999` | 404 |
| GET | `/books?genre=fantasy` | 2 libros |
| GET | `/books?available=true` | 6 libros |
| GET | `/books?available=false` | 4 libros |
| GET | `/books?genre=science-fiction&available=true` | 2 libros |
| GET | `/books?author=George%20Orwell` | 1 libro |
| GET | `/books?title=dune` | 1 libro |
| GET | `/books?publishedYear=1984` | 1 libro |
| GET | `/books?limit=3` | 3 libros |
| GET | `/books?offset=3&limit=2` | 2 libros |
| GET | `/books?limit=-1` | 400 |
| GET | `/books?available=maybe` | 400 |
| POST | `/books` | Crear un libro |
| POST | `/books` con datos inválidos | 400 |
| PATCH | `/books/b001` | Actualizar un libro |
| PATCH | `/books/b999` | 404 |
| DELETE | `/books/b004` | 204 |
| DELETE | `/books/b999` | 404 |
| PUT | `/books/b001` | 405 |
| GET | `/ruta-inexistente` | 404 |

## 8. Prueba final de integración

Realiza esta secuencia:

1. Consulta todos los libros. Debes obtener **10**.
2. Crea un libro nuevo. Debes obtener **201**.
3. Consulta todos los libros otra vez. Debes obtener **11**.
4. Consulta el libro recién creado por su ID.
5. Cambia su disponibilidad a `false`.
6. Filtra con `available=false`. El libro nuevo debe aparecer.
7. Elimina el libro recién creado. Debes obtener **204**.
8. Intenta consultarlo por su ID. Debes obtener **404**.
9. Consulta todos los libros. Debes volver a obtener **10**.
10. Envía una petición con datos inválidos y comprueba que la API devuelve el código de error adecuado.

> **Importante:** basta con mantener los cambios en memoria mientras el servidor funciona. No es necesario escribir las modificaciones en `books.json`.

## Criterio para dar el ejercicio por terminado

El ejercicio está completo cuando:
- Todos los endpoints funcionan.
- Se respetan las validaciones y los códigos HTTP.
- Los filtros se pueden combinar.
- La paginación funciona correctamente.
- Creación, actualización y eliminación se reflejan en las consultas posteriores.

**No necesitas** implementar autenticación, usuarios, préstamos ni conexión a una base de datos.