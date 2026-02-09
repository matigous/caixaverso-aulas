let nome:string ="Fiap";
let idade:number=30;
let programador:boolean = true;

console.log(nome);
console.log(idade);
console.log(programador);

// Função simples com typagem
function comuinicado(nome:string):string{
    return `Ola, ${nome} Bem-vindo ao mundo Typescript`;
}

console.log(comuinicado("Caixa"));

// Função com operadores  
function calcular(preco:number,quantidade:number){
    const total = preco * quantidade;
    return total
}
const resultado= calcular(50,10);
console.log(resultado);

// Closures
/* acontece quando uma função lembra do escopo que foir criada mesmo depois
de ser executada, "memória"
*/

function contador(){
    let contagem =0; // variavel está protegida dentro da função

    return{
        incrementar:(): number =>{
            contagem++; // função interna que vai acessar a a variavel externa
            return contagem;
        }
    }
}
 const resultContador = contador();
 console.log(resultContador.incrementar());
 console.log(resultContador.incrementar());


 //Callback
// Callback é uma função passada como argunto para outra função.

//função que recebe uma string e não retorna nada(void)
 function usuario(nome:string, callback:(msg:string)=> void):void{
    const mensagem = `Usuario ${nome} logado com sucesso`;
    callback(mensagem);// executa a função enviada após o processamento
 }

 //executando a função
 usuario("Thor",((resultado)=>{
    console.log(resultado);
 }))

 //objetos e interfaces(molde)

 //usamos interfaces  para descrever a estrutura(contrato)
 interface Carro{
    marca:string;
    ano:number;
    modelo:string;
 }

 const meuCarro: Carro ={
    marca:"Audi",
    ano:2026,
    modelo:"Audi SX"
 };

 console.log(meuCarro)


 //Criar um projeto de livraria que com os atribuitos (titulo,paginas,autor, disponivel)
 //e mostre o resultado mostrando a mensagem que "Cliente (nome) recebeu o (livro) do (autor)" usando função e callback
