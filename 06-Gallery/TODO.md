# Limitar columnas de renderizado (A 4) ✅
The gallery now limits its maximum number of columns so cards remain readable on wide screens. The available width is considered together with the grid gap and container padding, preventing the layout from growing beyond the intended content area.
Calculo: 1200px + 60px + 40px
Contenedor + gap + padding
Solucion a problema de conteneor estirado y haciendo scroll

(Estaba poniendo las distintos items con tamaños fijos) 
En grid hay que gestionar los tamaños de los elementos mediante el minMax() en un grid-template-columns
Y el contenedor si: width:100% y max-width:1300px Su tamaño sera el maximo, debemos limitarlo con 100vw
# Hacer funcionar la navegación ✅
Navigation is implemented through the custom router and browser history. Search results, pagination controls, and links can change the visible view without forcing a complete document reload.
# Arreglar problema de que en movil el contenido esta desplzado a la derecha ✅
The mobile layout was adjusted to prevent content from becoming wider than the viewport. Responsive image sizing is especially important because fixed image dimensions can create horizontal overflow and make the page appear incorrectly zoomed.
Mas bien es mas grande el contenido que la pantalla y es como si estuviera con un zoom

(Tamaños de la imagen, al ser fijas no pueden hacerse mas pequeñas y se  desborda)

# Manejar cuando no se encuentran resultados o la llamada falla ✅
The search page distinguishes between loading, empty results, and request failures. Each state receives its own UI so users understand whether they should wait, reset the search, or return to the home page.

# Separar en 2 useEffect, uno para actualizar el textToFilter y el otro para hacer la llamada a la API, asi la navegación es instantanea (En este segundo es donde cambiamos la URL) ✅
The search flow separates input debouncing from data fetching. One effect waits for the user to stop typing, while the other requests the matching page; this keeps pagination responsive and avoids sending a request for every keystroke.

# Renderizar distintas navegaciones. SI estoy en la 7 renderizar [...,5,6,7,8,9,...] ✅
Long result sets use a condensed pagination model that keeps the current page visible while replacing distant ranges with ellipses. The rendering logic must account for repeated ellipses so every element still receives a unique React key.
Duplicado de puntos ..., Usar otra key porque hay key duplicadas

# Terminar de arreglar responsive de hero campaing con el font-size y el rem ✅
The hero campaign needs typography that scales within its responsive layout. Relative units such as `rem`, together with flexible spacing and media queries, keep the campaign title and call-to-action readable without causing overflow on narrow screens.