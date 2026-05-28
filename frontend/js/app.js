// js/app.js — AHORA (datos del backend):
async function cargarProductos() {
  const resultado = await apiGet("/api/products");
  if (!resultado.ok) {
    console.error("Error al cargar productos:", resultado.error);
    return;
  }
  renderizarProductos(resultado.datos);
}
// Confirmar pedido: enviar al backend
async function confirmarPedido() {
  if (carrito.length === 0) return;
  const resultado = await apiPost("/api/orders", {
    items: carrito.map((item) => ({
      product_id: item.id,
      cantidad: item.cantidad,
    })),
  });
  if (!resultado.ok) {
    mostrarMensaje("Error: " + resultado.error, "error");
    return;
  }
  carrito = [];
  guardarCarrito();
  actualizarContador();
  mostrarMensaje(
    "Pedido confirmado! Total: Bs. " + resultado.datos.total,
    "exito",
  );
}
