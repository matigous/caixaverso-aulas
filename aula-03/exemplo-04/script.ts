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

function mudarTema(): void {
  const body = document.body;
  body.classList.toggle("dark-mode");
}

(window as any).minhaLocalizacao = minhaLocalizacao;
(window as any).mudarTema = mudarTema;
