import "bootstrap";
import "./style.css";


import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  //write your code here
 //esto me hace referencia con lo que tengo en HTML
 const drawBtn = document.getElementById("draw"); //boton de draw
 const sortBtn = document.getElementById("sort"); //boton de sort
 const cardContainer = document.querySelector(".deck")//aqui va las cartas
 const inputCount = document.getElementById("cardCount")

//aqui le damos valores a las cartas con numeros y simbolos
const cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const cardSuits = ["♦", "♥", "♠", "♣"]; 

//guarda la carta
let cards = [];
let deck = []; 
let log = [];

//formula para que se mueva aleatoriamente
const getRandomCard = () => {
  const valueIndex = Math.floor(Math.random() * cardValues.length);
  const suitIndex = Math.floor(Math.random() * cardSuits.length);
  return {
    value: cardValues[valueIndex],
    suit: cardSuits[suitIndex],
    num: valueIndex + 1 
  };
};

//aqui voy a crear las cartas
const createCardHTML = (card) => {
  const cardDiv = document.createElement("div");
 //aqui cambio el color de las cartas a rojo "♥" y "♦"
  const isRed = card.suit === "♥" || card.suit === "♦";
  cardDiv.className = isRed ? "card red" : "card";
  // cardDiv.className = "card";
  cardDiv.innerHTML = `
    <span class="top">${card.suit}</span>  
    <span class="middle">${card.value}</span>
    <span class="bottom">${card.suit}</span> 
  `;
  return cardDiv;
};

//esto es para ordenar las cartas
const selectionSort = (arr) => {
  const sorted = [...arr];
  for (let i = 0; i < sorted.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < sorted.length; j++) {
      if (sorted[j].num < sorted[minIndex].num) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      const temp = sorted[i];
      sorted[i] = sorted[minIndex];
      sorted[minIndex] = temp;
      log.push([...sorted]); 
    }
  }
  return sorted;
};

//funcion para el boton draw
drawBtn.addEventListener("click", () => {
  const count = parseInt(inputCount.value);
  deck = [];
  log = [];
  cardContainer.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const card = getRandomCard();
    deck.push(card);
    cardContainer.appendChild(createCardHTML(card));
  }
  document.querySelector(".solution-log").innerHTML = "";
});

//para el boton sort
sortBtn.addEventListener("click", () => {
  const sortedDeck = selectionSort(deck);
  const logList = document.querySelector(".solution-log");
  logList.innerHTML = log.map((step, index) => {
    const stepHTML = step.map(card => createCardHTML(card).outerHTML).join("");
    return `<li><i>${index}</i><div class="deck">${stepHTML}</div></li>`;
  }).join("");
});

//dar color rojo a las cartas
// function renderCard(card) {
//   const isRed = card.suit === "♦" || card.suit === "♥";
  
//   return `
//     <div class="card ${isRed ? "red" : ""}">
//       <span class="top">${card.suit}</span>
//       <span class="middle">${card.value}</span>
//       <span class="bottom">${card.suit}</span>
//     </div>
//   `;
// }

//colores


};
