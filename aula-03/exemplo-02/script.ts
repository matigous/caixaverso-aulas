// temporizador que executa uma função após um atraso
console.log("Inicio");
// setTimeout(()=> alert("Execute após 5s"),5000);
setTimeout(()=> console.log("Execute após 5s"),5000);
console.log("fim");
 
// Leitura de um arquivo passando um callback para processar o resultado
const arquivo = (nome:string, callback:(conteudo:string)=>void)=>{
    setTimeout(()=> callback(`Conteúdo de ${nome}`),2000);
}
arquivo("doc.txt",(res)=>console.log(res));
 
 
// Evento de click que tem uma reação assincrona baseada na interação do usuario
const botao = document.querySelector("#btn-botao");
botao?.addEventListener("click",()=> console.log("Comprou"));