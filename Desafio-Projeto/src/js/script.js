"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ConsorcioEngine {
    constructor() {
        this.allPlans = []; // Cache local de todos os planos
        // Tenta localizar no HTML o elemento onde os cards serão exibidos (o grid)
        this.container = document.getElementById('planosGrid');
        // Tenta localizar o campo de entrada de texto usado para o filtro
        // O "as HTMLInputElement" avisa ao TypeScript que este elemento terá a propriedade '.value'
        this.searchInput = document.getElementById('filterInput');
        //Verificação de segurança essencial
        // O código dentro do 'if' só será executado se ambos os elementos acima forem encontrados
        if (this.container && this.searchInput) {
            // Inicia o processo de busca de dados (fetch) e configuração do sistema
            this.init();
        }
    }
    // promessa
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Busca o arquivo JSON de forma assíncrona
                const response = yield fetch('./planos.json');
                if (!response.ok)
                    throw new Error('Erro ao carregar dados');
                // Converte a resposta bruta em um objeto JS/TS
                this.allPlans = yield response.json();
                this.render(this.allPlans); // Desenha os cards iniciais
                this.setupFilter(); // Ativa o campo de busca
            }
            catch (error) {
                // Caso o arquivo falte ou o servidor caia, avisa o usuário
                if (this.container) {
                    this.container.innerHTML = `<p>Erro ao carregar os planos.</p>`;
                }
            }
        });
    }
    setupFilter() {
        var _a;
        // Adiciona um ouvinte ao input de busca que dispara toda vez que o usuário digita algo
        (_a = this.searchInput) === null || _a === void 0 ? void 0 : _a.addEventListener('input', () => {
            var _a;
            // Captura o valor digitado, transforma em minúsculas para a busca não ser sensível ao caso (Case Insensitive)
            // Se o valor for nulo, define uma string vazia como padrão
            const query = ((_a = this.searchInput) === null || _a === void 0 ? void 0 : _a.value.toLowerCase()) || "";
            // Cria um novo array apenas com os planos que atendem aos critérios de busca
            const filtered = this.allPlans.filter(p => 
            // Critério 1: O tipo do consórcio (ex: "carro") contém o que foi digitado?
            p.tipo.toLowerCase().includes(query) ||
                // Critério 2: O valor do crédito (convertido para texto) contém os números digitados?
                p.valorCredito.toString().includes(query));
            // Chama o método de renderização passando apenas a lista filtrada para atualizar a tela
            this.render(filtered);
        });
    }
    render(planos) {
        if (!this.container)
            return;
        // Se a busca não encontrar nada, exibe mensagem amigável
        if (planos.length === 0) {
            this.container.innerHTML = `<p class="empty-msg">Nenhum plano encontrado.</p>`;
            return;
        }
        // Transforma cada objeto de plano em um bloco de HTML (Card)
        this.container.innerHTML = planos.map(p => `
            <article class="plan-card">
                <div class="card-header">
                    <span class="label">${p.tipo}</span>
                    <h3>Crédito: R$ ${p.valorCredito.toLocaleString('pt-BR')}</h3>
                </div>
                <div class="card-body">
                    <p>Parcelas de <strong>R$ ${p.parcela.toLocaleString('pt-BR')}</strong></p>
                    <small>Em até ${p.prazo} meses</small>
                </div>
                <button class="btn-primary">Quero Simular</button>
            </article>
        `).join(''); // O .join('') evita que apareçam vírgulas entre os cards
    }
}
class MenuNavigation {
    constructor() {
        // Busca o botão no HTML pelo ID e força o tipo (casting) para Button
        this.btn = document.getElementById('btnMenu');
        // Busca o elemento do menu pelo ID
        this.menu = document.getElementById('menuLinks');
        // Verificação de segurança: só prossegue se ambos os elementos existirem na página
        if (this.btn && this.menu) {
            // Chama o método que vai "escutar" as interações do usuário
            this.bindEvents();
        }
    }
    bindEvents() {
        var _a, _b;
        // Abre/fecha ao clicar no botão
        (_a = this.btn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => this.toggleMenu());
        // Se clicar em um link (âncora) dentro do menu, ele fecha sozinho
        (_b = this.menu) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
            const target = e.target;
            if (target.tagName === 'A') {
                this.closeMenu();
            }
        });
    }
    toggleMenu() {
        // Validação de segurança: se o menu ou botão sumirem do DOM, interrompe a função
        if (!this.menu || !this.btn)
            return;
        // Alterna a classe 'active' no menu: se tiver, remove; se não tiver, adiciona
        // A variável 'isOpen' recebe true se a classe foi adicionada, ou false se removida
        const isOpen = this.menu.classList.toggle('active');
        // Alterna a classe 'open' no botão (usada para animar o ícone do hambúrguer para o X)
        this.btn.classList.toggle('open');
        // Atualiza o atributo ARIA para que cegos ou pessoas com baixa visão saibam 
        // via leitor de tela se o conteúdo do menu está expandido (true) ou recolhido (false)
        this.btn.setAttribute('aria-expanded', isOpen.toString());
    }
    closeMenu() {
        var _a, _b;
        // O uso do '?' (Optional Chaining) tenta remover a classe 'active' apenas se 'this.menu' existir
        (_a = this.menu) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
        // Remove a classe 'open' do botão, forçando o ícone a voltar ao estado de hambúrguer
        (_b = this.btn) === null || _b === void 0 ? void 0 : _b.classList.remove('open');
    }
}
// Inicialização segura
window.addEventListener('DOMContentLoaded', () => {
    new MenuNavigation(); // Instancia o menu
    new ConsorcioEngine(); // Instancia o buscador de planos
});
