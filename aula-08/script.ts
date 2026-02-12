const menuToggle = document.getElementById("menu-toggle") as HTMLButtonElement | null;
const navList =document.getElementById('nav-list') as HTMLUListElement | null;

// verifica se os elementos realmente existem antes de adicionar os eventos
if(menuToggle && navList){
    menuToggle.addEventListener('click',()=>{
        // pegar o valor do atributo o typsescript sabe que o getAttribute retorna uma string ou nulo
        const isExpandido = menuToggle.getAttribute('aria-expanded')==="true";

        //inverte o estado e converte par string, ja que o atributo exige string
        menuToggle.setAttribute("aria-expanded",String(!isExpandido))

        // alterna a classe navlist
        navList.classList.toggle('active')
    })
}else{
    console.error("Elemento não encontrado")
}