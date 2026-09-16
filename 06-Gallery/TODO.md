# Limitar columnas de renderizado (A 4) ✅
Calculo: 1200px + 60px + 40px
Contenedor + gap + padding
Solucion a problema de conteneor estirado y haciendo scroll

(Estaba poniendo las distintos items con tamaños fijos) 
En grid hay que gestionar los tamaños de los elementos mediante el minMax() en un grid-template-columns
Y el contenedor si: width:100% y max-width:1300px Su tamaño sera el maximo, debemos limitarlo con 100vw
# Añadir filtros de busqueda con Select
# Hacer funcionar la navegación ✅
# Arreglar problema de que en movil el contenido esta desplzado a la derecha ✅
Mas bien es mas grande el contenido que la pantalla y es como si estuviera con un zoom

(Tamaños de la imagen, al ser fijas no pueden hacerse mas pequeñas y se  desborda)

# Manejar cuando no se encuentran resultados o la llamada falla ✅

# Separar en 2 useEffect, uno para actualizar el textToFilter y el otro para hacer la llamada a la API, asi la navegación es instantanea (En este segundo es donde cambiamos la URL) ✅

# Ver si se puede cambiaar el numero de resltados por página dependiendo del tamaño de la pantalla

# Renderizar distintas navegaciones. SI estoy en la 7 renderizar [...,5,6,7,8,9,...] ✅
Duplicado de puntos ..., Usar otra key porque hay key duplicadas