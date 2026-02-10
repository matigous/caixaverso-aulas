interface Cliente {
  name: string;
  email: string;
  message: string;
}

const formulario = document.querySelector("#form-cliente") as HTMLFormElement;
const inputNome = document.querySelector("#nome") as HTMLInputElement;
const inputEmail = document.querySelector("#email") as HTMLInputElement;
const inputMessage = document.querySelector("#message") as HTMLTextAreaElement;
const errorMessage = document.querySelector(
  "#error-message",
) as HTMLSpanElement;

formulario.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  // Limpa erros anteriores
  limparErros();

  const dadosCliente: Cliente = {
    name: inputNome.value.trim(),
    email: inputEmail.value.trim(),
    message: inputMessage.value.trim(),
  };

  const erros: string[] = [];

  if (!validarNome(dadosCliente.name)) {
    erros.push("O nome deve ter pelo menos 3 caracteres.");
  }

  if (!validarEmail(dadosCliente.email)) {
    erros.push("Por favor, insira um email válido.");
  }

  if (!validarMensagem(dadosCliente.message)) {
    erros.push("A mensagem deve ter pelo menos 10 caracteres.");
  }

  // Exibe todos os erros no último span
  if (erros.length > 0) {
    errorMessage.textContent = erros.join(" | ");
  } else {
    alert(
      `Obrigado, ${dadosCliente.name}! Seu feedback foi recebido com sucesso.`,
    );
    formulario.reset();
  }
});

function limparErros(): void {
  errorMessage.textContent = "";
  inputNome.classList.remove("input-error");
  inputEmail.classList.remove("input-error");
  inputMessage.classList.remove("input-error");
}

function validarNome(nome: string): boolean {
  if (nome.length < 3) {
    inputNome.classList.add("input-error");
    return false;
  }
  return true;
}

function validarEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    inputEmail.classList.add("input-error");
    return false;
  }
  return true;
}

function validarMensagem(mensagem: string): boolean {
  if (mensagem.length < 10) {
    inputMessage.classList.add("input-error");
    return false;
  }
  return true;
}
