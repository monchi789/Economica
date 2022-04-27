// Define the variables
const monto = document.getElementById("monto");
const tiempo = document.getElementById("tiempo");
const interes = document.getElementById("interes");
const btnCalcular = document.getElementById("btnCalcular");
const llenarTabla = document.querySelector("#lista-tabla tbody");

btnCalcular.addEventListener("click", () => {
  calcularCuota(monto.value, interes.value, tiempo.value);
});

// Function to calculate the monthly payment
function calcularCuota(monto, interes, tiempo) {
  // Validate the input
  if (monto >= 1000 && monto <= 50000 && interes >= 1 && interes <= 4 && tiempo >= 6 && tiempo <= 24) {
    while (llenarTabla.firstChild) {
      llenarTabla.removeChild(llenarTabla.firstChild);
    }

    let fechas = [];
    let fechaActual = Date.now();
    let mes_actual = moment(fechaActual);
    mes_actual.add(1, "month");

    let pagoInteres = 0,
      pagoCapital = 0,
      cuota = 0;

    cuota =
      (monto * ((Math.pow(1 + interes / 100, tiempo) * interes) / 100)) /
      (Math.pow(1 + interes / 100, tiempo) - 1);
    //cuota = monto*((interes*Math.pow(1+interes,tiempo))/(Math.pow(1+interes,tiempo)-1));

    for (let i = 1; i <= tiempo; i++) {
      pagoInteres = parseFloat(monto * (interes / 100));
      pagoCapital = cuota - pagoInteres;
      monto = parseFloat(monto - pagoCapital);

      // Format dates
      fechas[i] = mes_actual.format("DD-MM-YYYY");
      mes_actual.add(1, "month");

      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${i}</td>
              <td>${fechas[i]}</td>
              <td>${"S/. " + cuota.toFixed(3)}</td>
              <td>${pagoInteres.toFixed(2)}</td>
              <td>${pagoCapital.toFixed(2)}</td>
              <td>${monto.toFixed(2)}</td>
          `;
      llenarTabla.appendChild(row);
    }
  } else {
    alert("Ingrese los valores dentro del rango");
  }
}
