const numeros = [5, 3, 8, 1, 4];

numeros.sort((a, b) => {
  if (a < b) return -1 // `a` va antes que `b`
  if (a > b) return 1  // `b` va antes que `a`
  return 0             // son iguales, no cambia el orden
});

console.log(numeros);
