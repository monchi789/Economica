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
  if (
    monto >= 1000 &&
    monto <= 50000 &&
    interes >= 1 &&
    interes <= 4 &&
    tiempo >= 6 &&
    tiempo <= 24
  ) {
    while (llenarTabla.firstChild) {
      llenarTabla.removeChild(llenarTabla.firstChild);
    }

    let fechaActual = Date.now();
    let mes_actual = moment(fechaActual);
    mes_actual.add(1, "month");

    let amortizacionConstante = 0,
      pagoInteres = 0,
      cuota = 0;

    pagoInteres = parseFloat(monto * (interes / 100));

    for (let i = 1; i <= tiempo; i++) {
      cuota = amortizacionConstante + pagoInteres;
      monto = parseFloat(monto - amortizacionConstante);

      // Format dates
      let fecha = mes_actual.format("DD-MM-YYYY");
      mes_actual.add(1, "month");

      // Validate if the i is the time
      if (i == tiempo) {
        cuota = monto + pagoInteres;
        amortizacionConstante = monto;
        monto = 0;
      }

      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${i}</td>
              <td>${fecha}</td>
              <td>${cuota.toFixed(2)}</td>
              <td>${pagoInteres.toFixed(2)}</td>
              <td>${amortizacionConstante.toFixed(2)}</td>
              <td>${monto.toFixed(2)}</td>
          `;
      llenarTabla.appendChild(row);
    }
  } else {
    alert("Ingrese los valores dentro del rango");
  }
}
