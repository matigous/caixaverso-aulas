let nome = "Fiap";
let idade = 30;
let programador = true;
console.log(nome);
console.log(idade);
console.log(programador);
// Função simples com typagem
function comuinicado(nome) {
    return `Ola, ${nome} Bem-vindo ao mundo Typescript`;
}
console.log(comuinicado("Caixa"));
// Função com operadores
function calcular(preco, quantidade) {
    const total = preco * quantidade;
    return total;
}
const resultado = calcular(50, 10);
console.log(resultado);
// Closures
/* acontece quando uma função lembra do escopo que foir criada mesmo depois
de ser executada, "memória"
*/
function contador() {
    let contagem = 0; // variavel está protegida dentro da função
    return {
        incrementar: () => {
            contagem++; // função interna que vai acessar a a variavel externa
            return contagem;
        },
    };
}
const resultContador = contador();
console.log(resultContador.incrementar());
console.log(resultContador.incrementar());
//Callback
// Callback é uma função passada como argunto para outra função.
//função que recebe uma string e não retorna nada(void)
function usuario(nome, callback) {
    const mensagem = `Usuario ${nome} logado com sucesso`;
    callback(mensagem); // executa a função enviada após o processamento
}
//executando a função
usuario("Thor", (resultado) => {
    console.log(resultado);
});
const meuCarro = {
    marca: "Audi",
    ano: 2026,
    modelo: "Audi SX",
};
console.log(meuCarro);
function livraria(titulo, paginas, autor, disponivel, cliente, callback) {
    const mensagem = `Cliente ${cliente} recebeu o livro "${titulo}" do autor ${autor}.`;
    callback(mensagem);
}
//executando a função
livraria("O Senhor dos Anéis", 1200, "J.R.R. Tolkien", true, "Ana", (resultado) => {
    console.log(resultado);
});
export {};
