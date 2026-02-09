"use strict";
let postagemAtual = null;
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
async function buscarPostagem() {
    const tituloEl = document.getElementById("post-titulo");
    const bodyEl = document.getElementById("post-body");
    if (tituloEl) {
        tituloEl.innerText = "Carregando destino...";
    }
    if (bodyEl) {
        bodyEl.innerText = "";
    }
    try {
        const randomId = Math.floor(Math.random() * 100) + 1;
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${randomId}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar postagem");
        }
        const post = await response.json();
        postagemAtual = post;
        if (tituloEl) {
            tituloEl.innerHTML = `<strong>${post.title}</strong>`;
        }
        if (bodyEl) {
            bodyEl.innerText = post.body;
        }
    }
    catch (error) {
        if (tituloEl) {
            tituloEl.innerText = "Erro ao carregar destino. Tente novamente.";
        }
        console.error(error);
    }
}
function salvarFavorito() {
    if (!postagemAtual) {
        alert("Busque um destino primeiro antes de salvar!");
        return;
    }
    const favoritosJSON = localStorage.getItem("favoritos");
    let favoritos = favoritosJSON ? JSON.parse(favoritosJSON) : [];
    if (favoritos.includes(postagemAtual.title)) {
        alert("Este destino já está nos seus favoritos!");
        return;
    }
    favoritos.push(postagemAtual.title);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    exibirFavoritos();
    alert("Destino salvo nos favoritos!");
}
function exibirFavoritos() {
    const listaEl = document.getElementById("lista-favoritos");
    if (!listaEl)
        return;
    const favoritosJSON = localStorage.getItem("favoritos");
    const favoritos = favoritosJSON ? JSON.parse(favoritosJSON) : [];
    if (favoritos.length === 0) {
        listaEl.innerHTML = "<li>Nenhum favorito salvo ainda.</li>";
        return;
    }
    listaEl.innerHTML = favoritos
        .map((titulo, index) => `<li>${index + 1}. ${titulo}</li>`)
        .join("");
}
function limparFavoritos() {
    if (confirm("Tem certeza que deseja limpar todos os favoritos?")) {
        localStorage.removeItem("favoritos");
        exibirFavoritos();
    }
}
document.addEventListener("DOMContentLoaded", () => {
    exibirFavoritos();
});
window.buscarPostagem = buscarPostagem;
window.salvarFavorito = salvarFavorito;
window.limparFavoritos = limparFavoritos;
