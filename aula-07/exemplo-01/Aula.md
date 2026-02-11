O Sass (Syntactically Awesome Style Sheets) é um pré-processador CSS. 

Ele estende as funcionalidades do CSS padrão, permitindo o uso de variáveis, funções, 
mixins e aninhamento, que tornam o código mais produtivo e fácil de manter. O SCSS é a sintaxe mais comum, 
pois utiliza chaves {} e ponto e vírgula ; sendo totalmente compatível com o CSS tradicional.

Arquitetura CSS

A arquitetura CSS refere-se ao conjunto de diretrizes e estruturas de pastas que decidimos usar para manter o 
projeto escalável. Sem uma arquitetura, o CSS tende a se tornar um "arquivo gigante" onde qualquer alteração 
pode quebrar partes inesperadas do site.


BEM (Block, Element, Modifier)

O BEM é uma convenção de nomenclatura que ajuda a criar nomes de classes únicos e descritivos. 
Ele resolve o problema de conflitos de CSS (cascata indesejada).

Block: (btn) // componente independente
Element:( btn__text) //parte do bloco que é utilizada com componente
Modifier:  (btn--large) // Variação de estado ou aparência <button class="button btn--success">Enviar</button>


SMACSS

SMACSS (Scalable and Modular Architecture for CSS) é um guia de estilo que divide o CSS em 5 categorias específicas. 
Diferente do BEM (que foca no nome), o SMACSS foca na função de cada regra.

As 5 Categorias do SMACSS

Base: Regras para seletores de elementos puros (html, body, a).

Layout: Divide a página em seções principais (header, footer, sidebar). Geralmente usa prefixos l- ou layout-.

Module: Os componentes reutilizáveis (o coração do site).

State: Como os módulos parecem em estados específicos (escondido, ativo, erro). Geralmente usa o prefixo is-.

Theme: Regras opcionais para mudar cores ou fontes globalmente (ex: Dark Mode).


Design Systems

Um Design System não é apenas código, mas uma "única fonte da verdade". É uma coleção de padrões visuais, 
componentes de UI e diretrizes de marca documentados. No CSS, isso se traduz em tokens de design (cores, espaçamentos) 
e uma biblioteca de componentes consistentes que garantem que todos os desenvolvedores usem o mesmo padrão.


1º npm init -y

2º npm install sass --save-dev

3º npx sass main.scss estilo.css --watch

configurando o script no package.json

  "scripts": {
    "sass": "sass --watch main.scss css/estilo.css"
  },


-Estrutura de pastas
  --abstracts
      *mixins
      *variables
  --base
      *reset
  --components
      *button
      *card
  --css
     *estilo.css
  --layout
    *grid
  --pages
    *home
index.html
main.scss

A corretora "InvesteSmart" precisa de uma nova interface para apresentar seus planos de 
consórcio e fundos de investimento. Seu objetivo é construir a estrutura de estilos (CSS)
utilizando Sass (SCSS), seguindo padrões profissionais de organização de pastas e nomenclatura.

Requisitos Técnicos (As Regras)

1. Arquitetura de Pastas e Arquivos

O projeto deve obrigatoriamente seguir a estrutura abaixo, utilizando arquivos parciais (_):

/abstracts: Deve conter _variables.scss (cores e fontes) e _mixins.scss.

/base: Deve conter _reset.scss (padronização de box-sizing e margens).

/layout: Deve conter _grid.scss (sistema de container e flexbox/grid).

/components: Deve conter _button.scss e _card-investment.scss.

/pages: Deve conter _home.scss (estilos exclusivos do Banner).

/css/ deverá conter o arquivo estilo.css(transpilação)

main.scss: O arquivo mestre que importa todos os anteriores usando @use.

index.html // Frontend da aplicação semâtinco e com acessibilidade


2. Padronização de Código

Metodologia BEM: Todos os componentes devem usar a convenção bloco__elemento--modificador (ex: .card__title, .btn--featured).

Escopo de Módulos: Cada arquivo parcial que utilizar variáveis deve importar o arquivo de origem explicitamente 
com @use '../abstracts/variables' as *;.

Sass Moderno: Para efeitos de hover, utilize o módulo oficial sass:color com a função color.
adjust em vez do antigo lighten ou darken.

3. Desafio de Design

Paleta de Cores: Utilize variáveis para um esquema de cores "Premium" (escolher palheta).

Responsividade: O grid de investimentos deve ser adaptável (mínimo de 300px por card) usando a função repeat(auto-fit, ...).

Interatividade: Os cards devem possuir uma transição suave (transition) que altere levemente sua escala ou elevação ao passar o mouse.