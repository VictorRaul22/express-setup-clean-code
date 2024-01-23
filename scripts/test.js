try {
  // Código que puede lanzar un error
  throw new Error("¡Algo salió mal!");
} catch (error) {
  // Bloque catch que maneja el error
  console.error("Error capturado:", error.message);
}

// El programa continúa después del bloque catch
console.log("El programa sigue ejecutándose...");
 