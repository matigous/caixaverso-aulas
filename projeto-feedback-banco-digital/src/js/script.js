"use strict";
const formulario = document.querySelector("#form-cliente");
const inputNome = document.querySelector("#nome");
const inputEmail = document.querySelector("#email");
const inputMessage = document.querySelector("#message");
const errorMessage = document.querySelector("#error-message");
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    // Limpa erros anteriores
    limparErros();
    const dadosCliente = {
        name: inputNome.value.trim(),
        email: inputEmail.value.trim(),
        message: inputMessage.value.trim(),
    };
    const erros = [];
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
    }
    else {
        alert(`Obrigado, ${dadosCliente.name}! Seu feedback foi recebido com sucesso.`);
        formulario.reset();
    }
});
function limparErros() {
    errorMessage.textContent = "";
    inputNome.classList.remove("input-error");
    inputEmail.classList.remove("input-error");
    inputMessage.classList.remove("input-error");
}
function validarNome(nome) {
    if (nome.length < 3) {
        inputNome.classList.add("input-error");
        return false;
    }
    return true;
}
function validarEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        inputEmail.classList.add("input-error");
        return false;
    }
    return true;
}
function validarMensagem(mensagem) {
    if (mensagem.length < 10) {
        inputMessage.classList.add("input-error");
        return false;
    }
    return true;
}
