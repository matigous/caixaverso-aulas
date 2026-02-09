async function buscarDados(){
    try{
        const resposta = await fetch("https://dummyjson.com/quotes");
        const dados = await resposta.json()
        console.table(dados)
        console.log("Busca correta")
        return dados;
   
    } catch(erro){
        console.error("Erro ao solicitar a requisição",erro)
    }
   
}

buscarDados();

console.log("dados carregados");
 
const exibirQuotes = async () => {
    const container = document.getElementById('quotes-lista');
    if (!container) return;
    
    buscarDados().then((dadosLista) => {
        if (dadosLista?.quotes && dadosLista.quotes.length > 0) {
            dadosLista.quotes.forEach((quote: { quote: string; author: string }) => {
                const quoteElement = document.createElement('div');
                quoteElement.classList.add('quote-item');
                quoteElement.innerHTML = `
                    <p class="quote-text">"${quote.quote}"</p>
                    <p class="quote-author">- ${quote.author}</p>
                `;
                container.appendChild(quoteElement);
            }  
            );
        } else {
            container.innerHTML = '<p>Nenhuma citação encontrada.</p>';
        }
    });
};

exibirQuotes();
