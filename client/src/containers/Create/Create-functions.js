function filterName(str) {
  return str.replace(/[^a-zA-Z0-9\s]/g, '');
}

function filterDescription(str) {
  return str.replace(/[^\w\s.;:à-ÿ,]/gi, '');
}

function validateRating(str) {
  // Eliminar cualquier caracter que no sea un número o un punto
  let filteredStr = str.replace(/[^0-9.]/g, '');
  
  // Separar enteros de decimales usando el punto
  let parts = filteredStr.split('.');
  
  // Si hay más de un punto, usar solo el primero y descartar el resto
  if (parts.length > 2) {
    parts = [parts[0], parts[1]];
  }
  
  // Si no hay parte entera, usar 0
  let integerPart = parts[0] || '0';
  
  // Si hay parte decimal, limitarla a 2 dígitos
  let decimalPart = parts[1] || '';
  if (decimalPart.length > 2) {
    decimalPart = decimalPart.slice(0, 2);
  }
  
  // Combinar la parte entera y la parte decimal con un punto

  if (decimalPart) {
    str = integerPart + '.' + decimalPart;
  }
  
  // Convertir la cadena resultante a un número y asegurarse de que esté entre 0 y 5
  let num = Number(str);
  if (isNaN(num)) {
    alert('El valor ingresado no es un número válido entre 0 y 5');
    return '';
  } else if (num < 0 || num > 5) {
    alert('El valor ingresado debe estar entre 0 y 5');
    return '';
  }
  
  return str;
}

export { filterName, filterDescription, validateRating };