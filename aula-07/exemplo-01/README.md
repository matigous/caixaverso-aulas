<!-- O Sass (Syntactically Awesome Style Sheets) é um pré-processador CSS.

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
Modifier:  (btn--large) // Variação de estado ou aparência <button class="button btn--sucess">Enviar</button>

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
  }, -->

<!-- -Estrutura de pastas
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
main.scss -->