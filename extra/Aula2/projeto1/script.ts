//Objeto(interfaces)
//Produto
interface Produto{
    readonly id:number;
    nome:string;
    preco:number
}
//Carrinho

interface Carrinho{
    // FUNÇÃO QUE  O ADICIONAR RECEBE UM OBJETO PRODUTO QUE NÃO RETORNA NADA
    adicionar:(produto:Produto)=>void;
    // FUNÇÃO: REMOVER QUE PRECISA DE UM ID (NUMBER)
    remover:(id:number)=>void;
    // ARRAY: RETORNA UMA LISTA DE OBJETOS DO TIPO PRODUTO
    obterItens:()=>Produto[];
    //CALLBACK
    /*
        1- o método finalizarPediro não retorna valor diretamente, ele vai receber um função(ação)
        como argumento
        2 - ação será executada posteriormente, recebendo o total e os itens
    */
    finalizarPedido:(acao:(total:number,itens:Produto[])=> void)=> void;
}

//CLOSURE
function AddCarrinho():Carrinho{
    let itens: Produto[]=[]; //Varíavel que ficará na memória do closure 

    const sincronizar =()=>{
        const tela = document.getElementById('carrinho');
        if(!tela) return;

        if(itens.length === 0){
            tela.innerHTML ="<h3>Carrinho Vazio</h3>";
            return;
        }
    
        const total = itens.reduce((soma,item)=> soma + item.preco,0);

        tela.innerHTML =`
            <h3>Resumo do Pedido</h3>
            <ul>
                ${itens.map(item =>`
                    <li>
                        ${item.nome} - ${item.preco}
                        <button class="btn-remover" onclick="removerCarrinho(${item.id})">X</button>
                    </li>
                    `).join('')}
            </ul>
            <hr>
            <p><strong>Total: R$${total.toFixed(2)} </strong></p> 
        `;
    };

    return {
        adicionar:(produto:Produto):void =>{
            itens=[...itens, {...produto,id:Date.now() + Math.random()}];
            sincronizar();
        },
        remover:(id:number):void=>{
            itens =itens.filter(item =>item.id !== id)
            sincronizar();
        },
        obterItens: ():Produto[]=>[...itens],

        finalizarPedido:(acao):void=>{
            const total = itens.reduce((soma, item)=>soma + item.preco,0);
            acao(total, [...itens])//execução do callback enviado as informações precessadas
        }
    }
}

//inicializada a instancia (uso do Closure)
const meuCarrinho = AddCarrinho();


//EVENTOS

const botoes = document.querySelectorAll('.btn-comprar');

botoes.forEach(botao =>{
    botao.addEventListener('click',(e)=>{
        const elemento = e.currentTarget as HTMLButtonElement;

        const id = Number(elemento.getAttribute('data-id'));
        const nome= elemento.getAttribute('data-nome') || "";
        const preco = Number(elemento.getAttribute('data-preco'))

        meuCarrinho.adicionar({id,nome,preco});
    })
});

//EXPOSIÇÃO GLOBAL

(window as any).AddCarrinho = function(id:number, nome:string, preco:number){
    meuCarrinho.adicionar({id,nome, preco})
};

(window as any).removerCarrinho = function(id:number){
    meuCarrinho.remover(id)
};
