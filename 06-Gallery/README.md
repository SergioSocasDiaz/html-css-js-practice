# useRouter
# Route (componente)
# Distintas tipos de datos a capturar de la URL (pathname, search, etc MIRAR GEMINI Y FOTO WASAP)
# Distintas maneras de hacer una url
window.location.pathname / window.location.search ...
const url = new URL(window.location) y luego acceder a propiedades
* url.pathname / url.search / url.searchParams
# Proposito de la URL (F5, compartir, retroceder)
# Dilema en enviar datos entre paginas
Para que cuando le demos click a un producto nos lleve a una pagina detallada del producto tenemos dos opciones
1. Mediante la url y estados pasar la id para hacer una segunda llamada a la api y volver a obtener los datos
2. Pasar el objeto para evitar la llamada de la api a traves del `state` de una página que nos permite asignar datos a cierta pagina. EL problema es que al pasar la url a otra persona no funcionará ya que esa persona no tiene estado previo en su navegador
# Nunca usar tamaños fijos
