// js/api.js — URL base de la API
// En desarrollo: el backend corre en localhost:3000
// En produccion: la URL de Render
const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://aroma-heidy.onrender.com";
// Funciones de ayuda para las peticiones
async function apiGet(ruta) {
  const res = await fetch(API_BASE + ruta);
  return res.json();
}
async function apiPost(ruta, datos) {
  const res = await fetch(API_BASE + ruta, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return res.json();
}
async function apiPut(ruta, datos) {
  const res = await fetch(API_BASE + ruta, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return res.json();
}
async function apiDelete(ruta) {
  const res = await fetch(API_BASE + ruta, { method: "DELETE" });
  return res.json();
}
