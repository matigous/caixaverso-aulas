// Definindo um contrato(interface) para o objeto Cliente
interface Cliente {
  nome: string;
  nascimento: string;
  telefone: string;
}

// Selecionar os elementos usando o DOM
const formulario = document.querySelector("#form-cliente") as HTMLFormElement;
const inputNome = document.querySelector("#nome") as HTMLInputElement;
const nomeError = document.querySelector("#error-nome") as HTMLSpanElement;
const inputDate = document.querySelector(
  "#data-nascimento",
) as HTMLInputElement;
const dateError = document.querySelector(
  "#error-nascimento",
) as HTMLSpanElement;
const inputTelefone = document.querySelector("#telefone") as HTMLInputElement;
const telefoneError = document.querySelector(
  "#error-telefone",
) as HTMLSpanElement;

// Função de validação em tempo real
formulario.addEventListener("submit", (e: Event) => {
  // Previne que sua página carregue (loanding)
  e.preventDefault();

  // Capturar os valores e tipar como esta na interace cliente
  const dadosCliente: Cliente = {
    nome: inputNome.value,
    nascimento: inputDate.value,
    telefone: inputTelefone.value,
  };

  // Validação simples(SEO)
  nomeError.textContent = validarNome(dadosCliente.nome);
  dateError.textContent = validarNascimento(dadosCliente.nascimento);
  telefoneError.textContent = validarTelefone(dadosCliente.telefone);

  if (
    nomeError.textContent === "" &&
    dateError.textContent === "" &&
    telefoneError.textContent === ""
  ) {
    console.log("Enviando dados", dadosCliente);
    alert(`Cliente ${dadosCliente.nome} cadastrado com sucesso!`);
    // Limpar o formulário
    formulario.reset();
  }
});

function validarNome(nome: string): string {
  if (nome.length < 3) {
    inputNome.style.borderColor = "red";
    return "O nome deve ter pelo menos 3 caracteres";
  } else {
    inputNome.style.borderColor = "";
    return "";
  }
}

function validarNascimento(nascimento: string): string {
  if (nascimento === "") {
    inputDate.style.borderColor = "red";
    return "Data de nascimento é obrigatória";
  } else if (isNaN(Date.parse(nascimento))) {
    inputDate.style.borderColor = "red";
    return "Data de nascimento inválida";
  } else if (new Date(nascimento) > new Date()) {
    inputDate.style.borderColor = "red";
    return "Data de nascimento não pode ser no futuro";
  } else {
    inputDate.style.borderColor = "";
    return "";
  }
}

function validarTelefone(telefone: string): string {
  const telefoneRegex = /^\(\d{2}\)\d{4,5}-\d{4}$/;

  if (!telefoneRegex.test(telefone)) {
    inputTelefone.style.borderColor = "red";
    return "Telefone deve estar no formato (11)9999-9999";
  } else {
    inputTelefone.style.borderColor = "";
    return "";
  }
}
