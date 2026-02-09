//Abstração
class Pagamento {
    //Encapsulamento: protegendo o atributo valor
    // ele só pode ser acessado pela suas classes filhas
    valor;
    //Construtor que é método chamado no momento em que criamos o objeto
    //e serve para inicializar os atributos da classe com seus valores
    constructor(valordigitado) {
        this.valor = valordigitado;
    }
    //método comum todas as filhas vão herdar toda lógica pronta
    exibirRecibo() {
        console.log(`Recibo gerado no valor de R$ ${this.valor.toFixed(2)}`);
    }
}
// Herança
class PagamentoCartao extends Pagamento {
    // modificadores de acesso(public, privado, protected)
    numeroCartao; // Encapsulamento
    constructor(valor, numeroCartao) {
        super(valor); // Acessando o construtor da classe Pai (Pagamento)
        this.numeroCartao = numeroCartao; //atributo da classe pagamento Cartão
    }
    //Polimorfismo
    acesso() {
        console.log(`Validando o Cartão ${this.numeroCartao}`);
    }
}
const compras = [new PagamentoCartao(500.0, 12345678999)];
compras.forEach((pagamento) => {
    pagamento.acesso();
    pagamento.exibirRecibo();
    console.log("....");
});
class PagamentoPix extends Pagamento {
    chavePix;
    constructor(valor, chavePix) {
        super(valor);
        this.chavePix = chavePix;
    }
    acesso() {
        console.log(`Validando o Pix ${this.chavePix}`);
    }
}
const comprasPix = [new PagamentoPix(250.0, "minhachavepix")];
comprasPix.forEach((pagamento) => {
    pagamento.acesso();
    pagamento.exibirRecibo();
    console.log("....");
});
export {};
