//Abstração
abstract class Pagamento {
  //Encapsulamento: protegendo o atributo valor
  // ele só pode ser acessado pela suas classes filhas
  // potected: permite que as classes filhas acessem o atributo
  protected valor: number;

  //Construtor que é método chamado no momento em que criamos o objeto
  //e serve para inicializar os atributos da classe com seus valores
  constructor(valordigitado: number) {
    this.valor = valordigitado;
  }
  // método abstrato, vai obrigar as classes filhas a explicarem como processam o pagamento
  abstract acesso(): void;

  //método comum todas as filhas vão herdar toda lógica pronta
  exibirRecibo(): void {
    console.log(`Recibo gerado no valor de R$ ${this.valor.toFixed(2)}`);
  }
}

// Herança
class PagamentoCartao extends Pagamento {
  // modificadores de acesso(public, privado, protected)
  private numeroCartao: number; // Encapsulamento

  constructor(valor: number, numeroCartao: number) {
    super(valor); // Acessando o construtor da classe Pai (Pagamento)
    this.numeroCartao = numeroCartao; //atributo da classe pagamento Cartão
  }

  //Polimorfismo
  acesso(): void {
    console.log(`Validando o Cartão ${this.numeroCartao}`);
  }
}

const compras: Pagamento[] = [new PagamentoCartao(500.0, 12345678999)];

compras.forEach((pagamento) => {
  pagamento.acesso();
  pagamento.exibirRecibo();
  console.log("....");
});

class PagamentoPix extends Pagamento {
  private chavePix: string;

  constructor(valor: number, chavePix: string) {
    super(valor);
    this.chavePix = chavePix;
  }

  acesso(): void {
    console.log(`Validando o Pix ${this.chavePix}`);
  }
}

const comprasPix: Pagamento[] = [new PagamentoPix(250.0, "minhachavepix")];

comprasPix.forEach((pagamento) => {
  pagamento.acesso();
  pagamento.exibirRecibo();
  console.log("....");
});