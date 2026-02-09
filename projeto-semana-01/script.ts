interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

let postagemAtual: Post | null = null;

function minhaLocalizacao(): void {
  const geoTela = document.getElementById("user-geo") as HTMLParagraphElement;

  if (!navigator.geolocation) {
    if (geoTela) {
      geoTela.innerText = "Geolocalização não suportada pelo navegador.";
    }
    
    return;
  }

  if (geoTela) {
    geoTela.innerText = "Obtendo localização...";
  }

  navigator.geolocation.getCurrentPosition(
    (pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords;

      if (geoTela) {
        geoTela.innerHTML = `<strong>Latitude:</strong> ${latitude.toFixed(4)} | <strong>Longitude:</strong> ${longitude.toFixed(4)}`;
      }
    },
    (err: GeolocationPositionError) => {
      if (geoTela) {
        geoTela.innerText = "Acesso negado ou erro no GPS.";
      }

      console.error(err.message);
    },
  );
}

async function buscarPostagem(): Promise<void> {
  const tituloEl = document.getElementById(
    "post-titulo",
  ) as HTMLParagraphElement;
  const bodyEl = document.getElementById("post-body") as HTMLParagraphElement;

  if (tituloEl) {
    tituloEl.innerText = "Carregando destino...";
  }

  if (bodyEl) {
    bodyEl.innerText = "";
  }

  try {
    const randomId = Math.floor(Math.random() * 100) + 1;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${randomId}`,
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar postagem");
    }

    const post: Post = await response.json();
    postagemAtual = post;

    if (tituloEl) {
      tituloEl.innerHTML = `<strong>${post.title}</strong>`;
    }

    if (bodyEl) {
      bodyEl.innerText = post.body;
    }
  } catch (error) {
    if (tituloEl) {
      tituloEl.innerText = "Erro ao carregar destino. Tente novamente.";
    }
    
    console.error(error);
  }
}

function salvarFavorito(): void {
  if (!postagemAtual) {
    alert("Busque um destino primeiro antes de salvar!");
    return;
  }

  const favoritosJSON = localStorage.getItem("favoritos");
  let favoritos: string[] = favoritosJSON ? JSON.parse(favoritosJSON) : [];

  if (favoritos.includes(postagemAtual.title)) {
    alert("Este destino já está nos seus favoritos!");
    return;
  }

  favoritos.push(postagemAtual.title);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));

  exibirFavoritos();
  alert("Destino salvo nos favoritos!");
}

function exibirFavoritos(): void {
  const listaEl = document.getElementById(
    "lista-favoritos",
  ) as HTMLUListElement;

  if (!listaEl) return;

  const favoritosJSON = localStorage.getItem("favoritos");
  const favoritos: string[] = favoritosJSON ? JSON.parse(favoritosJSON) : [];

  if (favoritos.length === 0) {
    listaEl.innerHTML = "<li>Nenhum favorito salvo ainda.</li>";
    return;
  }

  listaEl.innerHTML = favoritos
    .map((titulo, index) => `<li>${index + 1}. ${titulo}</li>`)
    .join("");
}

function limparFavoritos(): void {
  if (confirm("Tem certeza que deseja limpar todos os favoritos?")) {
    localStorage.removeItem("favoritos");
    exibirFavoritos();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  exibirFavoritos();
});

(window as any).buscarPostagem = buscarPostagem;
(window as any).salvarFavorito = salvarFavorito;
(window as any).limparFavoritos = limparFavoritos;
