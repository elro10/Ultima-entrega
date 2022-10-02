
const monto = document.getElementById("monto");
const tiempo = document.getElementById("tiempo");
const interes = document.getElementById("interes");
const btnCalcular = document.getElementById("boton");
const llenarTabla = document.querySelector('#lista-tabla tbody');

let color= document.getElementById("color");
color.addEventListener("change",(e)=>{
    let colorFondo =e.target.value;
    let colorJson= JSON.stringify(colorFondo);
    localStorage.setItem("colorFondo",colorJson);
    let colorNoJson=JSON.parse(colorJson);
    console.log(colorJson);
    console.log(colorNoJson);
    document.body.style.backgroundColor = JSON.parse(localStorage.getItem("colorFondo"));
})

let nombreUsuario

document.getElementById("formulario-usuario").addEventListener("submit", manejadorFormularioUsuario);

function manejadorFormularioUsuario(e) {
e.preventDefault();
nombreUsuario = document.getElementById("user").value;      
localStorage.setItem("userName",JSON.stringify(nombreUsuario));
console.log(JSON.parse(localStorage.getItem('userName')));
mostrarPanel();
}

let fetchStorageUser   =  JSON.parse(localStorage.getItem('userName'));



function saludo(){
if (nombreUsuario !==fetchStorageUser)
return "por primera vez "+nombreUsuario;
else{
return "de nuevo "+nombreUsuario
}
}

function mostrarPanel() {
const opciones = document.getElementById("datos");

opciones.innerHTML =
`<h3>Bienvenido ${saludo()}</h3>`;
}

btnCalcular.addEventListener('click', () => {
    calcularCuota(monto.value, interes.value, tiempo.value);
})

function calcularCuota(monto, interes, tiempo){
    if(monto<=0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Has olvidado introducir el monto",
    });
    }
    else if(tiempo<=0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Has olvidado introducir el tiempo",
        });
        }
    else if(interes<=0){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Has olvidado introducir el interés",
            });
        }
    else{
    while(llenarTabla.firstChild){
        llenarTabla.removeChild(llenarTabla.firstChild);
    }

    let fechas = [];
    let fechaActual = Date.now();
    let mes_actual = moment(fechaActual);
    mes_actual.add(1, 'month');    

    let pagoInteres=0, pagoCapital = 0, cuota = 0;

    cuota = monto * (Math.pow(1+interes/100, tiempo)*interes/100)/(Math.pow(1+interes/100, tiempo)-1);

    for(let i = 1; i <= tiempo; i++) {

        pagoInteres = parseFloat(monto*(interes/100));
        pagoCapital = cuota - pagoInteres;
        monto = parseFloat(monto-pagoCapital);

        //Formato fechas
        fechas[i] = mes_actual.format('DD-MM-YYYY');
        mes_actual.add(1, 'month');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${fechas[i]}</td>
            <td>${cuota.toFixed(2)}</td>
            <td>${pagoCapital.toFixed(2)}</td>
            <td>${pagoInteres.toFixed(2)}</td>
            <td>${monto.toFixed(2)}</td>
        `;
        llenarTabla.appendChild(row)
    }
}

}

