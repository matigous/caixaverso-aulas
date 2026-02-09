"use strict";
function minhaLocalizacao() {
    const geoTela = document.getElementById("user-geo");
    if (!navigator.geolocation) {
        if (geoTela) {
            geoTela.innerText = "Geolocalização não suportada pelo navegador.";
        }
        return;
    }
    if (geoTela) {
        geoTela.innerText = "Obtendo localização...";
    }
    navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        if (geoTela) {
            geoTela.innerHTML = `<strong>Latitude:</strong> ${latitude.toFixed(4)} | <strong>Longitude:</strong> ${longitude.toFixed(4)}`;
        }
    }, (err) => {
        if (geoTela) {
            geoTela.innerText = "Acesso negado ou erro no GPS.";
        }
        console.error(err.message);
    });
}
function mudarTema() {
    const body = document.body;
    body.classList.toggle("dark-mode");
}
window.minhaLocalizacao = minhaLocalizacao;
window.mudarTema = mudarTema;
