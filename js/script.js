// Seleção de elementos
// 01 - Selecionando o formulário
const multiplicationForm = document.querySelector("#multiplication-form");
// 02 - Numero da tabuada
const numberInput = document.querySelector("#number");
// 03 - Quanta vezes desejamos multiplicar
const multiplicationInput = document.querySelector("#multiplicator");
 
 
// 05 - Limpando os campos "#multiplication-title span" e #multiplication-operations"
const multiplicationTitle = document.querySelector(
  "#multiplication-title span"
);
const multiplicationTable = document.querySelector(
  "#multiplication-operations"
);
const motivationalBtn =document.querySelector("#get-quote");
const motivationalQuote = document.querySelector("#motivational-quote");
let frasesMotivacionais = [];

 
// Funções

const isValidInput = (number,multiplicatorNumber) => {
    return(
        Number.isInteger(number) &&
        number > 0 &&
        Number.isInteger(multiplicatorNumber) && 
        number > 0 &&
        multiplicatorNumber > 0
    )
}
 
// 06 - Criando a função que  cria tabela
const createTable = (number, multiplicatorNumber) => {
  multiplicationTable.innerHTML = ""; // Acesso o conteudo de texto e subtituo por string vazia

  if(!isValidInput(number, multiplicatorNumber)) {
    multiplicationTitle.textContent = "";
    multiplicationTable.innerHTML ="<p>Por favor, insira números inteiros positivos..</p>";
    return;
  }
  multiplicationTitle.textContent = number;
 
  //criando a tabuada
  for (let i = 1; i <= multiplicatorNumber; i++) {
    const result = number * i;
 
    const template = `<div class="row">
            <span>${number} x ${i} = </span>
            <span class="result">${result}</span>
            </div>`;

    multiplicationTable.innerHTML += template;
  }
 
};
 
 
// Eventos
// 04
multiplicationForm.addEventListener("submit", (e) => {
  e.preventDefault(); //Quando clicar no botção calcular, não quero que ele recarregue a página

  const number = parseInt(numberInput.value, 10);
  const multiplicatorNumber = parseInt(multiplicationInput.value, 10);

  createTable(number, multiplicatorNumber); // vamos criar a função que cria a tabela mas para isso, precisamos garantir  que o campos "#multiplication-title span" e "#multiplication-operations" estejam vazios..... vá para o 05

  numberInput.value ="";
  multiplicationInput.value ="";

  numberInput.focus();
});

[numberInput,multiplicationInput].forEach((input) => {
  input.addEventListener("keypress", (event) =>{
    if(event.key === "Enter") {
      event.preventDefault();
      multiplicationForm.dispatchEvent(new Event("submit"));
    }
  });
});

function mostrarFrasesMotivacional(){
  if(frasesMotivacionais.length === 0){
    motivationalQuote.textContent = "Carregando frases motivacionais ...";
    return;
  }
  const index = Math.floor(Math.random() * frasesMotivacionais.length);
  motivationalQuote.textContent = frasesMotivacionais[index];
}

fetch('frases.json')
  .then(Response => Response.json())
  .then(data => {
    frasesMotivacionais = data;
  })
  .catch(() =>{
    frasesMotivacionais = [
      "Não foi possivel carregar as frases motivacionais. Tente novamente mais tarde."
    ];
  });

  motivationalBtn.addEventListener("click", mostrarFrasesMotivacional);