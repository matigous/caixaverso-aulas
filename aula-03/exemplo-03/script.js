"use strict";
async function buscarDados() {
    try {
        const response = await fetch('https://dummyjson.com/quotes');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.table(data);
        return data;
    }
    catch (error) {
        console.error("Erro ao solicitar dados:", error);
    }
}
// exibir lista de quotes na página
const exibirQuotes = async () => {
    const container = document.getElementById('quotes-lista');
    if (!container)
        return;
    buscarDados().then((dadosLista) => {
        if (dadosLista?.quotes && dadosLista.quotes.length > 0) {
            dadosLista.quotes.forEach((quote) => {
                const quoteElement = document.createElement('div');
                quoteElement.classList.add('quote-item');
                quoteElement.innerHTML = `
                    <p class="quote-text">"${quote.quote}"</p>
                    <p class="quote-author">- ${quote.author}</p>
                `;
                container.appendChild(quoteElement);
            });
        }
        else {
            container.innerHTML = '<p>Nenhuma citação encontrada.</p>';
        }
    });
};
exibirQuotes();
