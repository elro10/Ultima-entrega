// libreria de convertidor de monedas
const api = "https://api.exchangerate-api.com/v4/latest/USD";

let cantidad = document.getElementById("cantidad");
let convertir = document.getElementById("convertir");
let monedaOrigen = document.getElementById("sel1");
let monedaFinal = document.getElementById("sel2");
let valorFinal = document.getElementById("valorFinal");
let cantidadFinal = document.getElementById("cantidadFinal");
let resultFrom;
let resultTo;
let searchValue;

document.body.style.backgroundColor = JSON.parse(localStorage.getItem("colorFondo"));

monedaOrigen.addEventListener('change', (event) => {
resultFrom = `${event.target.value}`;
});

monedaFinal.addEventListener('change', (event) => {
resultTo = `${event.target.value}`;
});

cantidad.addEventListener('input', valorActualizado);

function valorActualizado(e) {
    cantidadValue = e.target.value;
}

convertir.addEventListener("click", resultado);
function resultado() {
    fetch(`${api}`)
    .then(currency => {
    return currency.json();
    }).then(mostrarResults);
}
function mostrarResults(currency) {
    let fromRate = currency.rates[resultFrom];
    let toRate = currency.rates[resultTo];
    valorFinal.innerHTML = 
     ((toRate / fromRate) * cantidadValue).toFixed(2);
    cantidadFinal.style.display = "block";
}
let reset= document.getElementById("reset")
    reset.addEventListener("click",clear)
function clear() {
    window.location.reload();
    document.getElementsByClassName("valorFinal").innerHTML = "";
};