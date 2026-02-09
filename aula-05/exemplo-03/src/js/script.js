"use strict";
//selecionar os elementos usando o DOM
const formulario = document.querySelector("#form-cliente");
const inputNome = document.querySelector("#nome");
const nomeError = document.querySelector("#error-nome");
const inputDate = document.querySelector("#data-nascimento");
const dateError = document.querySelector("#error-nascimento");
const inputTelefone = document.querySelector("#telefone");
const telefoneError = document.querySelector("#error-telefone");
const telefoneRegex = /^\(\d{2}\)\d{4,5}-\d{4}$/;
//ACESSIBILIDADE função de validação em tempo real
formulario.addEventListener("submit", (e) => {
    //previne que sua página carregue (loanding)
    e.preventDefault();
    //capturar os valores e tipar como esta na interace cliente
    const dadosCliente = {
        nome: inputNome.value,
        nascimento: inputDate.value,
        telefone: inputTelefone.value,
    };
    //validação simples(SEO)
    nomeError.textContent = validarNome(dadosCliente.nome);
    dateError.textContent = validarNascimento(dadosCliente.nascimento);
    telefoneError.textContent = validarTelefone(dadosCliente.telefone);
    if (nomeError.textContent === "" &&
        dateError.textContent === "" &&
        telefoneError.textContent === "") {
        console.log("Enviando dados", dadosCliente);
        alert(`Cliente ${dadosCliente.nome} cadastro com sucesso!`);
        //limpar o formulario
        formulario.reset();
    }
});
function validarNome(nome) {
    if (nome.length < 3) {
        inputNome.style.borderColor = "red";
        return "O nome deve ter pelo menos 3 caracteres";
    }
    else {
        inputNome.style.borderColor = "";
        return "";
    }
}
function validarNascimento(nascimento) {
    if (nascimento === "") {
        inputDate.style.borderColor = "red";
        return "Data de nascimento é obrigatória";
    }
    else if (isNaN(Date.parse(nascimento))) {
        inputDate.style.borderColor = "red";
        return "Data de nascimento inválida";
    }
    else if (new Date(nascimento) > new Date()) {
        inputDate.style.borderColor = "red";
        return "Data de nascimento não pode ser no futuro";
    }
    else {
        inputDate.style.borderColor = "";
        return "";
    }
}
function validarTelefone(telefone) {
    if (!telefoneRegex.test(telefone)) {
        inputTelefone.style.borderColor = "red";
        return "Telefone deve estar no formato (11)9999-9999";
    }
    else {
        inputTelefone.style.borderColor = "";
        return "";
    }
}
