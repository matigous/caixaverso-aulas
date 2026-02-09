interface Doce {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    emoji: string;
}

interface ItemCarrinho {
    doce: Doce;
    quantidade: number;
}

const doces: Doce[] = [
    {
        id: 1,
        nome: "Brigadeiro Gourmet",
        descricao: "Chocolate belga com granulado",
        preco: 5.00,
        emoji: "🍫"
    },
    {
        id: 2,
        nome: "Beijinho Premium",
        descricao: "Coco fresco e leite condensado",
        preco: 4.50,
        emoji: "🥥"
    },
    {
        id: 3,
        nome: "Trufa de Maracujá",
        descricao: "Recheio cremoso de maracujá",
        preco: 7.00,
        emoji: "🍬"
    },
    {
        id: 4,
        nome: "Brownie Especial",
        descricao: "Com nozes e calda de chocolate",
        preco: 12.00,
        emoji: "🍪"
    },
    {
        id: 5,
        nome: "Cupcake Red Velvet",
        descricao: "Com cobertura de cream cheese",
        preco: 9.00,
        emoji: "🧁"
    },
    {
        id: 6,
        nome: "Macaron Francês",
        descricao: "Sabores variados",
        preco: 6.00,
        emoji: "🍡"
    }
];

let carrinho: ItemCarrinho[] = [];

function formatarPreco(valor: number): string {
    return valor.toFixed(2).replace('.', ',');
}

function renderizarProdutos(): void {
    const container = document.getElementById('produtos-lista');
    if (!container) return;
    
    container.innerHTML = '';
    
    doces.forEach((doce: Doce) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-emoji">${doce.emoji}</div>
            <h3>${doce.nome}</h3>
            <p class="card-descricao">${doce.descricao}</p>
            <p class="card-preco">R$ ${formatarPreco(doce.preco)}</p>
            <button class="btn-comprar" data-id="${doce.id}">Adicionar</button>
        `;
        container.appendChild(card);
    });
    
    adicionarEventosBotoes();
}

function adicionarEventosBotoes(): void {
    const botoes = document.querySelectorAll('.btn-comprar');
    
    botoes.forEach((botao) => {
        botao.addEventListener('click', (evento: Event) => {
            const target = evento.target as HTMLButtonElement;
            const id = Number(target.dataset.id);
            adicionarAoCarrinho(id);
        });
    });
}

function adicionarAoCarrinho(id: number): void {
    const doce = doces.find((d: Doce) => d.id === id);
    if (!doce) return;
    
    const itemExistente = carrinho.find((item: ItemCarrinho) => item.doce.id === id);
    
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ doce: doce, quantidade: 1 });
    }
    
    atualizarCarrinho();
}

function removerDoCarrinho(id: number): void {
    carrinho = carrinho.filter((item: ItemCarrinho) => item.doce.id !== id);
    atualizarCarrinho();
}

function calcularTotal(): number {
    let total: number = 0;
    
    carrinho.forEach((item: ItemCarrinho) => {
        total += item.doce.preco * item.quantidade;
    });
    
    return total;
}

function atualizarCarrinho(): void {
    const containerItens = document.getElementById('carrinho-itens');
    const spanTotal = document.getElementById('total');
    
    if (!containerItens || !spanTotal) return;
    
    if (carrinho.length === 0) {
        containerItens.innerHTML = '<p class="carrinho-vazio">Carrinho vazio</p>';
        spanTotal.textContent = '0,00';
        return;
    }
    
    let html: string = '';
    
    carrinho.forEach((item: ItemCarrinho) => {
        const subtotal = item.doce.preco * item.quantidade;
        html += `
            <div class="carrinho-item">
                <span class="carrinho-item-nome">
                    ${item.doce.emoji} ${item.doce.nome} (${item.quantidade}x)
                </span>
                <span class="carrinho-item-preco">R$ ${formatarPreco(subtotal)}</span>
                <button class="btn-remover" data-id="${item.doce.id}">X</button>
            </div>
        `;
    });
    
    containerItens.innerHTML = html;
    spanTotal.textContent = formatarPreco(calcularTotal());
    
    const botoesRemover = document.querySelectorAll('.btn-remover');
    botoesRemover.forEach((botao) => {
        botao.addEventListener('click', (evento: Event) => {
            const target = evento.target as HTMLButtonElement;
            const id = Number(target.dataset.id);
            removerDoCarrinho(id);
        });
    });
}

function finalizarPedido(): void {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    const total = calcularTotal();
    alert(`Pedido finalizado!\nTotal: R$ ${formatarPreco(total)}\nObrigado pela preferência! 🍬`);
    
    carrinho = [];
    atualizarCarrinho();
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos();
    
    const btnFinalizar = document.getElementById('btn-finalizar');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', finalizarPedido);
    }
});
